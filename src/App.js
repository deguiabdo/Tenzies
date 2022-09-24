import React from "react";
import Confetti from 'react-confetti'
import Die from "./componenets/Die";
export default function App() {
  const [die, setDie] = React.useState(allNewDies());
  const [tenzies, setTenzies] = React.useState(false);
  function allNewDies() {
    const array = [];
    for (let i = 0; i < 10; i++) {
      array.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id:i
      });
    }
    return array;
  }
  function roll(){
    if (tenzies) {
      newGame();
    } else {
      setDie((prevDie) =>
        prevDie.map((die) => {
          return die.isHeld
            ? die
            : { ...die, value: Math.ceil(Math.random() * 6) };
        })
      );
    }

  }
const dieElemens = die.map((die, index) => (
  <Die
    key={index}
    
    holdDie={() => holdDie(die.id)}
    value={die.value}
    isHeld={die.isHeld}
  />
));
function holdDie(id){
  setDie(
    prevDie=>prevDie.map(
      function(die){
    return { ...die, isHeld: die.id === id ? !die.isHeld : die.isHeld };
  }))
}
function newGame(){
setDie(allNewDies());
 setTenzies(false)
}
  React.useEffect( () =>{
     const allHeld= die.every(die=>die.isHeld)
     const firstDie = die[0].value 
     const allSame = die.every((die) => die.value === firstDie);
      if(allHeld&&allSame){
        setTenzies(true)
        console.log(" you won");
      }
    },
    [die]
  );
  return (
    <main>
      {tenzies && <Confetti />}

      <div className=' w-screen h-screen bg-slate-800 p-10'>
        <div className=' bg-white w-full h-full rounded-2xl flex flex-col   justify-around items-center'>
          <h1 className='font-bold text-slate-800 text-4xl '>Tenzies</h1>
          <p className=' text-slate-600 font-bold text-center '>
            Roll untill all dice are the same. Click each die to freeze it at
            its current value between rolls
          </p>

          <h1 className='font-bold text-slate-800 text-4xl '>00:00:00</h1>
          <div className=' grid grid-cols-5 grid-rows-2 gap-6  '>
            {dieElemens}
          </div>
          <button
            onClick={roll}
            className=' bg-blue-600 text-white rounded-lg text-lg font-bold py-1 px-4 w-auto'
          >
            {tenzies ? "New Game" : "Roll"}
          </button>
        </div>
      </div>
    </main>
  );
}

