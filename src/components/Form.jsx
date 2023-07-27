import { useState } from "react";

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
export default Form;  