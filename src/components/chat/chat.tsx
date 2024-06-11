import React, { useState } from "react";
import ChatList from "./chat-list";
import ChatBottombar from "./chat-bottombar";
import { Message, useChat } from "ai/react";
import { ChatRequestOptions } from "ai";

export interface ChatProps {
  chatId?: string;
  messages: Message[];
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions
  ) => void;
  isLoading: boolean;
  loadingSubmit?: boolean;
  error: undefined | Error;
  stop: () => void;
}

export default function Chat({
  messages,
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  error,
  stop,
  chatId,
  loadingSubmit,
}: ChatProps) {
  const [refresh, setRefresh] = useState(false);
  const { setMessages } = useChat();

  return (
    <div className="flex flex-col justify-between w-full h-full  ">
      <ChatList
        messages={messages}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        loadingSubmit={loadingSubmit}
        error={error}
        stop={stop}
      />

      <ChatBottombar
        messages={messages}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
        stop={stop}
      />
    </div>
  );
}
