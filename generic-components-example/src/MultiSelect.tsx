import React from "react";
import classnames from "classnames";
import "./select.css";

type MultiSelectProps = {
  items: string[];
  selected: string[];
  onSelected: (selected: string[]) => void;
};

export const MultiSelect = ({
  items,
  selected,
  onSelected,
}: MultiSelectProps) => {
  const handleSelected = (clickedItem: string) =>
    onSelected(
      selected.includes(clickedItem)
        ? selected.filter((item) => item !== clickedItem)
        : [...selected, clickedItem]
    );

  return (
    <div className="list-wrapper">
      {items.map((item) => (
        <div
          key={item}
          className={classnames("list-item", {
            "list-item-selected": selected.includes(item),
          })}
          onClick={() => handleSelected(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};
