import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>Napisz do nas</h1>
        <Button variant="destructive">Click me</Button>
        <Button variant="ghost">Click me</Button>

        <Button variant="outline">Click me</Button>
        <Button>Click me</Button>
      </main>
    </div>
  );
}
