import Image from "next/image";
import LoginForm from "./LoginForm";
import { getAdminIdentity } from "@/lib/supabase/auth";
import { redirect } from "next/navigation";


export default async function LoginPage() {
  const session = await getAdminIdentity();

  if (session) {
    return redirect('/dashboard');
  }


  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            className="mx-auto h-10 w-auto"
            src="/CWS_logo.png"
            alt="Logo of Correct Weight Scales"
            width={322}
            height={55}
            loading="eager"
          />
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}
