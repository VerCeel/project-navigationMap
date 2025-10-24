'use client'

import DarkBtn from "@/components/DarkBtn";
import MapWrapper from "@/components/MapWrapper";

export default function Home() {
  return (
    <div className="relative w-screen h-screen">
      <MapWrapper />
      <DarkBtn />   
    </div>
  );
}