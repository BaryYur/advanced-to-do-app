import React, { useContext, useEffect, useMemo } from "react";

import ListsContext from "../context/list-context";

import TaskItem from "../components/TaskItem";
import FormInput from "../components/FormInput";
import { Calendar, CloudSun } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const notify = () => toast.error("Task can not be empty.");

const TodayPage = () => {
  const { todayItems, getTodayTodoItems, getHomeTodoItems, uncategorizedItems } = useContext(ListsContext);

  const todayTaskItems = useMemo(() => {
    if (todayItems.length > 0) {
      return todayItems.map((item, index)=> (
        <TaskItem
          key={item.id}
          id={item.id}
          styleIndex={index}
          index={item.index}
          title={item.title}
          color={item.color}
          isActive={item.isActive}
          date={item.date}
          listId={item.listId || "0"}
          taskComment={item.taskComment}
          isHome={true}
          isToday={true}
          itemsLength={todayItems.length}
          emoji={item.emoji}
        />
      ));
    }

    return null;
  }, [todayItems]);

  useEffect(() => {
    // getHomeTodoItems();
    // getTodayTodoItems();

    window.scrollTo(0, 0);
    // }, [uncategorizedItems]);
  }, []);

  return (
    <div className="flex justify-end w-[900px] mx-auto py-[70px] todo-container">
      <div className="w-[630px]">
        <div className="flex items-center">
          <div className="
              flex items-center justify-center fixed z-[2] heading-container
              h-[100px] pt-[45px] top-0 bg-[rgba(255,255,255, 0.3)]
            "
               style={{
                 backdropFilter: "blur(5px)",
               }}
          >
            <div className="flex items-center w-[700px]">
              <Calendar size={20} strokeWidth={2.8} />
              <h1 className="qcont text-[25px] ml-[15px]">Today</h1>
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
        <div className="py-[40px] pl-[30px] w-full relative z-2 todos-container">
          <FormInput path="today" />

          <ul className="flex flex-col gap-[1.2px] mt-[16px] w-full">
            {todayTaskItems}
            {todayItems.length === 0 && (
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

export default TodayPage;