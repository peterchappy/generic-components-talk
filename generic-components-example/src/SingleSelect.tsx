import React from "react";
import classnames from "classnames";
import "./select.css";

type SingleSelectProps = {
  items: string[];
  selected: string | null;
  onSelected: (selected: string) => void;
};

export const SingleSelect = ({
  items,
  selected,
  onSelected,
}: SingleSelectProps) => (
  <div className="list-wrapper">
    {items.map((item) => (
      <div
        key={item}
        className={classnames("list-item", {
          "list-item-selected": item === selected,
        })}
        onClick={() => onSelected(item)}
      >
        {item}
      </div>
    ))}
  </div>
);
