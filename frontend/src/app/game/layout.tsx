import { SocketProvider } from "../../hooks/socket";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SocketProvider>{children}</SocketProvider>;
}
