import React, { forwardRef, HTMLAttributes, CSSProperties } from "react";
import TaskItem from "./TaskItem";

export type DragItemProps = HTMLAttributes<HTMLDivElement> & {
  id: string;
  withOpacity?: boolean;
  isDragging?: boolean;

  index: number;
  styleIndex: number;
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
  styleIndex,
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
    transform: isDragging ? "scale(1.02)" : "scale(1)",
    borderRadius: isDragging ? "13px" : "",
    ...style,
  }

  return (
    <div ref={ref} {...props} style={inlineStyles}>
      <TaskItem
        id={id}
        title={title}
        styleIndex={styleIndex}
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