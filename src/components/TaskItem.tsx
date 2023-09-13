import React, { useContext, useEffect, useState, memo, useMemo } from "react";

import useCurrentDate from "../hooks/useCurrentDate";

import ListContext from "../context/list-context";

import { Checkbox } from "./ui/checkbox";
import { Button } from "../components/ui/button";
import { AlignLeft, Delete, MoreVertical, Pencil, Trash2 } from "lucide-react";
import Taskbar from "./Taskbar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../components/ui/dropdown-menu";

interface TaskItemProps {
  id: number,
  index: number,
  title: string,
  isActive: boolean,
  color: string,
  date: string,
  listId: number,
  taskComment: string,
  isHome?: boolean,
  isToday?: boolean,
  submitted: boolean,
  itemsLength: number,
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  index,
  isActive,
  date,
  listId,
  color,
  taskComment,
  isHome,
  isToday,
  submitted,
  itemsLength,
}) => {
  const {
    todoLists,
    getHomeTodoItems,
    getTodayTodoItems,
    getCompletedTasks,
    deleteTask,
    changeTask,
    uncategorizedItems,
  } = useContext(ListContext);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [listName, setListName] = useState("");
  const [taskTitle, setTaskTitle] = useState(title || "");
  const [isOpenTaskbar, setIsOpenTaskbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentDate = useCurrentDate();
  // const formattedTitle = title.length > 40 ? title.slice(0, 40) + "..." : title;

  const getListName = () => {
    let name = "";
    let counter = 0;

    for (let list of todoLists) {
      if (list.id === listId) {
        name = list.listName;
      }

      counter++;
    }

    if (name !== "") {
      setListName(name);
      setLoading(true);
    } else if (name === "" && counter === todoLists.length) {
      setListName("");
      setLoading(true);
    }
  }

  const checkTaskHandler = (id: number, color: string) => {
    if (color !== "") {
      for (let todo of todoLists) {
        if (todo.id === listId) {
          for (let item of todo.items) {
            if (item.id === id) {
              item.isActive = !item.isActive;
            }
          }
        }
      }
    } else {
      for (let item of uncategorizedItems) {
        if (item.id === id) {
          item.isActive = !item.isActive;
        }
      }
    }

    localStorage.setItem("todoLists", JSON.stringify(todoLists));
    localStorage.setItem("uncategorizedItems", JSON.stringify(uncategorizedItems));
    getHomeTodoItems();
    getTodayTodoItems();
    getCompletedTasks();
  }

  const checkTask = (event: any) => {
    event.stopPropagation();

    checkTaskHandler(id, color);
  }

  const taskItemDate = useMemo(() => {
    const [day, month] = date.split("-");
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const formattedMonth = months[Number(month) - 1];

    return `${day} ${formattedMonth}`;
  }, [date]);

  const deleteTaskHandler = (id: number, listId: number) => {
    // if (shouldAnimate) {
    //   setShouldAnimate(false);
    //   deleteTask(id, listId);
    // } else {
      deleteTask(id, listId);
    // }
  }

  useEffect(() => {
    getListName();
  }, [listName]);

  return (
    <div>
      <li
        className={`
        // ${submitted && shouldAnimate && index === 0 ? "slide-in" : ""} 
        ${index === 0 && itemsLength !== 1 && "rounded-t-[13px]"}
        ${index === itemsLength - 1 && itemsLength !== 1 && "rounded-b-[13px]"}
        ${itemsLength === 1 && "rounded-[13px]"}
        ${itemsLength > 1 && "rounded-[6px]"}
        w-full p-[13px] flex items-center justify-between task-item
        bg-[white] dark:bg-[#2f343d] cursor-pointer
      `}
        onClick={() => setIsOpenTaskbar(true)}
      >
        <div className="flex items-center w-[80%] task-item-title">
          <Checkbox
            className="w-[18px] h-[18px] bg-[#e6e6e6] border-none rounded-[6px]"
            checked={isActive}
            onClick={checkTask}
          />
          <label
            className="ml-[12px] relative cursor-pointer w-full truncate"
            style={{
              textDecoration: isActive ? "line-through" : "none",
              textDecorationThickness: "1px",
            }}
          >
            {title}
          </label>
        </div>
        <div className="flex items-center justify-end gap-3 pr-[5px] w-[20%]">
          {taskComment !== "" && <div className="text-gray-300 is-note border-2 dark:border-neutral-500 dark:text-neutral-500 p-[3px] rounded-[5px]">
            <AlignLeft size={11} strokeWidth={3} />
          </div>}
          {date !== "" && <div
            className={`
              ${date === currentDate ? "bg-[#e1e1e155] text-[#757373] dark:text-neutral-300" : "text-red-300 bg-[#ff6b6b1a]"}
              rounded-[7px] px-[7px] py-[3px] text-xs font-medium date-box
            `}
          >
            {taskItemDate}
          </div>}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="
                  px-[8px] h-[30px] dots-btn top-[10px] hover:bg-gray-200
                  opacity-0 invisible absolute right-[6px] top-[10xp] dark:hover:bg-[#4c5158] dark:text-neutral-400
                "
              >
                <MoreVertical size={15} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-[10px] absolute right-[-20px] top-[10px]">
              <DropdownMenuGroup>
                {(
                  <DropdownMenuItem
                    className="cursor-pointer flex items-center gap-2"
                    onClick={() => setIsOpenTaskbar(true)}
                  >
                    <Pencil size={15} strokeWidth={2.6} />
                    <span>Edit</span>
                  </DropdownMenuItem>
                )}
                {(
                  <DropdownMenuItem
                    className="cursor-pointer flex items-center gap-2"
                    onClick={(event) => {
                      event.stopPropagation();

                      deleteTaskHandler(id, listId ?? 0);
                    }}
                  >
                    <Trash2 size={15} strokeWidth={2.6} />
                    <span>Delete</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {color !== "" && (
            <div
              style={{ borderColor: color }}
              className="rounded-[4px] border-[2.3px] h-[10px] w-[10px] color-box"
            />
          )}
        </div>
      </li>

      {loading && <Taskbar
        key={id}
        listId={listId}
        listName={listName}
        taskId={id}
        task={taskTitle}
        checked={isActive}
        checkTask={checkTask}
        date={date}
        color={color}
        comment={taskComment}
        isOpen={isOpenTaskbar}
        onClose={() => setIsOpenTaskbar(false)}
        onDelete={() => deleteTaskHandler(id, listId ?? 0)}
      />}
    </div>
  );
}


export default memo(TaskItem);