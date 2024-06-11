"use client";

import { ChatLayout } from "@/components/chat/chat-layout";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import UsernameForm from "@/components/username-form";
import { ChatRequestOptions } from "ai";
import { Message, useChat } from "ai/react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const {
    messages,
    input,
    handleInputChange,
    setInput,
    handleSubmit,
    isLoading,
    error,
    stop,
    setMessages,
  } = useChat({
    onResponse: (response) => {
      if (response) {
        setLoadingSubmit(false);
      }
    },
    onError: (error) => {
      setLoadingSubmit(false);
      toast.error("An error occurred. Please try again.");
    },
  });
  const [chatId, setChatId] = React.useState<string>("");
  const [open, setOpen] = React.useState(false);
  const [loadingSubmit, setLoadingSubmit] = React.useState(false);

  React.useEffect(() => {
    if (!isLoading && !error && chatId && messages.length > 0) {
      if (typeof window !== "undefined") {
        // Save messages to local storage
        localStorage.setItem(`chat_${chatId}`, JSON.stringify(messages));
      }
      // Trigger the storage event to update the sidebar component
      window.dispatchEvent(new Event("storage"));
    }
  }, [messages, chatId, isLoading, error]);

  useEffect(() => {
    if (!localStorage.getItem("ollama_user")) {
      setOpen(true);
    }
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingSubmit(true);

    if (messages.length === 0) {
      // Generate a random id for the chat
      console.log("Generating chat id");
      const id = uuidv4();
      setChatId(id);
    }
    setMessages([...messages]);

    // Prepare the options object with additional body data, to pass the model.
    const requestOptions: ChatRequestOptions = {
      options: {
        body: {
          selectedModel: "REST API",
        },
      },
    };
    handleSubmit(e, requestOptions);
  };

  return (
    <main className="flex h-[calc(100dvh)] flex-col items-center ">
      <Dialog open={open} onOpenChange={setOpen}>
        <ChatLayout
          chatId={chatId}
          messages={messages}
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={onSubmit}
          isLoading={isLoading}
          loadingSubmit={loadingSubmit}
          error={error}
          stop={stop}
          navCollapsedSize={10}
          defaultLayout={[30, 160]}
        />
        <DialogContent className="flex flex-col space-y-4">
          <DialogHeader className="space-y-2">
            <DialogTitle>Welcome to Ollama!</DialogTitle>
            <DialogDescription>
              Enter your name to get started. This is just to personalize your
              experience.
            </DialogDescription>
            <UsernameForm setOpen={setOpen} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
}
