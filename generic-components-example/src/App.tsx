import React from "react";
import "./App.css";
import { SingleSelect } from "./SingleSelect";
import { MultiSelect } from "./MultiSelect";
import { items, numberItems } from "./items";
import { UnionSelect } from "./UnionSelect";
import { CombinedSelect } from "./CombinedSelect";
import { GenericSelect, SelectKind } from "./GenericSelect";

const App = () => {
  const [singleSelected, setSingleSelected] = React.useState<string | null>(
    null
  );

  const [multiSelected, setMultiSelected] = React.useState<string[]>([]);

  const [singleCombinedSelected, setSingleCombinedSelected] = React.useState<
    string | null
  >(null);

  const [multiCombinedSelected, setMultiCombinedSelected] = React.useState<
    string[]
  >([]);

  const [singleUnionSelected, setSingleUnionSelected] = React.useState<
    string | null
  >(null);

  const [multiUnionSelected, setMultiUnionSelected] = React.useState<string[]>(
    []
  );

  const handleUnionSelect = (item: string | string[]) =>
    Array.isArray(item)
      ? setMultiUnionSelected(item)
      : setSingleUnionSelected(item);

  const [singleGenericSelected, setSingleGenericSelected] = React.useState<
    string | null
  >(null);

  const [multiGenericSelected, setMultiGenericSelected] = React.useState<
    string[]
  >([]);

  const [
    multiGenericNumberSelected,
    setMultiGenericNumberSelected,
  ] = React.useState<number[]>([]);

  return (
    <div className="App">
      <header className="App-header">
        <h6>Basic Single Select</h6>
        <SingleSelect
          items={items}
          selected={singleSelected}
          onSelected={setSingleSelected}
        />
        <h6>Basic Multi Select</h6>
        <MultiSelect
          items={items}
          selected={multiSelected}
          onSelected={setMultiSelected}
        />
        <h6>Combined Single Select</h6>
        <CombinedSelect
          items={items}
          selected={singleCombinedSelected}
          onSingleSelected={setSingleCombinedSelected}
        />
        <h6>Combined Multi Select</h6>
        <CombinedSelect
          items={items}
          multiSelected={multiCombinedSelected}
          onMultiSelected={setMultiCombinedSelected}
        />
        <h6>Combined Select Prop Mismatch Error</h6>
        <CombinedSelect
          items={items}
          selected={singleCombinedSelected}
          onMultiSelected={setMultiCombinedSelected}
        />
        <h6>Union Single Select</h6>
        <UnionSelect
          items={items}
          selected={singleUnionSelected}
          onSelected={handleUnionSelect}
        />
        <h6>Union Multi Select</h6>
        <UnionSelect
          items={items}
          selected={multiUnionSelected}
          onSelected={handleUnionSelect}
        />
        <h6>Generic Single Select</h6>
        <GenericSelect<string>
          kind={SelectKind.SINGLE}
          items={items}
          selected={singleGenericSelected}
          onSelected={setSingleGenericSelected}
        />
        <h6>Generic Multi Select</h6>
        <GenericSelect
          kind={SelectKind.MULTI}
          items={items}
          selected={multiGenericSelected}
          onSelected={setMultiGenericSelected}
        />
        <h6>Generic Number Multi Select</h6>
        <GenericSelect
          kind={SelectKind.MULTI}
          items={numberItems}
          selected={multiGenericNumberSelected}
          onSelected={setMultiGenericNumberSelected}
        />
      </header>
    </div>
  );
};

export default App;
