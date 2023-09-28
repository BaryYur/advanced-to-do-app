import React, { useContext, useEffect, useState } from "react";

import { List } from "../types";

import { useNavigate, useParams } from "react-router-dom";

import ListsContext from "../context/list-context";

import TaskItem from "../components/TaskItem";
import FormInput from "../components/FormInput";
import { CloudSun } from "lucide-react";

import toast, { Toaster } from "react-hot-toast";

const notify = () => toast.error("Task can not be empty.");

const ToDoPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { todoLists, uncategorizedItems, getTodayTodoItems, getHomeTodoItems } = useContext(ListsContext);
  const [isCurrentTodoLoaded, setIsCurrentTodoLoaded] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({} as List);

  const checkingTodoName = () => {
    let arr = [];

    for (let list of todoLists) {
      arr.push(list.listName.toLowerCase());

      if (list.listName.toLowerCase() === params.todo) {
        setCurrentTodo(list);
        setIsCurrentTodoLoaded(true);
      }
    }

    if (params.todo) return arr.includes(params.todo);
  }

  useEffect(() => {
    if (checkingTodoName() === false) {
      navigate("/app/home");
    }

    window.scrollTo(0, 0);
  }, [params.todo]);

  return (
    <div className="flex justify-end w-[900px] mx-auto py-[70px] todo-container">
      <div className="w-[630px]">
        <div className="flex items-center">
          <div className="
              flex items-center fixed z-[2] w-[700px] heading-container
              h-[100px] pt-[45px] top-0 bg-[rgba(255,255,255, 0.3)]
            "
               style={{
                 backdropFilter: "blur(5px)",
               }}
          >
            {!currentTodo.emoji && <div
              style={{ borderColor: currentTodo.color }}
              className="rounded-[8px] border-[3px] min-w-[20px] items-start h-[20px] w-[20px] mr-[-5px]"
            />}
            {currentTodo.emoji && <div className="text-[22px] mr-[-10px] ml-[-5px]">{currentTodo.emoji}</div>}
            <div>
              <h1 className="qcont text-[25px] ml-[15px]">{params.todo}</h1>
            </div>
            <div
              className="w-[300%] z-[-1] h-[280px] absolute top-[-230px] left-[-100%] opacity-[0.2]"
              style={{
                backgroundColor: currentTodo.color,
                filter: "blur(45px)",
                borderRadius: "0 0 100% 100%",
                transition: "all 0.2s ease-in"
              }}
            />
          </div>
          <div
            className="w-[80%] h-[280px] fixed bottom-[-280px] left-[10%] opacity-[0.2] z-[0]"
            style={{
              backgroundColor: currentTodo.color,
              filter: "blur(45px)",
              borderRadius: "0 0 100% 100%",
              transition: "all 0.2s ease-in"
            }}
          />
        </div>
        <div className="pl-[30px] py-[40px] w-full relative todos-container">
          <FormInput path={params.todo} />

          <ul className="flex flex-col gap-1 mt-[16px] w-full">
            {isCurrentTodoLoaded && currentTodo.items.map((item, index) => (
              <TaskItem
                key={item.id}
                id={item.id}
                index={index}
                title={item.title}
                color={item.color}
                isActive={item.isActive}
                date={item.date}
                listId={item.listId || ""}
                taskComment={item.taskComment}
                itemsLength={currentTodo.items.length}
                emoji={currentTodo.emoji}
              />
            ))}
            {isCurrentTodoLoaded && currentTodo.items.length === 0 && (
              <div className="flex items-center flex-col gap-2 justify-center text-zinc-300 mt-[150px]">
                <div>
                  <CloudSun size={50} />
                </div>
                <div>You are all done</div>
              </div>
            )}
          </ul>
        </div>
      </div>

      <Toaster />
    </div>
  );
}

export default ToDoPage;