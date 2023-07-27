import { useState } from "react";
import Item from "./Item";
const PackingList = ({ items, onClearItems, OnDeleteItems, OnToggleItem }) => {
    const [sortBy, setSortBy] = useState("input");

    // Default Value
    let sortedItems

    if (sortBy === "input") sortedItems = items
    else if (sortBy === "description") sortedItems = [...items].sort((a, b) => a.description.localeCompare(b.description))
    else if (sortBy === "packed") sortedItems = [...items].sort((a, b) => a.packed - b.packed)


    return (
        <div className="list">
            <ul>
                {sortedItems.map((item) => (
                    <Item
                        OnDeleteItems={OnDeleteItems}
                        item={item}
                        key={item.id}
                        OnToggleItem={OnToggleItem}
                    />
                ))}
            </ul>

            <div className="actions">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="input">Sort by input order</option>
                    <option value="description">Sort by description</option>
                    <option value="packed">Sort by packed status</option>
                </select>
                <button onClick={onClearItems}>Clear list</button>
            </div>
        </div>
    );
};
export default PackingList;