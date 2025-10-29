"use client";

import DarkBtn from "@/components/navBar/DarkBtn";
import MapWrapper from "@/components/MapWrapper";
import { SearchBar } from "@/components/navBar/SearchBar";
import { SideMenuBtn } from "@/components/navBar/SideMenuBtn";
import { LoginBtn } from "@/components/navBar/Connexion";

export default function Home() {
  return (
    <div className="relative w-screen h-screen">
      <MapWrapper />
      <div className="absolute top-2 right-2 z-50 flex gap-2">
        <DarkBtn />
        <LoginBtn />
      </div>
      <div className="absolute flex gap-2 top-2 left-2 z-50">
        <SideMenuBtn />
        <div className="hidden md:block">
          <SearchBar />
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
        <SearchBar />
      </div>
    </div>
  );
}
