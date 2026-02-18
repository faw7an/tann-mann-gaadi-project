import Image from "next/image";
import Registration from "@/components/Registration";
import { Sun } from "lucide-react";
export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/assets/sunrise-hero.jpg"
          alt="Sunrise background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-foreground/60 via-foreground/40 to-background/30" />
      </div>
      <main className="relative flex flex-col justify-center z-10 items-center min-h-screen px-4">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card/20 backdrop-blur-md px-4 py-2">
          <Sun className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary-foreground">
            Tann Mann Foundation
          </span>
        </div>
        <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          <span className="text-primary-foreground">Good </span>
          <span className="text-gradient-sunrise">Morning</span>
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base text-primary-foreground/80 sm:text-lg text-center mb-8">
          Start your day with purpose. Register and join our community of
          changemakers in Bangalore.
        </p>
        <Registration />
      </main>
    </div>
  );
}
