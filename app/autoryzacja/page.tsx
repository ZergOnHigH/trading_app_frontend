import RegisterForm from "@/features/auth/components/RegisterForm"
// Importuje komponent `RegisterForm` z podanej ścieżki – zapewne formularz rejestracji użytkownika.
// Ścieżka ze znakiem `@` oznacza alias (skrót) do głównego katalogu projektu, co ułatwia zarządzanie ścieżkami w większych aplikacjach.

export default function AuthPage() {
// Eksportuje domyślnie funkcję `AuthPage`, która jest komponentem React – reprezentuje stronę uwierzytelniania (auth).

  return (
    <div>
        <RegisterForm/>
    </div>
  )
  // Zwraca strukturę JSX – pojedynczy `div`, w którym znajduje się komponent `RegisterForm`.
  // To oznacza, że na tej stronie będzie wyświetlany formularz rejestracji użytkownika.
}
