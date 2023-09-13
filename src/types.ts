export interface Item {
  id: number,
  title: string,
  color: string,
  isActive: boolean,
  date: string,
  listId?: number,
  taskComment: string,
}

export interface List {
  id: number,
  color: string,
  listName: string,
  items: Item[],
}