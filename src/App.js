import { useState } from "react";

const App = () => {

  const [items, setItems] = useState([]);


  //* Handler functions

  const handleNewItem = (newItem) => {
    setItems((items) => [...items, newItem]);
  }

  const handleDelete = (id) => {
    setItems((items) => items.filter((item) => item.id !== id))
  }

  return (
    <div className="app">
      <Logo />
      <Form OnAddItems={handleNewItem} />
      <PackingList items={items} onDelete={handleDelete} />
      <Stats />
    </div>
  );
};

const Logo = () => {
  return <h1>Far Away 🌳</h1>;
};

const Form = ({ OnAddItems }) => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!description) return;

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Math.round(Math.random() * 10000),
    };

    OnAddItems(newItem);

    setDescription("");
    setQuantity(1);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>what do you need for your trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((number) => (
          <option key={number} value={number}>
            {number}
          </option>
        ))}
      </select>
      <input
        type="text"
        name=""
        id=""
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
};

const PackingList = ({ items, onDelete }) => {

  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item onDelete={onDelete} item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
};

const Item = ({ item, onDelete }) => {

  return (
    <li>
      <span
        style={item.packed === true ? { textDecoration: "line-through" } : {}}
      >
        {item.quantity}x {item.description}
      </span>
      <button onClick={() => onDelete(item.id)} className="deleteItem">&times;</button>
    </li>
  );
};

const Stats = () => {
  return (
    <footer className="stats">
      You have X items on your list, and you already packed Y (Z%)
    </footer>
  );
};

export default App;
