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
          className="w-full bg-white dark:bg-neutral-900 cursor-pointer"
        >
          {" "}
          <SelectValue placeholder="Choisir un navire" />
        </SelectTrigger>
        <SelectContent className="bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200 cursor-pointer">
          {" "}
          <SelectItem className="cursor-pointer" value="IMO1">IMO 1</SelectItem>
          <SelectItem className="cursor-pointer" value="IMO2">IMO 2</SelectItem>
          <SelectItem className="cursor-pointer" value="IMO3">IMO 3</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default BoatSelector;
