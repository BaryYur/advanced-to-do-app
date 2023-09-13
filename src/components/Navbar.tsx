import React, { useContext, useState } from "react";

import ListsContext from "../context/list-context";

import NavbarLink from "./NavbarLink";
import { ListModal } from "./ListModal";
import { Plus } from "lucide-react";

const Navbar = ({ isActive }: { isActive: boolean }) => {
  const { todoLists, homeItems, todayItems, completedTasks} = useContext(ListsContext);
  const [openModal, setOpenModal] = useState(false);

  const openModalHandler = () => setOpenModal(true);
  const closeModalHandler = () => setOpenModal(false);

  // const handleKeyPress = (event: any) => {
  //   event.preventDefault();
  //
  //   if (event.ctrlKey && event.key === "d" && !openModal) {
  //     openModalHandler();
  //   }
  // }
  //
  // document.addEventListener("keydown", handleKeyPress);

  return (
    <div
      className={`
        ${!isActive && "left-[-400px]"}
        ${isActive && "left-[10px]"}
        rounded-[22px] h-[calc(100% - 10px)] w-[345px] p-[35px]
        fixed z-[6] top-[10px] bottom-[10px] overflow-y-auto navbar transition-all
        shadow dark:bg-[#2b2e35] bg-white
      `}
    >
      <ul className="flex flex-col">
        <NavbarLink path="Home" isHome color="" counter={homeItems.length} />
        <NavbarLink path="Today" isToday color="" counter={todayItems.length} />
        <NavbarLink path="Completed" isCompleted color="" counter={completedTasks.length} />
        {todoLists.map(todoNav => (
          <NavbarLink
            key={Math.random()}
            listId={todoNav.id}
            path={todoNav.listName}
            color={todoNav.color}
            counter={todoNav.items.length}
          />
        ))}
      </ul>
      <button
        onClick={openModalHandler}
        className="w-full py-[8px] px-[11px] h-[46px] flex items-center justify-between gap-2 hover:bg-gray-50 dark:hover:bg-[#353941] rounded-[13px]"
      >
        <div className="flex items-center gap-2">
          <Plus size={13} strokeWidth={2} />
          <span>Create new list</span>
        </div>
        {/*<div className="flex items-center gap-1">*/}
        {/*  <span*/}
        {/*    className="dark:bg-[#4c5158] dark:text-neutral-400 rounded-[5px] px-[7px] py-[2px] text-[11px] text-[#8e939a] font-semibold bg-[#f2f4f9]"*/}
        {/*  >⌘</span>*/}
        {/*  <span*/}
        {/*    className="dark:bg-[#4c5158] dark:text-neutral-400 rounded-[5px] px-[7px] py-[2px] text-[11px] text-[#8e939a] font-semibold bg-[#f2f4f9]"*/}
        {/*  >D</span>*/}
        {/*</div>*/}
      </button>

      <ListModal
        newList
        isOpen={openModal}
        onClose={closeModalHandler}
        modalTitle="Add new list"
        placeholder="List name"
      />
    </div>
  );
}

export default Navbar;