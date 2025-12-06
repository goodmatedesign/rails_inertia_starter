import { Navbar } from "@/components/navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {children}
    </div>
  );
};

export { Layout };
