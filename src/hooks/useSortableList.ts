import { useState } from "react";
import { Questions } from "../interfaces";

type Direction = "up" | "down";

type UseSortableListReturn = {
  list: [Questions];
  handleMove: (currentIndex: number, direction: Direction) => void;
};

function useSortableList(initialList: [Questions]): UseSortableListReturn {
  const [list, setList] = useState<[Questions]>(initialList);

  const handleMove = (currentIndex: number, direction: Direction) => {
    const newList: [Questions] = [...list];
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < newList.length) {
      const currentItem = newList[currentIndex];
      newList[currentIndex] = newList[newIndex];
      newList[newIndex] = currentItem;
      setList(newList);
    }
  };

  return { list, handleMove };
}

export default useSortableList;
