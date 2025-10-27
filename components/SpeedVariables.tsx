import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";


interface SpeedVariablesProps {
  selectedVariable: string;
  setSelectedVariable: (variable: string) => void;
}

const SpeedVariables : React.FC<SpeedVariablesProps> = ({selectedVariable, setSelectedVariable})=> {
  return (
    <div>
        <Select value={selectedVariable} onValueChange={setSelectedVariable}>
        <SelectTrigger
          id="ship-select-trigger"
          className="w-full bg-white dark:bg-neutral-900 cursor-pointer"
        >
          {" "}
          <SelectValue placeholder="Choisir une variable" />
        </SelectTrigger>
        <SelectContent className="bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200 cursor-pointer">
          {" "}
          <SelectItem className="cursor-pointer" value="speed">Vitesse</SelectItem>
          <SelectItem className="cursor-pointer" value="rpm">RPM</SelectItem>
          <SelectItem className="cursor-pointer" value="draft">Tirant d&apos;eau</SelectItem>
          <SelectItem className="cursor-pointer" value="trim">Assiette</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default SpeedVariables