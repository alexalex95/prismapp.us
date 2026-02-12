import Nav from "@/components/nav";
import ChatList from "@/components/chat-list";
import ChatHeader from "@/components/chat-header";

export default function ChatPage() {
  return (
    <div className="min-h-screen pb-20 bg-base">
      <ChatHeader />

      <main className="pt-2">
        <ChatList />
      </main>

      <Nav />
    </div>
  );
}
