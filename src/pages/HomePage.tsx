import React, { useContext, useEffect, useMemo } from "react";

import useCurrentDate from "../hooks/useCurrentDate";

import ListsContext from "../context/list-context";

import TaskItem from "../components/TaskItem";
import FormInput from "../components/FormInput";
import { CloudSun } from "lucide-react";

import { Toaster } from "react-hot-toast";

// const notify = () => toast.error("Task can not be empty.");

const HomePage = () => {
  const { homeItems } = useContext(ListsContext);
  const currentDate = useCurrentDate();

  const currentD = new Date();
  const currentDayOfWeek = currentD.getDay();

  const homeDate = useMemo(() => {
    const [day, month] = currentDate.split("-");
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const daysOfWeek = [
      "Sunday", "Monday", "Tuesday", "Wednesday",
      "Thursday", "Friday", "Saturday"
    ];

    const formattedMonth = months[Number(month) - 1];
    const formattedDay = daysOfWeek[currentDayOfWeek];

    return `${formattedDay} ${formattedMonth}, ${day}`;
  }, [currentDate, currentDayOfWeek]);

  const filteredHomeItems = useMemo(() => {
    if (homeItems.length > 0) {
      return homeItems.map((item, index) => (
        <TaskItem
          key={item.id}
          id={item.id}
          index={item.index}
          styleIndex={index}
          title={item.title}
          color={item.color}
          isActive={item.isActive}
          date={item.date}
          listId={item.listId || "0"}
          taskComment={item.taskComment}
          isHome={true}
          isToday={false}
          itemsLength={homeItems.length}
          emoji={item.emoji}
        />
      ));
    }

    return null;
  }, [homeItems, currentDayOfWeek]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex justify-end w-[900px] mx-auto py-[70px] todo-container">
      <div className="w-[630px]">
        <div className="flex items-center">
          <div className="
              flex items-center justify-center fixed z-[2] heading-container
              h-[150px] pt-[55px] top-0 bg-[rgba(255,255,255, 0.3)]
            "
               style={{
                 backdropFilter: "blur(5px)",
               }}
          >
            <div className="pl-[30px] heading w-[700px]">
              <h1 className="qcont text-[25px]">Home</h1>
              <div className="text-gray-400 text-[21px]">
                It's {homeDate} -
                {homeItems.length > 1 && homeItems.length !== 0 ?
                  <span> {homeItems.length} tasks</span> :
                  <span> {homeItems.length} task</span>
                }
              </div>
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
        <div className="pt-[75px] pl-[30px] relative w-full todos-container">
          <FormInput path="home" />

          <ul className="flex flex-col gap-[1.2px] mt-[16px] w-full">
            {filteredHomeItems}
            {homeItems.length === 0 && (
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

export default HomePage;