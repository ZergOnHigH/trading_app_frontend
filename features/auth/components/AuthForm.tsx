"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useLoginMutation, useRegisterMutation } from "../authApi";
import { registerForm } from "../Data/registerForm";
import Field from "./Fields";
import { registerSchema } from "../schema/registerSchema";
import { loginSchema } from "../schema/loginSchema";
import { loginForm } from "../Data/loginForm";

interface AuthFormData {
  email: string;
  password: string;
  username?: string;
}

interface AuthFormProps {
  mode: "login" | "register";
} 

const values = {
  login: {
    title: "Zaloguj się",
    description: "Zaloguj się do swojego konta",
    schema: loginSchema,
    data: loginForm,
    useMutation: useLoginMutation,
  },
  register: {
    title: "Zarejestruj się",
    description: "Utwórz nowe konto",
    schema: registerSchema,
    data: registerForm,
    useMutation: useRegisterMutation,
  },
};

const AuthForm = ({ mode }: AuthFormProps) => {
  const object = values[mode];

  const [trigger, state] = object.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(object.schema),
  }); 
  const onSubmit = async (data: AuthFormData) => {
    try {
      await trigger(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{object.title}</CardTitle>
        <CardDescription>{object.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {object.data.map((field) => (
            <Field
              errors={errors}
              register={register}
              key={field.id}
              {...field}
            />
          ))} 
          <Button type="submit" className="w-full mt-4">
            {state.isLoading ? "Tworzenie konta..." : "Zarejestruj się"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AuthForm; 
