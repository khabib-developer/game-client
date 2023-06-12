import { SocketProvider } from "../../components/socket";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SocketProvider>{children}</SocketProvider>;
}
