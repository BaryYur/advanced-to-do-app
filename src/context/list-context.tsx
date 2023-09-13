import React, { useEffect, useState } from "react";

import { List, Item } from "../types";

import useLocalStorage from "../hooks/useLocalStorage";
import useCurrentDate from "../hooks/useCurrentDate";

interface ListsContextType {
  homeItems: Item[];
  getHomeTodoItems: () => void;
  todayItems: Item[];
  getTodayTodoItems: () => void;
  todoLists: List[];
  uncategorizedItems: Item[];
  completedTasks: Item[];
  removeAllTasks: (isHome: boolean, isToday: boolean, isCompleted: boolean, listName: string) => void;
  getCompletedTasks: () => void;
  createList: (list: List) => void;
  isListNameNew: (listName: string) => boolean;
  updateTodoLists: () => void;
  deleteTodoList: (listName: string) => void;
  addNewTask: (listName: string, task: string, color: string, listId: number, date: string | undefined, isActive: boolean, taskComment: string) => void;
  addTask: (listName: string, task: string, color: string, listId: number, date: string | undefined, isActive: boolean, taskComment: string) => void;
  addNotNewUncategorizedTask: (id: number, task: string, isActive: boolean, taskComment: string, date: string) => void;
  changeTask: (listId: number, taskId: number, task: string, newDate: string, newComment: string) => void;
  changeList: (listId: number, listName: string, listColor: string) => void;
  deleteTask: (id: number, listId: number) => void;
}

const ListsContext = React.createContext({
  createList: (list: List) => {},
  getHomeTodoItems: () => {},
  getTodayTodoItems: () => {},
  getCompletedTasks: () => {},
  isListNameNew: (listName: string) => {},
  removeAllTasks: (isHome: boolean, isToday: boolean, isCompleted: boolean, listName:string) => {},
  updateTodoLists: () => {},
  deleteTodoList: (listName: string) => {},
  addNewTask: (listName: string, task: string, color: string, listId: number, date: string | undefined, isActive: boolean, taskComment: string) => {},
  addTask: (listName: string, task: string, color: string, listId: number, date: string | undefined, isActive: boolean, taskComment: string) => {},
  addNotNewUncategorizedTask: (id: number, task: string, isActive: boolean, taskComment: string, date: string) => {},
  changeTask: (listId: number, taskId: number, task: string, newDate: string,  newComment: string) => {},
  changeList: (listId: number, listName: string, listColor: string) => {},
  deleteTask: (id: number, listId: number) => {},
} as ListsContextType);

