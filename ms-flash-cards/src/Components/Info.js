export function Info({ stats, isCorrect, isWrong }) {
  return (
    <>
      {stats.map((stat) => (
        <div className="stat">
          <p>
            {stat.display}: {stat.value}
          </p>
        </div>
      ))}
    </>
  );
}
