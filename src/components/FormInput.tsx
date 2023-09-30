import React, { useContext, useEffect, useState } from "react";

import ListsContext from "../context/list-context";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Checkbox } from "../components/ui/checkbox";
import { Calendar } from "../components/ui/calendar";

import { CalendarDays } from "lucide-react";

const FormInput = ({ path }: { path: string | undefined }) => {
  const { todoLists, addTask, uncategorizedItems } = useContext(ListsContext);
  const [task, setTask] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [rightInputPadding, setRightInputPadding] = useState<number | undefined>(20);

  const submitNewTaskHandler = (event: any) => {
    event.preventDefault();

    let taskDate;

    if (date) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      taskDate = `${day}-${month}-${year}`;
    }

    if (task.length === 0) return;

    if (selectValue !== "") {
      for (let list of todoLists) {
        if (list.listName.toLowerCase() === selectValue) {
          addTask(0, list.listName, task, list.color, list.id, taskDate, false, "", list.emoji);
        }
      }
    } else {
      addTask(0, "", task, "", "0", taskDate, false, "", undefined);
    }

    setTask("");
    // setActiveInput(false);

    // setTimeout(() => {
    //   document.getElementById("task-0").classList.add("slide-in");
    // }, 10);
    //
    // setTimeout(() => {
    //   document.getElementById("task-0").classList.remove("slide-in");
    // }, 1000);
  }

  useEffect(() => {
    setRightInputPadding(document.getElementById("select-box")?.clientWidth);
    if (path !== "home" && path !== "today") {
      setSelectValue(path || "");
    } else {
      setSelectValue("");
    }
  }, [path]);

  return (
    <form onSubmit={submitNewTaskHandler} className="relative">
      <input
        className={`
          w-full rounded-[13px] placeholder-[grey]
          bg-gray-200 form-input p-[13px] dark:bg-[#2f343d]
        `}
        style={{
          paddingRight: `${rightInputPadding && rightInputPadding + 20}px`,
          transition: "all 0.2s ease-in-out",
        }}
        placeholder="Create a new task"
        value={task}
        onChange={(event) => setTask(event.target.value)}
      />
      <Checkbox checked={false} className="checkbox w-[18px] max-h-[18px] h-[18px] absolute hidden border-none bg-[#e6e6e6] left-[13px] top-[16px] rounded-[6px]" />

      <div id="select-box" className="select absolute right-[13px] top-[10px] flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="h-[30px] relative bg-[whitesmoke] hover:bg-[whitesmoke] dark:bg-[#353941] dark:text-neutral-300 text-gray-700 px-[9px]"
            >
              <CalendarDays size={16} strokeWidth={3} />
              {date !== undefined && <div className="absolute right-[-1px] top-[-1px] w-[6px] max-h-[6px] h-[6px] bg-blue-600 rounded-[3px]" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-[8px] absolute right-[-20px] top-[12px]">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
            />
          </DropdownMenuContent>
        </DropdownMenu>

        {(path === "home" || path === "today") && <Select
          defaultValue={(path === "home" || path === "today") ? "" : path}
          onValueChange={(value) => {
            setSelectValue(value);
            setRightInputPadding(document.getElementById("select-box")?.clientWidth);
          }}
        >
          <SelectTrigger className="min-w-[90px] relative h-[30px] dark:bg-[#353941] dark:text-neutral-300 text-xs font-semibold text-gray-700 px-[7px] border-none bg-[whitesmoke]">
            <SelectValue placeholder={(path === "home" || path === "today") ? "No list" : path} />
          </SelectTrigger>
          <SelectContent className="top-[12px] max-w-[210px]">
            <SelectGroup>
              {todoLists.map(todo => (
                <SelectItem
                  key={Math.random()}
                  value={todo.listName.toLowerCase()}
                >
                  <div className="text-xs font-semibold flex justify-start items-center gap-1.5">
                    {!todo.emoji && <div style={{ borderColor: todo.color }} className="border-[2.3px] ml-[2px] w-[9px] h-[9px] rounded-[3.5px]" />}
                    {todo.emoji && <div className="text-[11px]">{todo.emoji}</div>}
                    {todo.listName.length > 25 ? todo.listName.slice(0, 24) + "..." : todo.listName}
                  </div>
                </SelectItem>
              ))}
              <SelectItem value="">
                <div className="flex items-center text-xs font-semibold gap-1.5 text-s">
                  <span className="ml-[2px] border-gray-300 border-[2.3px] w-[9px] h-[9px] rounded-[3.5px] block" />
                  No list
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>}
      </div>
    </form>
  );
}

export default FormInput;