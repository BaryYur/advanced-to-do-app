import React, { forwardRef, HTMLAttributes, CSSProperties } from "react";
import TaskItem from "./TaskItem";

export type DragItemProps = HTMLAttributes<HTMLDivElement> & {
  id: string;
  withOpacity?: boolean;
  isDragging?: boolean;

  index: number;
  title: string;
  isActive: boolean;
  color: string;
  date: string;
  listId: string;
  taskComment: string;
  isHome?: boolean;
  isToday?: boolean;
  itemsLength: number;
  emoji: string | undefined;
}

const DragItem = forwardRef<HTMLDivElement, DragItemProps>(({
  id,
  withOpacity,
  isDragging,
  style,

  title,
  index,
  isActive,
  date,
  listId,
  color,
  taskComment,
  isHome,
  isToday,
  itemsLength,
  emoji,
  ...props
}, ref) => {
  const inlineStyles: CSSProperties = {
    opacity: withOpacity ? "0.5" : "1",
    transformOrigin: "50% 50%",
    cursor: isDragging ? "grabbing" : "grab",
    margin: "1px 0",
    transform: isDragging ? "scale(1.05)" : "scale(1)",
    ...style,
  }

  return (
    <div ref={ref}>
      <TaskItem
        id={id}
        title={title}
        index={index}
        isActive={isActive}
        date={date}
        listId={listId}
        color={color}
        taskComment={taskComment}
        isHome={isHome}
        isToday={isToday}
        itemsLength={itemsLength}
        emoji={emoji}
        style={inlineStyles}
      />
    </div>
  );
});

export default DragItem;