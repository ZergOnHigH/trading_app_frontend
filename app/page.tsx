"use client";
import { useRegisterMutation } from "@/features/auth/authApi";
import Image from "next/image";

export default function Home() {

  const [register,state] = useRegisterMutation();

  const newUser = {
    username:"Reakjhjkkjjkjlct01",
    password:"Test1234@",
    email:"react0lkjkjkjkhkj1@wp.pl",
    account_type:"admin"
  }

  const handleRegister = async () => {
    try {
      const response = await register(newUser);
      console.log("Registration successful:", response);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     
       {state.isLoading && <p>Loading...</p>}
       {state.isError && <p>Error</p>}

       <button onClick={handleRegister}>Zarejestruj</button>
     
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />



      
      </main>
    </div>
  );
}
