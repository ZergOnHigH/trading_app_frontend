import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthForm from "@/features/auth/components/AuthForm";

export default function AuthPage() {
  return (
    <div>
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Logowanie</TabsTrigger>
          <TabsTrigger value="register">Rejestracja</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <AuthForm mode="login"/>
        </TabsContent>
        <TabsContent value="register">
          <AuthForm mode="register"/>
        </TabsContent>
      </Tabs>
    </div>
  );
}