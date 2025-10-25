'use client'

import DarkBtn from "@/components/DarkBtn";
import MapWrapper from "@/components/MapWrapper";
import SideMenu from "@/components/SideMenu";

export default function Home() {
  return (
    <div className="relative w-screen h-screen">
      <MapWrapper />
      <DarkBtn />   
      <SideMenu selectedShip={""} setSelectedShip={function (ship: string): void {
        throw new Error("Function not implemented.");
      } } startDate={""} setStartDate={function (date: string): void {
        throw new Error("Function not implemented.");
      } } endDate={""} setEndDate={function (date: string): void {
        throw new Error("Function not implemented.");
      } } selectedVariable={""} setSelectedVariable={function (variable: string): void {
        throw new Error("Function not implemented.");
      } } minValue={null} maxValue={null} />
    </div>
  );
}