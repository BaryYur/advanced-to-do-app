import React, { FC } from "react";

import { useSortable } from "@dnd-kit/sortable";

import DragItem, { DragItemProps } from "./DragItem";
import { CSS } from "@dnd-kit/utilities";

const SortableTaskItem: FC<DragItemProps> = (props) => {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  }

  return (
    <DragItem
      ref={setNodeRef}
      style={style}
      withOpacity={isDragging}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
}

export default SortableTaskItem;