export const ListProvider = ({ children } : { children: React.ReactNode }) => {
  const [todoLists, setTodoLists] = useLocalStorage("todoLists", []);
  const [todayItems, setTodayItems] = useLocalStorage("todayItems", []);
  const [homeItems, setHomeItems] = useLocalStorage("homeItems", []);
  const [uncategorizedItems, setUncategorizedItems] = useLocalStorage("uncategorizedItems", []);
  const [completedTasks, setCompletedTasks] = useState([]);
  const currentDate = useCurrentDate();

  const createList = (list: List) => {
    setTodoLists(prevItem => {
      return [...prevItem, list];
    });
  }

  const isListNameNew = (listName: string) => {
    let arr = [];

    for (let item of todoLists) {
      arr.push(item.listName);
    }

    return arr.includes(listName);
  }

  const getHomeTodoItems = () => {
    const allItems = todoLists.flatMap(item => item.items);

    setHomeItems([...uncategorizedItems, ...allItems]);
  }

  const getTodayTodoItems = () => {
    let arr1: Item[] = [];
    let arr2: Item[] = [];
    let arr3: Item[] = [];

    for (let item of todoLists) {
      arr1.push(...item.items);
    }

    for (let item of arr1) {
      if (item.date === currentDate) {
        arr2.push(item);
      }
    }

    for (let item of uncategorizedItems) {
      if (item.date === currentDate) {
        arr3.push(item);
      }
    }

    setTodayItems([...arr3, ...arr2]);
    localStorage.setItem("todayItems", JSON.stringify(todayItems));
  }

  const getCompletedTasks = () => {
    const completedTasks: Item[] = [];

    for (let task of uncategorizedItems) {
      if (task.isActive === true) {
        completedTasks.push(task);
      }
    }

    for (let item of todoLists) {
      for (let task of item.items) {
        if (task.isActive === true) {
          completedTasks.push(task);
        }
      }
    }

    setCompletedTasks(completedTasks);
  }

  const updateTodoLists = () => {
    setTodoLists(localStorage.getItem("todoLists"));
  }

  const deleteList = (listName: string) => {
    setTodoLists(todoLists.filter(list => list.listName.toLowerCase() !== listName.toLowerCase()));

    getTodayTodoItems();
    getCompletedTasks();
    getHomeTodoItems();
  }

  const addNewTask = (listName: string, task: string, color: string, listId: number, date: string, isActive: boolean, taskComment: string) => {
    for (let item of todoLists) {
      if (item.listName.toLowerCase() === listName.toLowerCase()) {
        item.items.unshift({
          id: Math.random(),
          title: task,
          isActive: isActive,
          color: color,
          taskComment: taskComment,
          date: date === undefined ? "" : date,
          listId: listId,
        });
      }
    }

    localStorage.setItem("todoLists", JSON.stringify(todoLists));
    getHomeTodoItems();
    getTodayTodoItems();
  }

  const deleteTask = (id: number, listId: number) => {
    for (let item of todoLists) {
      if (item.id === listId) {
        item.items = item.items.filter(task => task.id !== id);
      }
    }

    setHomeItems(homeItems.filter(task => task.id !== id));
    setTodayItems(todayItems.filter(task => task.id !== id));
    setUncategorizedItems(uncategorizedItems.filter(task => task.id !== id));
    getCompletedTasks();

    localStorage.setItem("todoLists", JSON.stringify(todoLists));
    localStorage.setItem("homeItems", JSON.stringify(homeItems));
    localStorage.setItem("todayItems", JSON.stringify(todayItems));
    localStorage.setItem("uncategorizedItems", JSON.stringify(uncategorizedItems));

    getHomeTodoItems();
    getTodayTodoItems();
  }

  const addTask = (listName: string, task: string, color: string, listId: number, date: string, isActive: boolean, taskComment: string) => {
    if (listName !== "") {
      addNewTask(listName, task, color, listId, date, isActive, taskComment);
    } else {
      setUncategorizedItems(prevItem => {
        return [
          {
            id: Math.random(),
            title: task,
            isActive: false,
            color: "",
            taskComment: "",
            date: date === undefined ? "" : date,
          },
          ...prevItem,
        ];
      });
    }

    localStorage.setItem("uncategorizedItems", JSON.stringify(uncategorizedItems));
  }

  const addNotNewUncategorizedTask = (id: number, task: string, isActive: boolean, taskComment: string, date: string) => {
    setUncategorizedItems(prevItem => {
      return [
        {
          id: id,
          title: task,
          isActive: isActive,
          color: "",
          taskComment: taskComment,
          date: date === undefined ? "" : date,
        },
        ...prevItem,
      ];
    });

    localStorage.setItem("uncategorizedItems", JSON.stringify(uncategorizedItems));
  }

  const changeTask = (listId: number, taskId: number, task: string, newDate: string, newComment: string) => {
    if (listId !== 0) {
      for (let list of todoLists) {
        if (list.id === listId) {
          for (let taskItem of list.items) {
            if (taskItem.id === taskId) {
              taskItem.title = task;
              taskItem.date = newDate;
              taskItem.taskComment = newComment;
            }
          }
        }
      }
    } else {
      for (let taskItem of uncategorizedItems) {
        if (taskItem.id === taskId) {
          taskItem.title = task;
          taskItem.date = newDate;
          taskItem.taskComment = newComment;
        }
      }
    }

    localStorage.setItem("todoLists", JSON.stringify(todoLists));
    localStorage.setItem("uncategorizedItems", JSON.stringify(uncategorizedItems));
    getHomeTodoItems();
    getTodayTodoItems();
  }

  const changeList = (listId: number, listName: string, listColor: string) => {
    for (let list of todoLists) {
      if (list.id === listId) {
        list.listName = listName;
        list.color = listColor;

        for (let item of list.items) {
          item.color = listColor;
        }
      }
    }

    localStorage.setItem("todoLists", JSON.stringify(todoLists));
    getHomeTodoItems();
    getTodayTodoItems();
  }

  const removeAllTasks = (isHome: boolean, isToday: boolean, isCompleted: boolean, listName: string) => {
    if (isHome) {
      for (let list of todoLists) {
        list.items = [];
      }

      setUncategorizedItems([]);
    } else if (isToday) {
      for (let list of todoLists) {
        list.items = list.items.filter(item => item.date !== currentDate);
      }

      setUncategorizedItems(uncategorizedItems.filter(item => item.date !== currentDate));
    } else if (isCompleted) {
      for (let list of todoLists) {
        list.items = list.items.filter(item => item.isActive !== true);
      }

      setUncategorizedItems(uncategorizedItems.filter(item => item.isActive !== true));
    } else {
      for (let list of todoLists) {
        if (list.listName === listName) {
          list.items = [];
        }
      }
    }

    getCompletedTasks();

    localStorage.setItem("todoLists", JSON.stringify(todoLists));
    localStorage.setItem("uncategorizedItems", JSON.stringify(uncategorizedItems));
    getHomeTodoItems();
    getTodayTodoItems();
  }

  useEffect(() => {
    getHomeTodoItems();
    getTodayTodoItems();
    getCompletedTasks();
  }, [todoLists, uncategorizedItems]);

  return (
    <ListsContext.Provider
      value={{
        homeItems: homeItems,
        getHomeTodoItems: getHomeTodoItems,
        todayItems: todayItems,
        getTodayTodoItems: getTodayTodoItems,
        todoLists: todoLists,
        uncategorizedItems: uncategorizedItems,
        completedTasks: completedTasks,
        removeAllTasks: removeAllTasks,
        getCompletedTasks: getCompletedTasks,
        createList: createList,
        isListNameNew: isListNameNew,
        addNewTask: addNewTask,
        addTask: addTask,
        addNotNewUncategorizedTask: addNotNewUncategorizedTask,
        deleteTask: deleteTask,
        updateTodoLists: updateTodoLists,
        changeTask: changeTask,
        changeList: changeList,
        deleteTodoList: deleteList,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
}

export default ListsContext;