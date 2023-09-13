import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import ListsContext from "../context/list-context";

import { Modal } from "./ui/modal";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import IconBox from "../components/IconBox";

import toast from "react-hot-toast";
import { X } from "lucide-react";

interface AlertModalProps {
  listId?: number,
  isOpen: boolean,
  placeholder: string,
  modalTitle: string,
  name?: string,
  listColor?: string,
  newList?: boolean,
  onClose: () => void,
}

const notify = () => {
  return <div className="relative z-[100]">
    {toast.error("Task can not be empty.")}
  </div>
}

export const ListModal: React.FC<AlertModalProps> = ({
  listId,
  isOpen,
  onClose,
  name,
  listColor,
  modalTitle,
  placeholder,
  newList
}) => {
  const navigate = useNavigate();
  const { createList, isListNameNew, changeList, todoLists } = useContext(ListsContext);
  const [listName, setListName] = useState(name || "");
  const [colorInput, setColorInput] = useState(listColor || "#9195a4")

  const submitHandler = (event: any) => {
    event.preventDefault();

    if (newList) {
      if (
        isListNameNew(listName) === true || listName.length === 0 ||
        listName === "Home" || listName === "Today" || listName === "Completed"
      ) {
        // notify();

        return;
      }

      const newList = {
        id: Math.random(),
        color: colorInput,
        listName: listName.trim(),
        items: [],
      }

      createList(newList);
    } else {
      let arr = [];

      for (let list of todoLists) {
        if (list.id !== listId) {
          arr.push(list.listName.trim());
        }
      }

      if (!arr.includes(listName)) {
        changeList(listId ?? 0, listName.trim(), colorInput);
      } else {
        toast.error("Its should be unique name");

        return;
      }

      if (name !== listName) navigate("/app/home");
    }

    setListName("");
    onClose();
  }

  return (
    <Modal
      title={modalTitle}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={submitHandler} className="flex gap-2">
        <IconBox getColor={(color) => setColorInput(color)} color={colorInput} />
        <Input
          type="text"
          placeholder={placeholder}
          value={listName}
          onChange={(event) => setListName(event.target.value)}
          className="dark:bg-[#2f343d]"
        />
      </form>
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button
          className="h-[30px] px-[5px] absolute right-[5px] top-[5px]"
          variant="ghost"
          onClick={onClose}
        >
          <X size={20} />
        </Button>
        <Button variant="secondary" className="dark:bg-[#2f343d]" onClick={submitHandler}>
          Continue
        </Button>
      </div>
    </Modal>
  );
}