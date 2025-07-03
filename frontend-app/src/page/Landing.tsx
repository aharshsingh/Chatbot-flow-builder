import { HeroSection } from "../component/dynamic-hero";

export default function Landing() {
  return (
    <div className="flex flex-col overflow-hidden">
      <div>
        <HeroSection
          heading="Build Chatbot Flows with Ease"
          tagline="Drag, drop, connect, and customize – create dynamic chatbot conversations effortlessly using our intuitive flow builder."
          buttonText="Start Building"
        />
      </div>
      <div className="flex justify-center items-center -mt-96 px-4">
        <img
          src="/foypkzd72uxb3ylm.png"
          alt="img"
          className="max-w-full h-auto object-contain"
        />
        <img
          src="/f2277416vydlvdqh.png"
          alt="img"
          className="max-w-full h-auto object-contain -mt-16"
        />
      </div>
    </div>
  );
}
