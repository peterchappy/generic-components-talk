import React from "react";
import classnames from "classnames";
import "./select.css";

export enum SelectKind {
  SINGLE = "single",
  MULTI = "multi",
}

type SingleSelectProps<T> = {
  kind: SelectKind.SINGLE;
  items: T[];
  selected: T | null;
  onSelected: (selected: T) => void;
};

type MultiSelectProps<T> = {
  kind: SelectKind.MULTI;
  items: T[];
  selected: T[];
  onSelected: (selected: T[]) => void;
};

type GenericSelectProps<T> = SingleSelectProps<T> | MultiSelectProps<T>;

const isMultiSelect = <T extends any>(
  props: GenericSelectProps<T>
): props is MultiSelectProps<T> => props.kind === SelectKind.MULTI;

const buildFunctions = <T extends any>(props: GenericSelectProps<T>) => {
  if (isMultiSelect(props)) {
    const { onSelected, selected } = props;
    return {
      isSelected: (item: T) => selected.includes(item),
      handleSelected: (clickedItem: T) =>
        onSelected(
          selected.includes(clickedItem)
            ? props.selected.filter((item) => item !== clickedItem)
            : [...props.selected, clickedItem]
        ),
    };
  }

  const { onSelected, selected } = props;

  return {
    isSelected: (item: T) => selected === item,
    handleSelected: onSelected,
  };
};

export const GenericSelect = <T extends {}>(props: GenericSelectProps<T>) => {
  const { items } = props;
  const { isSelected, handleSelected } = buildFunctions(props);

  return (
    <div className="list-wrapper">
      {items.map((item) => (
        <div
          key={String(item)}
          className={classnames("list-item", {
            "list-item-selected": isSelected(item),
          })}
          onClick={() => handleSelected(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};
