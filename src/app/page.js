import Banner from "@/components/Banner";
import Categories from "@/components/Categories";
import Footer from "@/components/ui/Footer";
import Navigation from "@/components/ui/Navigation";
import Information from "@/components/home/Information";

export default function Home() {
  return (
    <div>
      <Navigation />
      <Banner />
      <Categories />
      <Information />
      <Footer />
    </div>
  );
}
