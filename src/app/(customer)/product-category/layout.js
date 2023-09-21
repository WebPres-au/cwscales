import ContentHero from "@/components/ContentHero";

export default function CategoryLayout({ children }) {
  return (
    <div>
      <ContentHero>{children}</ContentHero>
    </div>
  );
}
