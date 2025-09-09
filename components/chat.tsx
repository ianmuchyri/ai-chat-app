"use client";

import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useChat } from "ai/react";
import { MessageComponent } from "./messages";
import React, { useEffect } from "react";

export function Chat() {
  const { messages, handleSubmit, input, handleInputChange } = useChat({
    api: "/api/chat",
  });
  const formRef = React.useRef<HTMLFormElement>(null);
  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      formRef.current?.requestSubmit();
    }
  }

  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      const { offsetHeight, scrollHeight, scrollTop } =
        chatContainerRef.current as HTMLDivElement;
      if (scrollHeight >= scrollTop + offsetHeight) {
        chatContainerRef.current?.scrollTo(0, scrollHeight + 200);
      }
    };
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto mb-2 p-4">
        {messages.map((message) => (
          <MessageComponent key={message.id} message={message} />
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-auto relative" ref={formRef}>
        <Textarea
          className="w-full text-lg rounded-2xl"
          placeholder="Say something"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <Button
          type="submit"
          size="icon"
          disabled={!input}
          className="absolute top-1/2 transform -translate-y-1/2 right-4 rounded-full"
        >
          <Send size={24} />
        </Button>
      </form>
    </>
  );
}
