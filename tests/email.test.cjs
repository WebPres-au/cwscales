const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { createRequire } = require("node:module");
const vm = require("node:vm");
const { test } = require("node:test");
const { transformSync } = require("next/dist/build/swc");

// Compile the actual application modules, including its JSX email template, with
// Next's compiler. Only network access and the route's environment are replaced.
function loadAppModule(relativePath, env = { RESEND_API_KEY: "test-only-not-a-real-key" }) {
  const cache = new Map();
  function load(filename) {
    if (cache.has(filename)) return cache.get(filename).exports;
    const module = { exports: {} };
    cache.set(filename, module);
    const nativeRequire = createRequire(filename);
    const compiled = transformSync(fs.readFileSync(filename, "utf8"), {
      filename,
      jsc: {
        parser: { syntax: "ecmascript", jsx: true },
        target: "es2022",
        transform: { react: { runtime: "automatic" } },
      },
      module: { type: "commonjs" },
    });
    vm.runInNewContext(compiled.code, {
      module,
      exports: module.exports,
      require: (specifier) => specifier.startsWith("@/")
        ? load(path.resolve(__dirname, "../src", `${specifier.slice(2)}.js`))
        : nativeRequire(specifier),
      process: { env },
      console: { error() {} },
      fetch: (...args) => globalThis.fetch(...args),
    }, { filename });
    return module.exports;
  }
  return load(path.resolve(__dirname, "..", relativePath));
}

const enquiry = {
  firstName: "Test customer",
  email: "customer@example.com",
  company: "Test company",
  enquiryType: "product",
  number: "0412345678",
  suburb: "Test suburb",
  message: "A synthetic enquiry <with escaped text>.",
  URLpath: "/contact",
};

function request(body = enquiry) {
  return new Request("http://localhost/api/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("API renders the enquiry and returns only the accepted email ID", async (t) => {
  t.mock.method(globalThis, "fetch", async (url, options) => {
    assert.equal(url, "https://api.resend.com/emails");
    const email = JSON.parse(options.body);
    assert.equal(email.from, "No reply <no-reply@cwscales.com.au>");
    assert.equal(email.to, "Louis <louis@cwscales.com.au>");
    assert.match(email.html, /Hi Louis/);
    assert.match(email.html, /customer@example.com/);
    assert.match(email.html, /&lt;with escaped text&gt;/);
    return Response.json({ id: "accepted-email-id" }, { headers: { "x-private-header": "excluded" } });
  });
  const { POST } = loadAppModule("src/app/api/send/route.js");
  const response = await POST(request());
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { id: "accepted-email-id" });
});

test("API returns a failure when Resend rejects the email", async (t) => {
  t.mock.method(console, "error", () => {});
  t.mock.method(globalThis, "fetch", async () => Response.json({
    name: "validation_error", statusCode: 403, message: "Sender domain not verified",
  }, { status: 403 }));
  const { POST } = loadAppModule("src/app/api/send/route.js");
  const response = await POST(request());
  assert.equal(response.status, 502);
  const result = await response.json();
  assert.equal(typeof result.error, "string");
  assert.equal(result.id, undefined);
  assert.equal(result.headers, undefined);
});

test("API handles provider network failures without reporting success", async (t) => {
  t.mock.method(console, "error", () => {});
  t.mock.method(globalThis, "fetch", async () => { throw new Error("Network unavailable"); });
  const { POST } = loadAppModule("src/app/api/send/route.js");
  assert.equal((await POST(request())).status, 502);
});

test("API rejects unexpected provider responses without an email ID", async (t) => {
  t.mock.method(globalThis, "fetch", async () => Response.json({}));
  const { POST } = loadAppModule("src/app/api/send/route.js");
  assert.equal((await POST(request())).status, 502);
});

test("API reports missing configuration without making a network request", async (t) => {
  const network = t.mock.method(globalThis, "fetch", async () => { throw new Error("Unexpected network call"); });
  const { POST } = loadAppModule("src/app/api/send/route.js", {});
  assert.equal((await POST(request())).status, 503);
  assert.equal(network.mock.callCount(), 0);
});

test("API rejects malformed and invalid enquiries before contacting Resend", async (t) => {
  const network = t.mock.method(globalThis, "fetch", async () => { throw new Error("Unexpected network call"); });
  const { POST } = loadAppModule("src/app/api/send/route.js");
  const malformed = new Request("http://localhost/api/send", { method: "POST", body: "{" });
  assert.equal((await POST(malformed)).status, 400);
  for (const body of [null, {}, { ...enquiry, email: "invalid" }, { ...enquiry, message: "" }, { ...enquiry, URLpath: {} }]) {
    assert.equal((await POST(request(body))).status, 400);
  }
  assert.equal(network.mock.callCount(), 0);
});

test("both forms' shared client accepts only a successful response with an email ID", async (t) => {
  const { sendEnquiry } = loadAppModule("src/lib/send-enquiry.js");
  t.mock.method(globalThis, "fetch", async (url, options) => {
    assert.equal(url, "/api/send");
    assert.deepEqual(JSON.parse(options.body), enquiry);
    return Response.json({ id: "accepted-email-id" });
  });
  assert.equal(await sendEnquiry(enquiry), "accepted-email-id");
});

test("client rejects HTTP errors, legacy HTTP 200 errors and missing confirmations", async (t) => {
  const { sendEnquiry, ENQUIRY_SEND_ERROR } = loadAppModule("src/lib/send-enquiry.js");
  const network = t.mock.method(globalThis, "fetch");
  for (const [body, status] of [
    [{ error: "Provider rejected" }, 502],
    [{ data: null, error: { name: "validation_error" } }, 200],
    [{ error: {}, id: "invalid-success" }, 200],
    [{}, 200],
    [{ data: { id: "legacy-response" }, error: null }, 200],
    [{ id: "" }, 200],
  ]) {
    network.mock.mockImplementation(async () => Response.json(body, { status }));
    await assert.rejects(sendEnquiry(enquiry), { message: ENQUIRY_SEND_ERROR });
  }
});

test("client propagates non-JSON responses and network failures to the forms' error handler", async (t) => {
  const { sendEnquiry } = loadAppModule("src/lib/send-enquiry.js");
  const network = t.mock.method(globalThis, "fetch", async () => new Response("Bad gateway", { status: 502 }));
  await assert.rejects(sendEnquiry(enquiry));
  network.mock.mockImplementation(async () => { throw new Error("Offline"); });
  await assert.rejects(sendEnquiry(enquiry), { message: "Offline" });
});
