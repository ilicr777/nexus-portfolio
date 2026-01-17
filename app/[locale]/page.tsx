import { Hero } from "@/components/sections/hero";
import { Highlights } from "@/components/sections/highlights";
import { PageTransition } from "@/components/page-transition";

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <Highlights />
    </PageTransition>
  );
}
