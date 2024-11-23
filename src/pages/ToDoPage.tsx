import React, { useContext, useEffect, useState } from "react";

import { List } from "../types";

import { useNavigate, useParams } from "react-router-dom";

import ListsContext from "../context/list-context";

import TaskItem from "../components/TaskItem";
import FormInput from "../components/FormInput";
import { CloudSun } from "lucide-react";

import { Toaster } from "react-hot-toast";

// import {
//   DndContext,
//   closestCenter,
//   MouseSensor,
//   TouchSensor,
//   DragOverlay,
//   useSensor,
//   useSensors,
//   DragStartEvent,
//   DragEndEvent,
// } from "@dnd-kit/core";
// import { arrayMove, SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
// import SortableTaskItem from "../components/SortableTaskItem";
// import DragItem from "../components/DragItem";

// const notify = () => toast.error("Task can not be empty.");

const ToDoPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { todoLists, getHomeTodoItems } = useContext(ListsContext);
  const [isCurrentTodoLoaded, setIsCurrentTodoLoaded] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({} as List);

  const checkingTodoName = () => {
    let arr = [];

    for (let list of todoLists) {
      arr.push(list.listName.toLowerCase());

      if (list.listName.toLowerCase() === params.todo) {
        setCurrentTodo(list);
        // setItems(list.items);
        setIsCurrentTodoLoaded(true);
      }
    }

    if (params.todo) return arr.includes(params.todo);
  }

  // const [items, setItems] = useState<Item[]>([]);
  // const [activeId, setActiveId] = useState<string | null>(null);
  // const [activeName, setActiveName] = useState<string | null>(null);
  // const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  //
  // const handleDragStart = useCallback((event: DragStartEvent) => {
  //   setActiveId(event.active.id.toString());
  //   setActiveName("dragging");
  // }, []);

  //dragging
  // const handleDragEnd = useCallback((event: DragEndEvent) => {
  //   const { active, over } = event;
  //
  //   if (active.id !== over?.id) {
  //     setItems((items) => {
  //       const oldIndex = items.findIndex((item) => item.index === active.id);
  //       const newIndex = items.findIndex((item) => item.index === over!.id);
  //
  //       console.log(active.id);
  //       const newItems = [...items];
  //       const [movedItem] = newItems.splice(oldIndex, 1);
  //       newItems.splice(newIndex, 0, movedItem);
  //
  //       // localStorage.setItem("dragItems", JSON.stringify(newItems));
  //
  //       return newItems;
  //     });
  //   }
  //
  //   setActiveId(null);
  // }, []);
  //
  // const handleDragCancel = useCallback(() => {
  //   setActiveId(null);
  // }, []);

  useEffect(() => {
    if (checkingTodoName() === false) {
      navigate("/app/home");
    }

    window.scrollTo(0, 0);
  }, [params.todo, getHomeTodoItems, checkingTodoName, navigate]);

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

          <ul className="flex flex-col gap-[1px] mt-[16px] w-full">
            {isCurrentTodoLoaded && currentTodo.items.map((item, index) => (
              <TaskItem
                key={item.id}
                id={item.id}
                index={item.index}
                styleIndex={index}
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

            {/*<DndContext*/}
            {/*  sensors={sensors}*/}
            {/*  collisionDetection={closestCenter}*/}
            {/*  onDragStart={handleDragStart}*/}
            {/*  onDragEnd={handleDragEnd}*/}
            {/*  onDragCancel={handleDragCancel}*/}
            {/*>*/}
            {/*  <SortableContext items={items.map((item) => item.index)} strategy={rectSortingStrategy}>*/}
            {/*    <div className="flex flex-col gap-[2px] mt-[16px] w-full">*/}
            {/*      {items.map((item, index) => (*/}
            {/*        <SortableTaskItem*/}
            {/*          key={item.id}*/}
            {/*          id={item.id}*/}
            {/*          index={item.index}*/}
            {/*          styleIndex={index}*/}
            {/*          title={item.title}*/}
            {/*          color={item.color}*/}
            {/*          isActive={item.isActive}*/}
            {/*          date={item.date}*/}
            {/*          listId={item.listId || ""}*/}
            {/*          taskComment={item.taskComment}*/}
            {/*          itemsLength={currentTodo.items.length}*/}
            {/*          emoji={currentTodo.emoji}*/}
            {/*        />*/}
            {/*      ))}*/}
            {/*    </div>*/}
            {/*  </SortableContext>*/}
            {/*  <DragOverlay adjustScale style={{ transformOrigin: "0 0" }}>*/}
            {/*    {activeId ? <DragItem*/}
            {/*      id={activeId}*/}
            {/*      title={activeName ?? ""}*/}
            {/*      index={0}*/}
            {/*      styleIndex={0}*/}
            {/*      color=""*/}
            {/*      isActive={false}*/}
            {/*      date=""*/}
            {/*      listId=""*/}
            {/*      taskComment=""*/}
            {/*      itemsLength={0}*/}
            {/*      emoji=""*/}
            {/*      isDragging*/}
            {/*    /> : null}*/}
            {/*  </DragOverlay>*/}
            {/*</DndContext>*/}

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