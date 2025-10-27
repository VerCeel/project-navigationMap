import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  return (
    <ButtonGroup>
      <Input
        type="text"
        className="dark:bg-neutral-950 border-r border-none bg-neutral-50"
        placeholder="Search..."
      />
      <Button
        variant='default'
        className="cursor-pointer bg-neutral-50 dark:bg-neutral-950 hover:bg-white hover:dark:bg-neutral-800"
        aria-label="Search"
      >
        <SearchIcon className="text-neutral-600 dark:text-neutral-400" />
      </Button>
    </ButtonGroup>
  );
}
