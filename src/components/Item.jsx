const Item = ({ item, OnDeleteItems, OnToggleItem }) => {
    return (
        <li>
            <input
                type="checkbox"
                value={item.packed}
                onChange={() => {
                    OnToggleItem(item.id);
                }}
            />
            <span
                style={item.packed === true ? { textDecoration: "line-through" } : {}}
            >
                {item.quantity}x {item.description}
            </span>
            <button onClick={() => OnDeleteItems(item.id)} className="deleteItem">
                &times;
            </button>
        </li>
    );
};
export default Item;