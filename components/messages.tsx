import { Message } from "ai";
import { Bot, User } from "lucide-react";
import { Card, CardHeader } from "./ui/card";

export function MessageComponent({ message }: { message: Message }) {
  const { role, content } = message;

  if (role === "assistant") {
    return (
      <div className="flex flex-col gap-3 p-6 whitespace-pre-wrap">
        <div className="flex items-center gap-2">
          <Bot size={30} />
          <span className="font-bold">Assistant:</span>
        </div>
        {content}
      </div>
    );
  }
  return (
    <Card className="whitespace-pre-wrap rounded-2xl">
      <CardHeader>
        <div className="flex items-center gap-2">
          <User size={30} />
          {content}
        </div>
      </CardHeader>
    </Card>
  );
}
