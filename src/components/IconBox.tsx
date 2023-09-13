import React from "react";

import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "../components/ui/dropdown-menu";
import { Input } from "../components/ui/input";
import { ChevronDown } from "lucide-react";

let colors = [
  "#6930c3", "#7371fc", "#5390d9", "#4ea8de",
  "#d9ed92", "#a7c957", "#6a994e", "#cfbaf0",
  "#f4d35e", "#f79256", "#f95738", "#d00000",
];

interface IconBoxProps {
  color: string,
  getColor: (color: string) => void,
}

const IconBox: React.FC<IconBoxProps> = ({ color, getColor }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center justify-between gap-1 dark:bg-[#2f343d]">
          <div className="w-[11px] h-[11px] border-2 mx-[0] rounded-[4px]" style={{ borderColor: color }} />
          <ChevronDown size={15} className="text-gray-700 dark:text-neutral-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <Button variant="secondary" className="block h-[32px] flex items-center dark:bg-[#2f343d]">Colors</Button>
        <ul className="flex flex-wrap justify-between gap-2 my-[10px]">
          {colors.map(color => (
            <li key={Math.random()}>
              <Button
                className="w-[28px] m-0 p-0 h-[28px] flex items-center justify-center"
                variant="ghost"
                onClick={() => getColor(color)}
              >
                <span className="w-[16px] m-0 p-0 h-[16px] rounded-[4px]" style={{ backgroundColor: color }} />
              </Button>
            </li>
          ))}
        </ul>
        <DropdownMenuSeparator />
        <div className="flex justify-between items-center p-[5px]">
          <div className="text-sm">Custom color</div>
          <div className="w-[16px] m-0 p-0 h-[16px] rounded-[4px] absolute z-[2] right-[88px]" style={{ backgroundColor: color }} />
          <Input
            className="w-[100px] h-[30px] relative z-[1] pl-[25px]"
            value={color}
            onChange={(event) => getColor(event.target.value)}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default IconBox;