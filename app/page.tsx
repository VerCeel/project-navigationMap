"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";

import DarkBtn from "@/components/navBar/DarkBtn";
import { SearchBar } from "@/components/navBar/SearchBar";
import { LoginBtn } from "@/components/navBar/Connexion";

import BoatSelector from "@/components/navBar/BoatSelector";
import allShipRoutes from "@/data/allShipRoutes.json";
import { ShipPoint } from "@/lib/types";
import { Spinner } from "@/components/ui/spinner";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-full">
      <Spinner className="mr-2 h-8 w-8 animate-spin" />
    </div>
  ),
});

const allShipData: Record<string, ShipPoint[]> = allShipRoutes;

export default function Home() {
  const [selectedShip, setSelectedShip] = useState("");

  const currentShipData = useMemo(() => {
    return allShipData[selectedShip] || [];
  }, [selectedShip]);

  return (
    <div className="relative w-screen h-screen">
      <Map shipData={currentShipData} />
      <div className="absolute top-2 right-2 z-50 flex gap-2">
        <DarkBtn />
        <LoginBtn />
      </div>

      <div className="absolute flex gap-2 top-2 left-2 z-50 items-center">
        <div className="w-fit">
          <BoatSelector
            selectedShip={selectedShip}
            setSelectedShip={setSelectedShip}
          />
        </div>

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
