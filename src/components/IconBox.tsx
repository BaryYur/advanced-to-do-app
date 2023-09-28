import React, { useState } from "react";

import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "../components/ui/dropdown-menu";
import { Input } from "../components/ui/input";
import { ChevronDown } from "lucide-react";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

let colors = [
  "#6930c3", "#7371fc", "#5390d9", "#4ea8de",
  "#0A81D1", "#314CB6", "#d9ed92", "#a7c957",
  "#6a994e", "#cfbaf0", "#6461A0", "#f4d35e",
  "#f79256", "#f95738", "#e63946", "#d00000",
];

interface IconBoxProps {
  color: string,
  emoji: string | undefined,
  isNew: boolean | undefined,
  getIcon: (color: string, emoji: string | undefined) => void,
}

const IconBox: React.FC<IconBoxProps> = ({ color, emoji, getIcon, isNew }) => {
  const [active, setActive] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(emoji);
  let theme = localStorage.getItem("vite-ui-theme");

  const getRandomColor = () => {
    let randomNumber = Math.floor(Math.random() * colors.length);

    return colors[randomNumber];
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center justify-between gap-1 dark:bg-[#2f343d]">
          {!selectedEmoji && <div className="w-[11px] h-[11px] border-2 mx-[0] rounded-[4px]" style={{ borderColor: color }} />}
          {selectedEmoji && <div className="mx-[-4px]">{selectedEmoji}</div>}
          <ChevronDown size={15} className="text-gray-700 dark:text-neutral-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px] max-h-[330px]">
        <div className="flex gap-2">
          <Button
            variant={!active ? "secondary" : "ghost"}
            className={`${!active && "dark:bg-[#2f343d]"} h-[36px]`}
            onClick={() => setActive(false)}
          >Colors</Button>
          <Button
            variant={active ? "secondary" : "ghost"}
            className={`${active && "dark:bg-[#2f343d]"} h-[36px]`}
            onClick={() => setActive(true)}
          >Emoji</Button>
        </div>
        {!active && <ul className="flex flex-wrap justify-between gap-2 my-[10px]">
          {colors.map(color => (
            <li key={Math.random()}>
              <Button
                className="w-[28px] m-0 p-0 h-[28px] flex items-center justify-center"
                variant="ghost"
                onClick={() => {
                  getIcon(color, undefined);
                  setSelectedEmoji(undefined);
                }}
              >
                <span className="w-[16px] m-0 p-0 h-[16px] rounded-[4px]" style={{ backgroundColor: color }} />
              </Button>
            </li>
          ))}
        </ul>}

        {active && <Picker
            data={data}
            theme={theme}
            emojiSize={20}
            emojiButtonSize={29}
            onEmojiSelect={(data: any) => {
              setSelectedEmoji(data.native);
              getIcon(getRandomColor(), data.native);
            }}
          />
        }
        <DropdownMenuSeparator />
        <div className="flex justify-between items-center p-[5px]">
          <div className="text-sm">Custom color</div>
          <div className="w-[16px] m-0 p-0 h-[16px] rounded-[4px] absolute z-[2] right-[88px]" style={{ backgroundColor: color }} />
          <Input
            className="w-[100px] h-[30px] relative z-[1] pl-[25px]"
            value={color}
            onChange={(event) => {
              getIcon(event.target.value, undefined);
            }}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default IconBox;