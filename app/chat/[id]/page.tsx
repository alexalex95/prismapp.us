import ChatThread from "@/components/chat-thread";
import { Suspense } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ChatThreadPage({ params }: Props) {
  const { id } = await params;
  return (
    <Suspense fallback={<div className="min-h-screen bg-base" />}>
      <ChatThread conversationId={id} />
    </Suspense>
  );
}
