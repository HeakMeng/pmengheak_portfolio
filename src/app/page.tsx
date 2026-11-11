import Hero from "@/components/Hero";
import About from "@/components/About";
import Motion from "@/components/Motion";
import PortfolioClient from "@/components/PortfolioClient";

export default function Home() {
  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <PortfolioClient hero={<Hero />} about={<About />} />
      <Motion />
    </>
  );
}
