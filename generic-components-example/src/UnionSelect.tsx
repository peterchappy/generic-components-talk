import React from "react";
import classnames from "classnames";
import "./select.css";

type UnionSelectProps = {
  items: string[];
  selected: string | string[] | null;
  onSelected: (selected: string[] | string) => void;
};

export const UnionSelect = ({
  items,
  selected,
  onSelected,
}: UnionSelectProps) => {
  const _selected =
    selected === null ? [] : Array.isArray(selected) ? selected : [selected];

  const handleSelected = (clickedItem: string) => {
    onSelected(
      Array.isArray(selected)
        ? selected.includes(clickedItem)
          ? selected.filter((item) => item !== clickedItem)
          : [...selected, clickedItem]
        : clickedItem
    );
  };

  return (
    <div className="list-wrapper">
      {items.map((item) => (
        <div
          key={item}
          className={classnames("list-item", {
            "list-item-selected": _selected.includes(item),
          })}
          onClick={() => handleSelected(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};
