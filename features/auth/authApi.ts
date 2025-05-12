// Importujemy funkcję do tworzenia API z RTK Query
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Importujemy funkcję do wyświetlania powiadomień
import { toast } from "react-toastify";

// Typ odpowiedzi, gdy logowanie lub rejestracja zakończy się sukcesem
interface AuthResponse extends Response {
    token: string; // Token JWT (np. do przechowywania w ciasteczku)
    message: string; // Komunikat zwrotny od backendu
    data?: Record<string, unknown>; // Dodatkowe dane (np. użytkownik)
}

// Typ odpowiedzi, gdy backend zwróci błąd
interface AuthErrorResponse extends Response {
    data: {
        message: string; // Komunikat błędu
    };
}

// Tworzymy nowe API o nazwie `authApi`
export const authApi = createApi({
  reducerPath: "authApi", // Nazwa gałęzi w Redux Store (unikalna dla tego API)

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL, // Podstawowy URL z pliku .env

    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json"); // Ustawiamy nagłówek JSON
      return headers;
    },

    credentials: "include", // Pozwala przesyłać ciasteczka (dla tokenów JWT itp.)
  }),

  // Definiujemy dostępne mutacje, czyli zapytania typu POST/PUT/DELETE
  endpoints: (builder) => ({

    // 🔐 Mutacja logowania
    login: builder.mutation({
      query: (user) => {
        return {
          url: "/auth/login",     // Adres backendu do logowania
          method: "POST",         // Wysyłamy zapytanie POST
          body: user,             // Przesyłamy dane logowania (email i hasło)
        };
      },
      transformResponse: (res: AuthResponse) => {
        // Jeśli logowanie się powiedzie:
        document.cookie = `access_token=${res.token}; path=/; max-age=3600`; 
        // Zapisujemy token JWT w ciasteczku na 1 godzinę
        toast.success(res.message); // Pokazujemy użytkownikowi komunikat sukcesu
        return res; // Zwracamy odpowiedź
      },
      transformErrorResponse: (res: AuthErrorResponse) => {
        // Jeśli logowanie się nie powiedzie:
        toast.error(res.data.message); // Pokazujemy komunikat błędu
        return res; // Zwracamy błąd
      },
    }),

    // 🧾 Mutacja rejestracji
    register: builder.mutation({
      query: (user) => {
        return {
          url: "/auth/register",  // Adres backendu do rejestracji
          method: "POST",         // POST bo tworzymy nowego użytkownika
          body: user,             // Dane nowego użytkownika (username, email, hasło)
        };
      },
      transformResponse: (res: AuthResponse) => {
        // Jeśli rejestracja się uda:
        toast.success(res.message); // Pokazujemy komunikat sukcesu
        return res;
      },
      transformErrorResponse: (res: AuthErrorResponse) => {
        // Jeśli rejestracja się nie uda:
        console.log("ERR!", res); // Wypisujemy błąd w konsoli (przydatne w developmencie)
        toast.error(res.data.message); // Pokazujemy błąd użytkownikowi
        return res;
      },
    }),
  }),
});

// Eksportujemy hooki do użycia w komponentach React
export const { useLoginMutation, useRegisterMutation } = authApi;
