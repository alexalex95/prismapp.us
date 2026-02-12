import ChatThread from "@/components/chat-thread";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ChatThreadPage({ params }: Props) {
  const { id } = await params;
  return <ChatThread conversationId={id} />;
}
