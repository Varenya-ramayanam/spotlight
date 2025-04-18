import StartupForm from "@/components/StartupForm";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const page = async () => {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  return (
    <>
      <section className="flex flex-col items-center justify-center px-6 py-24 bg-gradient-to-br from-pink-500 to-red-400 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Submit your Project
        </h1>
      </section>
      <StartupForm />
    </> 
  );
};

export default page;
