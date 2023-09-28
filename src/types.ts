export interface Item {
  id: string,
  title: string,
  color: string,
  isActive: boolean,
  date: string,
  listId?: string,
  taskComment: string,
  emoji: undefined | string,
}

export interface List {
  id: string,
  color: string,
  emoji: undefined | string,
  listName: string,
  items: Item[],
}