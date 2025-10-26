import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SideMenu from "../SideMenu";
import { Menu } from "lucide-react";

export function SideMenuBtn() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild >
        <Button
          variant="outline"
          className="dark:bg-neutral-950 cursor-pointer"
        >
          <Menu />
          Menu
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <SideMenu
          selectedShip={""}
          setSelectedShip={function (ship: string): void {
            throw new Error("Function not implemented.");
          }}
          startDate={""}
          setStartDate={function (date: string): void {
            throw new Error("Function not implemented.");
          }}
          endDate={""}
          setEndDate={function (date: string): void {
            throw new Error("Function not implemented.");
          }}
          selectedVariable={""}
          setSelectedVariable={function (variable: string): void {
            throw new Error("Function not implemented.");
          }}
          minValue={null}
          maxValue={null}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
