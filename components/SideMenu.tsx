import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RangeTimePicker } from "./RangeTimePicker";



interface SidebarProps {
  selectedShip: string;
  setSelectedShip: (ship: string) => void;
  startDate: string; 
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  selectedVariable: string;
  setSelectedVariable: (variable: string) => void;
  minValue: number | null; 
  maxValue: number | null; 
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedShip,
  setSelectedShip,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedVariable,
  setSelectedVariable,
  minValue,
  maxValue,
}) => {

  const legendGradient = "linear-gradient(to right, #3b82f6, #facc15, #ef4444)";

  // Helper to format variable names for display
  const formatVariableName = (variable: string): string => {
    switch (variable) {
      case "speed":
        return "Vitesse (kn)";
      case "rpm":
        return "RPM";
      case "draft":
        return "Tirant d'eau (m)";
      case "trim":
        return "Assiette (m)";
      default:
        return variable;
    }
  };
  

  return (
    <div className="absolute top-3 left-3 h-fit w-72 dark:bg-neutral-950 bg-neutral-100 p-5 shadow-xl z-20 flex flex-col overflow-y-auto rounded-xl">
      <h2 className="text-xl font-semibold mb-6 dark:text-neutral-100 text-neutral-950">Contrôles</h2>
        {/* --- Ship Selection --- */}
      <div className="mb-6">
        <label
          htmlFor="ship-select"
          className="block text-sm font-medium mb-1 text-neutral-300"
        >
          Navire:
        </label>
        <Select value={selectedShip} onValueChange={setSelectedShip}>
          <SelectTrigger
            id="ship-select-trigger"
            className="w-full bg-neutral-900 border-neutral-700 text-neutral-100"
          >
            {" "}
            {/* Appliquer les styles Tailwind ici si besoin */}
            <SelectValue placeholder="Choisir un navire" />
          </SelectTrigger>
          <SelectContent className="bg-neutral-900 border-neutral-800 text-neutral-100 dark:text-neutral-900">
            {" "}
            {/* Appliquer les styles Tailwind ici si besoin */}
            <SelectItem value="IMO1">IMO 1</SelectItem>
            <SelectItem value="IMO2">IMO 2</SelectItem>
            <SelectItem value="IMO3">IMO 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* --- Time Window --- */}
      <div className="mb-6">
        <RangeTimePicker />
      </div>

      {/* --- Variable Selection --- */}
      <div className="mb-6">
        <label
          htmlFor="variable-select"
          className="block text-sm font-medium mb-1 text-neutral-300"
        >
          Variable à visualiser
        </label>
        <select
          id="variable-select"
          value={selectedVariable}
          onChange={(e) => setSelectedVariable(e.target.value)}
          className="w-full p-2 bg-neutral-700 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
          <option value="speed">Vitesse</option>
          <option value="rpm">RPM</option>
          {/* Note: Draft and Trim require loading/processing Ship Hydro.csv */}
          <option value="draft" >
            Tirant d&apos;eau 
          </option>
          <option value="trim" >
            Assiette 
          </option>
        </select>
      </div>

      {/* Spacer to push legend to the bottom */}
      <div className="flex-grow"></div>

      {/* --- Color Legend --- */}
      {/* Only show legend if a variable is selected AND min/max values are available */}
      {selectedVariable &&
        minValue !== null &&
        maxValue !== null &&
        minValue !== maxValue && (
          <div className="mt-6 pt-4 border-t border-neutral-700">
            <label className="block text-sm font-medium mb-2 text-neutral-300">
              Légende ({formatVariableName(selectedVariable)})
            </label>
            {/* The gradient bar */}
            <div
              className="w-full h-3 rounded-full mb-1 border border-neutral-600"
              style={{ background: legendGradient }}
            ></div>
            {/* Min and Max value labels */}
            <div className="flex justify-between text-xs text-neutral-400 px-1">
              <span>{minValue.toFixed(1)}</span>{" "}
              {/* Adjust decimal places as needed */}
              <span>{maxValue.toFixed(1)}</span>
            </div>
          </div>
        )}
      {/* Optional: Show placeholder if min/max are the same or not calculated */}
      {(minValue === null || maxValue === null || minValue === maxValue) &&
        selectedVariable && (
          <div className="mt-6 pt-4 border-t border-neutral-700 text-xs text-neutral-500 text-center">
            (Légende non applicable ou en attente de calcul)
          </div>
        )}
    </div>
  );
};

export default Sidebar;
