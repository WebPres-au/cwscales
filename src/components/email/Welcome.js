import {
  Body,
  Link,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export default function Welcome({
  firstName,
  email,
  number,
  suburb,
  product,
  message,
}) {
  return (
    <Html>
      <Head />
      <Preview>New customer request</Preview>
      <Body style={main}>
        <Container>
          <Section style={content}>
            <Row style={{ ...boxInfos, paddingBottom: "0" }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  Hi Louis,
                </Heading>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  We have a new enquire from {firstName}
                </Heading>

                <Text style={paragraph}>
                  <b>Email: </b>
                  {email}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Enquiry: </b>
                  {product}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Suburb: </b>
                  {suburb}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Number: </b>
                  {number}
                </Text>

                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Message: </b>
                  {message}
                </Text>
              </Column>
            </Row>
            <Row style={{ ...boxInfos, paddingTop: "0" }}>
              <Column style={containerButton} colSpan={2}>
                <Link href={`tel:${number}`} style={button}>
                  Call now
                </Link>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const containerButton = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const button = {
  backgroundColor: "#e00707",
  padding: "12px 30px",
  borderRadius: 3,
  color: "#FFF",
  fontWeight: "bold",
  border: "1px solid rgb(0,0,0, 0.1)",
  cursor: "pointer",
  display: "block",
  margin: "0 auto",
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};

const boxInfos = {
  padding: "20px 40px",
};
