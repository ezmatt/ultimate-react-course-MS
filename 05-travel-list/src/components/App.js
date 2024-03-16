import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
  const [items, setItems] = useState([]);

  // Item Structure
  //  item : {
  //    id: unique identifier
  //    description: Description
  //    quantity: quantity
  //    packed: Whether the item is checked or not
  //  }

  // Adding items to the list
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  // Delete items function
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  // Checked item event handler
  function handleCheckedItem(id) {
    //console.log(id);
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  // Clear all items
  function handleClearItems() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }

  // Main
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onItemChecked={handleCheckedItem}
        onClearItems={handleClearItems}
      />
      <Stats items={items} />
    </div>
  );
}
