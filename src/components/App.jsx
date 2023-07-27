import { useEffect, useState } from "react";
import Form from "./Form";
import Logo from "./Logo";
import PackingList from "./PackingList";
import Stats from "./Stats";

const App = () => {
  const retrievedData = JSON.parse(localStorage.getItem('items')) || []
  const [items, setItems] = useState(retrievedData);
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

  // add local storage to the app (for dodo)
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])


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
