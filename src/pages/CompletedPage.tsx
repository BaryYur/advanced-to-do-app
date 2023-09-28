import React, { useContext, useEffect } from "react";

import ListsContext from "../context/list-context";

import TaskItem from "../components/TaskItem";
import { CheckSquare, CloudSun } from "lucide-react";

const CompletedPage = () => {
  const { getCompletedTasks, completedTasks, todoLists, uncategorizedItems } = useContext(ListsContext);

  useEffect(() => {
    getCompletedTasks();

    window.scrollTo(0, 0);
  }, [todoLists, uncategorizedItems]);

  return (
    <div className="flex justify-end w-[900px] mx-auto py-[70px] todo-container">
      <div className="w-[630px]">
        <div className="flex items-center">
          <div className="
              flex items-center justify-center fixed z-[2] heading-container
              h-[120px] pt-[45px] top-0 bg-[rgba(255,255,255, 0.3)]
            "
               style={{
                 backdropFilter: "blur(5px)",
               }}
          >
            <div className="flex items-center w-[700px]">
              <CheckSquare size={20} strokeWidth={2.8} />
              <h1 className="qcont text-[25px] ml-[15px]">Completed tasks</h1>
            </div>
            <div
              className="w-[300%] z-[-1] h-[280px] absolute top-[-210px] left-[-100%] opacity-[0.2] bg-blue-600 rounded-b-[100%]"
              style={{
                filter: "blur(45px)",
              }}
            />
          </div>
          <div
            className="w-[75%] h-[280px] fixed bottom-[-280px] left-[18%] opacity-[0.2] z-[0] bg-blue-600 rounded-b-[100%]"
            style={{
              filter: "blur(45px)",
            }}
          />
        </div>
        <div className="py-[40px] pl-[30px] relative w-full todos-container">
          <ul className="flex flex-col gap-1 mt-[16px] w-full">
            {completedTasks.length > 0 && completedTasks.map((item, index) => (
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
                isHome={true}
                isToday={true}
                itemsLength={completedTasks.length}
                emoji={item.emoji}
              />
            ))}
            {completedTasks.length === 0 && (
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
    </div>
  );
}

export default CompletedPage;