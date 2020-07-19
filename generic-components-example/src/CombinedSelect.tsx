import React from "react";
import classnames from "classnames";
import "./select.css";

type CombinedSelectProps = {
  items: string[];
  selected?: string | null;
  multiSelected?: string[];
  onSingleSelected?: (selected: string) => void;
  onMultiSelected?: (selected: string[]) => void;
};

export const CombinedSelect = ({
  items,
  selected,
  multiSelected,
  onSingleSelected,
  onMultiSelected,
}: CombinedSelectProps) => {
  const _selected =
    selected && selected !== null
      ? [selected]
      : multiSelected
      ? multiSelected
      : [];

  const handleSelected = (clickedItem: string) => {
    if (onSingleSelected) {
      onSingleSelected(clickedItem);
    }
    if (onMultiSelected && multiSelected) {
      onMultiSelected(
        multiSelected.includes(clickedItem)
          ? multiSelected.filter((item) => item !== clickedItem)
          : [...multiSelected, clickedItem]
      );
    }
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
