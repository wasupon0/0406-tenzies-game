import { useState } from "react";
import Die from "../components/Die";
import "./App.css";

function App() {
  const [diceArray, setDiceArray] = useState(getDice());

  function getDice() {
    const numbers = [];
    for (let i = 0; i < 10; i++) {
      const numObject = {
        id: i,
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
      };
      numbers.push(numObject);
    }
    return numbers;
  }

  function newGame() {
    setDiceArray(getDice());
  }

  function holdDice(id) {
    setDiceArray((prev) =>
      prev.map((dice) =>
        dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
      )
    );
  }

  console.log(diceArray);

  const diceElement = diceArray.map((die, index) => (
    <Die
      key={die.id}
      id={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={holdDice}
    />
  ));

  return (
    <main>
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElement}</div>
      <button onClick={newGame}>Roll</button>
    </main>
  );
}

export default App;
