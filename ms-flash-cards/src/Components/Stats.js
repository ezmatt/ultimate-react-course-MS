export function Stats({ jump, badge, children }) {
  return (
    <>
      <div className={jump ? "info jump" : "info"}>
        {children}: {badge}
      </div>
    </>
  );
}
