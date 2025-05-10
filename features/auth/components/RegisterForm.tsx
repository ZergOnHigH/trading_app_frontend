"use client";
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

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Nazwa użytkownika musi mieć co najmniej 3 znaki"),
  email: z.string().email("Nieprawidłowy adres e-mail"),
  password: z
    .string()
    .min(8, "Hasło musi zawierać co najmniej 8 znaków.")
    .refine((val) => /[A-Z]/.test(val), {
      message: "Hasło musi zawierać przynajmniej jedną dużą literę.",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "Hasło musi zawierać przynajmniej jedną cyfrę.",
    })
    .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: "Hasło musi zawierać przynajmniej jeden znak specjalny.",
    }),
});

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const [createAccount, state] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await createAccount(data);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

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
          <div className="space-y-1">
            <Label htmlFor="name">Nazwa</Label>
            <Input
              {...register("username")}
              type="text"
              id="name"
              placeholder="Podaj swoją nazwę"
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">E-mail</Label>
            <Input
              {...register("email")}
              type="email"
              id="email"
              placeholder="Podaj swój e-mail"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="name">Hasło</Label>
            <Input
              {...register("password")}
              type="password"
              id="name"
              placeholder="Podaj hasło"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full mt-4">
            {state.isLoading ? "Tworzenie konta..." : "Zarejestruj się"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;