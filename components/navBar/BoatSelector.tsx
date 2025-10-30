import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface BoatSelectorProps {
  selectedShip: string;
  setSelectedShip: (value: string) => void;
}

const BoatSelector: React.FC<BoatSelectorProps> = ({
  selectedShip,
  setSelectedShip,
}) => {
  return (
    <div>
      <Select value={selectedShip} onValueChange={setSelectedShip}>
        <SelectTrigger
          id="ship-select-trigger"
          className="w-full bg-neutral-50 font-bold dark:bg-neutral-950 text-neutral-700 dark:text-neutral-200 cursor-pointer"
        >
          <SelectValue placeholder="Select a boat" />
        </SelectTrigger>
        <SelectContent className="bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200 cursor-pointer">
          <SelectItem className="cursor-pointer font-bold" value="IMO1">
            IMO 1
          </SelectItem>
          <SelectItem className="cursor-pointer font-bold" value="IMO2">
            IMO 2
          </SelectItem>
          <SelectItem className="cursor-pointer font-bold" value="IMO3">
            IMO 3
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default BoatSelector;
