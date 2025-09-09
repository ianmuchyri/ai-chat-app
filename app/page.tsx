import { Chat } from "@/components/chat";
import { Settings } from "@/components/settings";

export default function Home() {
  const secret = process.env.ENCRYPTION_SECRET || "";
  return (
    <main className="fixed h-full w-full bg-muted">
      <div className="h-[6%] w-full border-b flex items-center">
        <div className="container mx-auto flex flex-row items-center justify-between">
          <h1 className="text-3xl font-bold">Chat</h1>
          <Settings secret={secret} />
        </div>
      </div>
      <div className="border rounded-2xl container h-[90%] w-full mx-auto my-4 flex flex-col p-4">
        <Chat />
      </div>
    </main>
  );
}
