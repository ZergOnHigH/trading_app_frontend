import { z } from "zod";


// ✅ Walidacja danych formularza – Zod schema
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