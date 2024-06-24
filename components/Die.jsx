function Die({ id, value, isHeld, holdDice }) {
  const style = {
    backgroundColor: isHeld ? "#59e391" : "white",
  };

  return (
    <div className="die-face" style={style} onClick={holdDice}>
      {value}
    </div>
  );
}
export default Die;
