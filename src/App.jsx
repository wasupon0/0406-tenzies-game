import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import Die from "../components/Die";
import "./App.css";

function App() {
  const [diceArray, setDiceArray] = useState(getNewDice());
  const [isWin, setWin] = useState(false);

  useEffect(() => {
    const allHeld = diceArray.every((die) => die.isHeld);
    const allSame = diceArray.every((die) => die.value === diceArray[0].value);

    console.log(diceArray[0].value);

    if (allHeld && allSame) {
      console.log("You win!");
      setWin(true);
    }
  }, [diceArray]);

  function getNewDice() {
    const newDiceArray = [];
    for (let i = 0; i < 10; i++) {
      const dieObject = createDieObject();
      newDiceArray.push(dieObject);
    }
    return newDiceArray;
  }

  function createDieObject() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    };
  }

  function newGame() {
    setDiceArray(getNewDice());
    setWin(false);
  }

  function rollDice() {
    isWin
      ? newGame()
      : setDiceArray((prevDiceArray) =>
          prevDiceArray.map((die) => (die.isHeld ? die : createDieObject()))
        );
  }

  function holdDice(id) {
    setDiceArray((prev) =>
      prev.map((die) => (die.id === id ? { ...die, isHeld: !die.isHeld } : die))
    );
  }

  const diceElement = diceArray.map((die, index) => (
    <Die
      key={die.id}
      id={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {isWin && <Confetti />}
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElement}</div>
      <button onClick={rollDice}>{isWin ? "New game" : "Roll"}</button>
    </main>
  );
}

export default App;
