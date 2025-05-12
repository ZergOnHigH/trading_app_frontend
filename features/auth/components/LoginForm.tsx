// 🔁 Ten plik działa po stronie klienta – potrzebne do hooków
"use client";

// 📦 Importy bibliotek i komponentów
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "../authApi";
import { useRouter } from "next/navigation";

// ✅ Schemat walidacji danych logowania
const loginSchema = z.object({
  email: z.string().email("Nieprawidłowy email"),
  password: z.string().min(1, "Hasło nie zostało wpisane"),
});

// ✅ Typ danych formularza
type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data).unwrap();

      const match = document.cookie.match(/access_token=([^;]+)/);
      const token = match?.[1];

      if (token) {
        localStorage.setItem("token", token);
        router.push("/dashboard");
      } else {
        console.error("Token nie znaleziony w ciasteczkach.");
      }
    } catch (error: any) {
  console.error("Błąd logowania:", error);
  if (error?.data?.message) {
    alert("Błąd: " + error.data.message);
  } else {
    alert("Nie udało się zalogować. Sprawdź dane logowania.");
  }
}
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Wprowadź swój email i hasło, aby zalogować się do konta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            {/* 🧩 Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* 🧩 Hasło */}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Hasło</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Zapomniałeś hasła?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* 🔘 Przycisk logowania */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logowanie..." : "Zaloguj się"}
            </Button>

            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Nie masz jeszcze konta?{" "}
            <a href="#" className="underline underline-offset-4">
              Zarejestruj się
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
