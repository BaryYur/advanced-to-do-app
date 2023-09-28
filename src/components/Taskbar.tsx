import React, { useContext, useEffect, useState } from "react";

import ListsContext from "../context/list-context";

import { Checkbox } from "../components/ui/checkbox";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Calendar } from "../components/ui/calendar";

import { CalendarDays, X } from "lucide-react";

interface TaskbarProps {
  listId: string,
  listName: string,
  taskId: string,
  task: string,
  isOpen: boolean,
  checked: boolean,
  date: string,
  color: string,
  emoji: string | undefined,
  comment: string,
  checkTask: (event: any) => void,
  onClose: () => void,
  onDelete: () => void,
}

const TaskBar: React.FC<TaskbarProps> = ({
  listId,
  listName,
  taskId,
  isOpen,
  task,
  checked,
  date,
  color,
  emoji,
  comment,
  checkTask,
  onClose,
  onDelete,
}) => {
  const { changeTask, todoLists, addTask, addNotNewUncategorizedTask } = useContext(ListsContext);
  const [currentTask, setCurrentTask] = useState(task);
  const [activeInput, setActiveInput] = useState(false);
  const [selectValue, setSelectValue] = useState(listName);
  const [taskRows, setTaskRows] = useState(1);
  const [taskComment, setTaskComment] = useState(comment);
  const [taskDate, setTaskDate] = useState<Date | undefined>();
  const [currentDate, setCurrentDate] = useState(date);
  const [activeDate, setActiveDate] = useState(true);

  const taskInputHandler = (event: any) => {
    setCurrentTask(event.target.value);
  }

  const textareaHandler = (minRow: number, maxRow: number, input: string) => {
    const textareaLineHeight = 24;
    const minRows = minRow;
    const maxRows = maxRow;

    const textarea = document.getElementById(input);
    const previousRows = textarea ? textarea.rows : minRows;

    if (textarea) {
      textarea.rows = minRows;

      const currentRows = Math.floor(
        textarea.scrollHeight / textareaLineHeight
      );

      if (currentRows === previousRows) {
        textarea.rows = currentRows;
      }

      if (currentRows >= maxRows) {
        textarea.rows = maxRows;
        textarea.scrollTop = textarea.scrollHeight;
      }

      setTaskRows(currentRows < maxRows ? currentRows : maxRows);
    }
  }

  const taskTextarea = () => textareaHandler(1, 5, "task-input");
  const formattedDate = () => {
    if (taskDate) {
      const year = taskDate.getFullYear();
      const month = taskDate.getMonth() + 1;
      const day = taskDate.getDate();

      setCurrentDate(`${day}-${month}-${year}`);
    }
  }

  const submitHandler = (event: any) => {
    event.preventDefault();

    let finalDate = "";

    if (taskDate) {
      const year = taskDate.getFullYear();
      const month = taskDate.getMonth() + 1;
      const day = taskDate.getDate();

      finalDate = `${day}-${month}-${year}`;
    }

    if (listName !== selectValue && selectValue !== "") {
      let newColor = "";
      let newListId = "0";

      for (let list of todoLists) {
        if (list.listName === selectValue) {
          newColor = list.color;
          newListId = list.id;
        }
      }

      addTask(selectValue, currentTask, newColor, newListId, finalDate, checked, taskComment, emoji);
      onDelete();
    } else if (selectValue !== "" && listName !== "") {
      changeTask(listId, taskId, currentTask, finalDate, taskComment);
    } else if (selectValue === "") {
      onDelete();
      addNotNewUncategorizedTask(taskId, currentTask, checked, taskComment, finalDate);
    }
  }

  useEffect(() => {
    formattedDate();
    // taskTextarea();
  }, [currentTask, activeInput, currentDate, taskDate]);

  useEffect(() => {
    if (date !== "") {
      const parts = date.split("-");
      const year = parseInt(parts[2]);
      const month = parseInt(parts[1]) - 1;
      const day = parseInt(parts[0]);

      setTaskDate(new Date(year, month, day));
    }
  }, [date]);

  return (
    <div>
      {isOpen && <div
        className="w-full h-full z-[4] fixed left-0 top-0"
        onClick={onClose}
      />}
      <div
          className={`
            ${!isOpen && "right-[-400px]"}
            ${isOpen && "right-[10px]"}
            rounded-[22px] h-[calc(100% - 10px)] w-[320px] p-[15px]
            fixed z-[4] top-[10px] bottom-[10px] overflow-y-auto transition-all
            shadow bg-white dark:bg-[#2b2e35]
          `}
        >
          <div className="flex justify-end">
            <Button
              variant="ghost"
              className="p-[9px] h-[30px]"
              onClick={onClose}
            >
              <X size={15} />
            </Button>
          </div>
          <div className="mt-[10px]">
            <form onSubmit={submitHandler}>
              <Checkbox
                checked={checked}
                className="w-[18px] h-[18px] bg-[#e6e6e6] border-none rounded-[6px] top-[68px] left-[24px] absolute z-[1]"
                onClick={checkTask}
              />
              <textarea
                id="task-input"
                // rows={activeInput ? taskRows : 1}
                rows={activeInput ? 5 : 1}
                value={activeInput || currentTask.length <= 20 ? currentTask : currentTask.slice(0, 20) + "..."}
                onChange={taskInputHandler}
                className="
                  p-[10px] pl-[34px] w-full rounded-[10px] placeholder-[grey] bg-gray-50 dark:bg-[#2f343d]
                "
                style={{
                  textDecoration: checked && !activeInput ? "line-through" : "none",
                  textDecorationThickness: "1px",
                }}
                onFocus={() => {
                  setActiveInput(true);

                  taskTextarea();
                }}
                onBlur={() => setActiveInput(false)}
              />

              <div className="p-[10px] bg-gray-100 rounded-[10px] flex flex-col gap-4 dark:bg-[#2f343d]">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">List</div>
                  <div>
                    <Select
                      defaultValue={listName === "" ? "" : listName}
                      onValueChange={(value) => setSelectValue(value)}
                    >
                      <SelectTrigger className="h-[30px] min-w-[90px] max-w-[200px] text-xs font-semibold text-gray-700 dark:bg-[#353941] dark:text-neutral-300 px-[7px] border-none">
                        <SelectValue placeholder={listName ? "No list" : listName} />
                      </SelectTrigger>
                      <SelectContent className="right-[23px]">
                        <SelectGroup>
                          {todoLists.map(todo => (
                            <SelectItem
                              key={Math.random()}
                              value={todo.listName}
                            >
                              <div className="text-xs font-semibold flex justify-start items-center gap-1.5 mr-[5px]">
                                {!todo.emoji && <div style={{ borderColor: todo.color }} className="border-[2.3px] ml-[2px] min-w-[10px] w-[10px] h-[10px] rounded-[4px]" />}
                                {todo.emoji && <div className="text-[11px]">{todo.emoji}</div>}
                                {todo.listName.length > 19 ? todo.listName.slice(0, 19) + "..." : todo.listName}
                              </div>
                            </SelectItem>
                          ))}
                          <SelectItem value="">
                            <div className="text-xs font-semibold flex items-center gap-1.5 text-s">
                              <span className="border-gray-300 border-[2.3px] ml-[2px] w-[10px] h-[10px] rounded-[4px] block" />
                              No list
                            </div>
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">Date</div>
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className="h-[30px] dark:bg-[#353941] dark:text-neutral-300 text-xs bg-white hover:bg-white text-gray-700 px-[9px]"
                        >
                          <CalendarDays size={16} strokeWidth={3} />
                          {currentDate !== "" && activeDate && <span className="ml-[5px]">{currentDate}</span>}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="rounded-[8px] absolute right-[-20px] top-[12px]">
                        <Calendar
                          mode="single"
                          selected={taskDate}
                          onSelect={(date) => {
                            setTaskDate(date);

                            if (date) {
                              setActiveDate(true);
                            } else {
                              setActiveDate(false);
                            }
                          }}
                        />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              <textarea
                id="comment-input"
                rows={5}
                value={taskComment}
                onChange={(event) => setTaskComment(event.target.value)}
                placeholder="Write something"
                className="
                  bg-amber-100 bg-opacity-50 p-[10px] rounded-[10px] w-full mt-[10px] text-sm text-gray-500 dark:bg-opacity-10 dark:border-none
                  border-2 border-transparent focus:border-amber-100 placeholder:text-amber-200 dark:text-neutral-50
                "
              />

              <Button
                type="submit"
                className="absolute bottom-[60px] left-[15px] w-[300px]"
                variant="secondary"
              >Save</Button>
              <Button
                variant="outline"
                className="absolute bottom-[15px] left-[15px] w-[300px] border-none bg-[#ff6b6b1a] text-red-400 hover:text-red-400 hover:bg-[#ff6b6b1a]"
                onClick={onDelete}
              >
                Delete
              </Button>
            </form>
        </div>
      </div>
    </div>
  );
}

export default TaskBar;