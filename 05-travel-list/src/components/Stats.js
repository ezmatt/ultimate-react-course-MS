export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );
  const checkedItemCount = items.filter((item) => item.packed).length;
  const checkedItemCountPercentage = Math.round(
    (checkedItemCount / items.length) * 100
  );
  return (
    <footer className="stats">
      <em>
        {checkedItemCountPercentage === 100
          ? "You got everything! Ready to go ✈"
          : `🛍 You have ${items.length} items on your list, and you already packed ${checkedItemCount} (${checkedItemCountPercentage}%)`}
      </em>
    </footer>
  );
}
