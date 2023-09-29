import Footer from "@/components/ui/Footer";
import Navigation from "@/components/ui/Navigation";

export default function Layout({ children }) {
  return (
    <div>
      <>
        <Navigation />
        {children}
        <Footer />
      </>
    </div>
  );
}
