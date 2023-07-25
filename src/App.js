import { useState } from "react";

const App = () => {

  const [items, setItems] = useState([]);


  //* Handler functions

  const handleNewItem = (newItem) => {
    setItems((items) => [...items, newItem]);
  }

  const handleDelete = (id) => {
    setItems((items => items.filter((item) => item.id !== id)))
  }

  const handleToggle = (id) => {
    setItems((items) => items.map(item => item.id === id ? { ...item, packed: !item.packed } : item))
  }


  return (
    <div className="app">
      <Logo />
      <Form OnAddItems={handleNewItem} />
      <PackingList setItems={setItems} items={items} OnDeleteItems={handleDelete} OnToggleItem={handleToggle} />
      <Stats items={items} />
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
      <select onChange={(e) => setQuantity(+e.target.value)}>
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

const PackingList = ({ items, OnDeleteItems, OnToggleItem }) => {

  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item OnDeleteItems={OnDeleteItems} item={item} key={item.id} OnToggleItem={OnToggleItem} />
        ))}
      </ul>
    </div>
  );
};

const Item = ({ item, OnDeleteItems, OnToggleItem }) => {

  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => { OnToggleItem(item.id) }} />
      <span
        style={item.packed === true ? { textDecoration: "line-through" } : {}}
      >
        {item.quantity}x {item.description}
      </span>
      <button onClick={() => OnDeleteItems(item.id)} className="deleteItem">&times;</button>
    </li>
  );
};

const Stats = ({ items }) => {
  if (!items.length) return <em> <footer className="stats">Start adding some items to your packing list</footer></em>
  const numberOfItems = items.length;
  const numberOfPacked = items.filter(item => item.packed).length
  const percentage = Math.round((numberOfPacked / numberOfItems) * 100)
  return (
    <em> <footer className="stats">
      {percentage === 100 ? "You got everything! Ready to go" : `You have ${numberOfItems} items on your list, and you already packed ${numberOfPacked} (${percentage || 0}%)`}
    </footer></em>
  );
};

export default App;
