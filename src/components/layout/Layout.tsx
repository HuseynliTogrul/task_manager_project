import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: Readonly<LayoutProps>) {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
}
