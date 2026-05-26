"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

interface Message {
  role: "user" | "bot";
  text: string;
}

export default function RecommendationChat() {

  const { isAuthenticated } =
    useAuth();

  const [open, setOpen] =
    useState(false);

  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [messages, setMessages] =
    useState<Message[]>([
      {
        role: "bot",
        text:
          "Olá! Posso recomendar livros 📚",
      },
    ]);

  if (!isAuthenticated) {
    return null;
  }

  async function sendMessage() {

    if (!input.trim())
      return;

    const userMessage =
      input;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    setInput("");
    setLoading(true);

    try {

      const token =
        localStorage.getItem(
          "accessToken"
        );

      const response =
        await fetch(
          "http://localhost:3000/api/chat/recommendation",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
              Authorization:
                `Bearer ${token}`,
            },
            body:
              JSON.stringify({
                message:
                  userMessage,
              }),
          }
        );

      const data =
        await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text:
            data.response,
        },
      ]);

    } catch {

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text:
            "Erro ao buscar recomendação.",
        },
      ]);

    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
          fixed
          bottom-6
          right-6
          z-50
          w-14
          h-14
          rounded-full
          bg-pink-600
          text-white
          text-xl
          shadow-lg
        "
      >
        💬
      </button>

      {open && (
        <div
          className="
            fixed
            bottom-24
            right-6
            z-50
            w-96
            h-[500px]
            bg-white
            rounded-xl
            shadow-xl
            border
            flex
            flex-col
          "
        >
          <div
            className="
              p-4
              border-b
              font-bold
            "
          >
            Assistente Booklovers 📚
          </div>

          <div
            className="
              flex-1
              overflow-y-auto
              p-4
              space-y-3
            "
          >
            {messages.map(
              (message, i) => (
                <div
                  key={i}
                  className={
                    message.role
                    === "user"
                      ? "text-right"
                      : "text-left"
                  }
                >
                  <span
                    className="
                      inline-block
                      bg-gray-100
                      p-2
                      rounded-lg
                    "
                  >
                    {message.text}
                  </span>
                </div>
              )
            )}

            {loading && (
              <p>
                Pensando...
              </p>
            )}
          </div>

          <div
            className="
              p-4
              border-t
              flex
              gap-2
            "
          >
            <input
              value={input}
              onChange={(e) =>
                setInput(
                  e.target.value
                )
              }
              placeholder="
              Ex: quero suspense
              "
              className="
                flex-1
                border
                rounded-lg
                px-3
                py-2
              "
            />

            <button
              onClick={
                sendMessage
              }
              className="
                bg-pink-600
                text-white
                px-4
                rounded-lg
              "
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </>
  );
}