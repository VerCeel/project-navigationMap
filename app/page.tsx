"use client";

import DarkBtn from "@/components/DarkBtn";
import MapWrapper from "@/components/MapWrapper";
import { SearchBar } from "@/components/sideMenu/SearchBar";
import { SideMenuBtn } from "@/components/sideMenu/SideMenuBtn";


export default function Home() {
  return (
    <div className="relative w-screen h-screen">
      <MapWrapper />
      <DarkBtn />
      <div className="absolute flex gap-2 top-2 left-2 z-50">
        <SideMenuBtn />
        <SearchBar />
      </div>
    </div>
  );
}
