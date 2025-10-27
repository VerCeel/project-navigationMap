import { TimePicker } from "./TimePicker";
import BoatSelector from "./BoatSelector";
import { Label } from "./ui/label";
import SpeedVariables from "./SpeedVariables";

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
  selectedVariable,
  setSelectedVariable,
  minValue,
  maxValue,
}) => {
  const legendGradient = "linear-gradient(to right, #3b82f6, #facc15, #ef4444)";

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
    <div className="absolute h-fit w-72 dark:bg-neutral-950 bg-neutral-100 p-5 shadow-md z-20 flex flex-col overflow-y-auto rounded-xl">
      <h2 className="text-xl font-semibold mb-6 dark:text-neutral-150 text-neutral-850">
        Contrôles
      </h2>
      <div className="mb-6">
        <Label
          htmlFor="ship-select"
          className="block text-sm font-medium mb-1 dark:text-neutral-200 text-neutral-800"
        >
          Navire:
        </Label>
        <BoatSelector
          selectedShip={selectedShip}
          setSelectedShip={setSelectedShip}
        />
      </div>

      <div className="mb-6">
        <Label
          htmlFor="date"
          className="block text-sm font-medium mb-1 dark:text-neutral-200 text-neutral-800"
        >
          Date de debut:
        </Label>
        <TimePicker />
      </div>

      <div className="mb-6">
        <Label
          htmlFor="variable-select"
          className="block text-sm font-medium mb-1 dark:text-neutral-200 text-neutral-800"
        >
          Variable à visualiser
        </Label>
        <SpeedVariables
          selectedVariable={selectedVariable}
          setSelectedVariable={setSelectedVariable}
        />
      </div>

      <div className="grow"></div>

      {selectedVariable &&
        minValue !== null &&
        maxValue !== null &&
        minValue !== maxValue && (
          <div className="mt-6 pt-4 border-t border-neutral-700">
            <label className="block text-sm font-medium mb-2 text-neutral-300">
              Légende ({formatVariableName(selectedVariable)})
            </label>

            <div
              className="w-full h-3 rounded-full mb-1 border border-neutral-600"
              style={{ background: legendGradient }}
            ></div>

            <div className="flex justify-between text-xs text-neutral-400 px-1">
              <span>{minValue.toFixed(1)}</span>{" "}
              <span>{maxValue.toFixed(1)}</span>
            </div>
          </div>
        )}

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
