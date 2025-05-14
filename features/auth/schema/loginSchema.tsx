import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Nieprawidłowy adres e-mail"),
  password: z.string().min(8, "Hasło musi zawierać co najmniej 8 znaków."),
});