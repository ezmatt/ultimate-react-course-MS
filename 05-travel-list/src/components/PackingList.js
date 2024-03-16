import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDeleteItem,
  onItemChecked,
  onClearItems,
}) {
  const [sortType, setSortType] = useState("id");

  /// add Sort options
  const selectOptions = [
    { name: "sort by input order", type: "id" },
    { name: "sort by description", type: "description" },
    { name: "sort by packed status", type: "packed" },
  ];

  // Sort input event handler
  const sortedInput = items.slice().sort(dynamicSort(sortType));

  // Handles sorting of all types
  function dynamicSort(property) {
    return function (a, b) {
      return a[property] > b[property] ? 1 : a[property] < b[property] ? -1 : 0;
    };
  }

  return (
    <div className="list">
      <ul>
        {sortedInput.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onItemChecked={onItemChecked}
          />
        ))}
      </ul>
      <div className="actions">
        <select
          name="sort"
          id="sort"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          {selectOptions.map((sort, key) => (
            <option key={key} value={sort.type}>
              {sort.name}
            </option>
          ))}
        </select>
        <button onClick={onClearItems}>Clear list</button>
      </div>
    </div>
  );
}
