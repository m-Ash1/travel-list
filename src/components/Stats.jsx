const Stats = ({ items }) => {
    if (!items.length)
        return (
            <em>
                {" "}
                <footer className="stats">
                    Start adding some items to your packing list
                </footer>
            </em>
        );
    const numberOfItems = items.length;
    const numberOfPacked = items.filter((item) => item.packed).length;
    const percentage = Math.round((numberOfPacked / numberOfItems) * 100);
    return (
        <em>
            {" "}
            <footer className="stats">
                {percentage === 100
                    ? "You got everything! Ready to go"
                    : `You have ${numberOfItems} items on your list, and you already packed ${numberOfPacked} (${percentage || 0
                    }%)`}
            </footer>
        </em>
    );
};

export default Stats;