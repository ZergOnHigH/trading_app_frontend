// app/login/page.tsx
import { LoginForm } from "@/features/auth/components/LoginForm";


export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoginForm />
    </div>
  );
}
