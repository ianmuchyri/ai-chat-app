import { Chat } from "@/components/chat";

export default function Home() {
  return (
    <main className="fixed h-full w-full bg-muted">
      <div className="border rounded-2xl container h-full w-full mx-auto my-4 flex flex-col p-4">
        <Chat />
      </div>
    </main>
  );
}
