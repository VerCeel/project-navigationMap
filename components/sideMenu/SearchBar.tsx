import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="flex">
      <Input
        type="text"
        placeholder="Entrer votre adresse"
        className="bg-white dark:bg-neutral-950 min-w-lg rounded-br-none rounded-tr-none"
      />
      <Button
        variant="outline"
        className="cursor-pointer rounded-bl-none rounded-tl-none bg-white dark:bg-neutral-950"
      >
        <Search className="mx-2" />
      </Button>
    </div>
  );
}
