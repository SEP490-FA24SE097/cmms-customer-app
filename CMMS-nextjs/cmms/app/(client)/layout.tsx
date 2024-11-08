import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { Toaster } from "@/components/ui/toaster";
interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <main>
      <Header />
      {children}
      <Footer />
      <Toaster />
    </main>
  );
};

export default ClientLayout;
