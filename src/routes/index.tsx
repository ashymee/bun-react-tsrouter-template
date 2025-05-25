import {createFileRoute} from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

import {APITester} from "@/components/APITester";
import {Card, CardContent} from "@/components/ui/card";

import logo_bun from "@/assets/logo_bun.svg";
import logo_react from "@/assets/logo_react.svg";
import logo_tanstack from "@/assets/logo_tanstack.png";

function HomePage() {
  return (
    <div className="container mx-auto p-8 text-center relative z-10">
      <div className="flex justify-center items-center gap-4 mb-8">
        <img
          src={logo_bun}
          alt="Bun Logo"
          className="h-36 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa] scale-105"
        />
        <img
          src={logo_react}
          alt="React Logo"
          className="h-36 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa]"
        />
        <img
          src={logo_tanstack}
          alt="Tanstack Logo"
          className="h-36 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa]"
        />
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-muted">
        <CardContent className="pt-6">
          <h1 className="text-3xl font-bold my-4 leading-tight">
            Bun + React + Tanstack Router
          </h1>
          <p>
            Edit{" "}
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
              src/routes/index.tsx
            </code>{" "}
            and save to test HMR
          </p>
          <APITester />
        </CardContent>
      </Card>
    </div>
  );
}
