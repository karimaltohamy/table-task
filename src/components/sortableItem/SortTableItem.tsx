import React, { ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Questions } from "../../interfaces";

interface SortTableItemProps {
  id: string;
  index: number;
  question: Questions; // Adjust the type according to your question object
  children: ReactNode;
  classes: string;
}

const SortTableItem: React.FC<SortTableItemProps> = ({
  id,
  index,
  children,
  classes,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <tr
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={classes}
      onKeyDown={handleKeyDown}
    >
      {children &&
        React.Children.map(children, (child, childIndex) => {
          return React.cloneElement(child as React.ReactElement, {
            key: childIndex,
          });
        })}
    </tr>
  );
};

export default SortTableItem;
