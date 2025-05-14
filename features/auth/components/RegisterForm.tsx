// 🔁 Tryb klienta (potrzebny, bo używamy hooków)
"use client";
import Field from "./Fields";
import { registerSchema } from "../schema/registerSchema";

// 📦 Importy komponentów i bibliotek
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useRegisterMutation } from "../authApi";
import { registerForm } from "../Data/registerForm";



// 🧾 Typ danych formularza
interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

// 🧠 Komponent formularza rejestracji
const RegisterForm = () => {
  const [createAccount, state] = useRegisterMutation(); 
  // Hook do rejestracji – `createAccount` to funkcja, `state` zawiera np. isLoading

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema), // Walidacja danych przez zodResolver
  });

  // 🚀 Funkcja wysyłająca dane do backendu
  const onSubmit = async (data: RegisterFormData) => {
    try {
      await createAccount(data); // Wysyłka danych rejestracyjnych
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  // 🖼️ JSX – UI formularza
  return (
    <Card>
      <CardHeader>
        <CardTitle>Zarejestruj się</CardTitle>
        <CardDescription>
          Make changes to your account here. Click save when you are done.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* 🧩 Pole: Nazwa użytkownika */}
        
         {registerForm.map((field) => <Field errors={errors} register={register} key={field.id} {...field}/>)}  
         

          {/* ✅ Przycisk do wysłania formularza */}
          <Button type="submit" className="w-full mt-4">
            {state.isLoading ? "Tworzenie konta..." : "Zarejestruj się"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
