import { useState } from "react";
import Form from "./Form";
import Logo from "./Logo";
import PackingList from "./PackingList";
import Stats from "./Stats";

const App = () => {
  const [items, setItems] = useState([]);

  //* Handler functions

  const handleNewItem = (newItem) => {
    setItems((items) => [...items, newItem]);
  };

  const handleDelete = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const handleToggle = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };
  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear the list?")) {
      setItems([]);
    }
  };

  return (
    <div className="app">
      <Logo />
      <Form OnAddItems={handleNewItem} />
      <PackingList
        items={items}
        OnDeleteItems={handleDelete}
        OnToggleItem={handleToggle}
        onClearItems={handleClear}
      />
      <Stats items={items} />
    </div>
  );
};

export default App;
