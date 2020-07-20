---
marp: true
theme: olive
_class: invert
---

# Generic React Components

with Typescript

---

About Myself

---

Show Single Select

---

```ts
type SingleSelectProps = {
  items: string[];
  selected: string | null;
  onSelected: (selected: string) => void;
};
```

---

```ts
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
```

---

```ts
const App = () => {
  const [singleSelected, setSingleSelected] = useState("");

  return (
    <SingleSelect
      items={items}
      selected={singleSelected}
      onSelected={setSingleSelected}
    />
  );
};
```

---

Show Multi Select

---

```ts
type MultiSelectProps = {
  items: string[];
  selected: string[];
  onSelected: (selected: string[]) => void;
};
```

---

```ts
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

  //...return same tsx
};
```

---

```ts
const App = () => {
  const [multiSelected, setMultiSelected] = useState([]);

  return (
    <MultiSelect
      items={items}
      selected={multiSelected}
      onSelected={setMultiSelected}
    />
  );
};
```

---

### Common functionality.

##### Refactor?

---

```ts
type CombinedSelectProps = {
  items: string[];
  selected?: string;
  multiSelected?: string[];
  onSingleSelected?: (selected: string) => void;
  onMultiSelected?: (selected: string[]) => void;
};
```

---

```ts
export const CombinedSelect = (...) => {
  const _selected =
    selected && selected !== null
      ? [selected]
      : multiSelected
      ? multiSelected
      : [];
```

---

```ts
export const CombinedSelect = (...) => {
  // _selected

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

  // return same tsx
```

---

```ts
const App = () => {
  const [singleSelect, setSingleSelect] = useState("");

  return (
    <CombinedSelect
      items={items}
      selected={multiSelected}
      onSelected={setMultiSelected}
    />
  );
};
```

---

```ts
const App = () => {
  const [multiSelected, setMultiSelected] = useState([]);

  return (
    <CombinedSelect
      items={items}
      multiSelected={multiSelected}
      onMultiSelect={setMultiSelected}
    />
  );
};
```

---

Show not working. Little Jimmy intern

---

```ts
const App = () => {
  const [multiSelected, setMultiSelected] = useState([]);

  return (
    <CombinedSelect
      items={items}
      multiSelected={multiSelected}
      // listener is missing
    />
  );
};
```

---

### There's got to be a type safe way....

---

# Unions

---

```ts
type UnionSelectProps = {
  items: string[];
  selected: string | string[];
  onSelected: (selected: string[] | string) => void;
};
```

---

```ts
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

  // return same tsx
};
```

---

```ts
const App = () => {
  const [multiSelected, setMultiSelected] = useState([]);

  const handleUnionSelect = (item: string | string[]) => {
    if (Array.isArray(item)) {
      setMultiSelected(item);
    }
  };

  return (
    <UnionSelect
      items={items}
      selected={multiSelected}
      onSelected={handleUnionSelect}
    />
  );
};
```

---

### I don't want to have to write that type guard every time.

---

# Generics

---

> being able to create a component that can work over a variety of types rather than a single one.

---

```ts
type Bar<T> = { value: T };

type NumberBar = Bar<number> === { value: number }

type StringBar = Bar<string> === { value: string }

type FooBar = Bar<Foo> ===  { value: Bar }
```

---

# Tagged Unions

---

```ts
export enum SelectKind {
  SINGLE = "single",
  MULTI = "multi",
}

type SingleSelectProps<T> = {
  kind: SelectKind.SINGLE;
  items: T[];
  selected: T;
  onSelected: (selected: T) => void;
};

type MultiSelectProps<T> = {
  kind: SelectKind.MULTI;
  items: T[];
  selected: T[];
  onSelected: (selected: T[]) => void;
};

type GenericSelectProps<T> = SingleSelectProps<T> | MultiSelectProps<T>;

const GenericSelectProps = <T>(props: GenericSelectProps<T>) => {
  ///more to come
};
```

---

### How does typescript know what type props it's getting?

---

# Type Guards

---

```ts
const isMultiSelect = <T extends any>(
  props: GenericSelectProps<T>
): props is MultiSelectProps<T> => props.kind === SelectKind.MULTI;

const isSingleSelect = <T extends any>(
  props: GenericSelectProps<T>
): props is MultiSelectProps<T> => props.kind === SelectKind.SINGLE;
```

---

```ts
const buildFunctions = <T>(props: GenericSelectProps<T>) => {
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
```

---

```ts
export const GenericSelect = <T>(props: GenericSelectProps<T>) => {
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

```

---

```ts
const App = () => {
  const [singleSelect, setSingleSelect] = useState("");

  const [multiSelected, setMultiSelected] = useState([]);

  return (
    <>
      <GenericSelect<string>
        kind={SelectKind.SINGLE}
        items={items}
        selected={singleSelect}
        onSelected={setSingleSelect}
      />
      <GenericSelect
        kind={SelectKind.MULTI}
        items={items}
        selected={multiSelected}
        onSelected={setMultiSelected}
      />
    </>
  );
};
```

---

### But WAIT

---

SHOW NUMBER SELECT

---

```ts
const App = () => {
  const [singleSelect, setSingleSelect] = useState<number | null>(null);

  return (
    <GenericSelect<number | null>
      kind={SelectKind.SINGLE}
      items={[1, 2, 3]}
      selected={singleSelect}
      onSelected={setSingleSelect}
    />
  );
};
```

---

Questions?
