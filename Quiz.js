import React from 'react'
import "./main.css"
import GameCard from "./GameCard.js"
import StartCard from "./Startcard.js"
import Answers from "./Answers.js"
import Scoreboard from "./Scoreboard.js"
import DummyData from "./DummyData.js"
import Footer from '../ReusableComponents/Footer'
import { nanoid } from 'nanoid'
import logo from './logo.svg'
import { Link } from 'react-router-dom'

export default function Quiz() {
  const [display, setDisplay] = React.useState({ start: true, game: false, score: false })
  const [player, setPlayer] = React.useState({ name: "Anon-y-mouse", id: 0, score: 0 })
  const [count, setCount] = React.useState(0)
  const [questions, setQuestions] = React.useState(DummyData)
  const [currentQ, setCurrentQ] = React.useState("")
  const [answers, setAnswers] = React.useState([0])
  const [btns, setBtns] = React.useState([0])
  const [isDisabled, setisDisabled] = React.useState(false)

  function decodeString(html) {
    const txt = document.createElement('textarea')
    txt.innerHTML = html
    return txt.value
  }

  function spliceCorrectAnswer(x) {
    let As = x
    let n = Math.floor(Math.random() * 4)
    let CA = questions.results[count].correct_answer
    As.splice(n, 0, CA)
    return As
  }

  function objectify(x) {
    const array = []
    for (let i = 0; i < 4; i++)
      array.push({
        id: nanoid(),
        value: decodeString(x[i]),
        isTrue: false,
        isHeld: false,
      })
    return array
  }

  React.useEffect(() => {
    localStorage.setItem("Current Player", JSON.stringify(player))
  }, [player])

  function handleClickNext() {
    setCurrentQ(decodeString(questions.results[count].question))
    const As = spliceCorrectAnswer(questions.results[count].incorrect_answers)
    const x = objectify(As)
    setAnswers(x)
    setBtns(x)
    setTimeout(updateCount, 100)
    setisDisabled(false)
  }

  function updateCount() {
    setCount(prev => prev + 1)
    if (count === 10) {
      setDisplay({ start: false, game: false, score: true })
    }
  }

  function holdBtn(id) {
    setBtns(prev => prev.map((btn) => {
      return btn.id === id ? { ...btn, isHeld: !btn.isHeld } : btn
    }))
  }

  function checkAll(x) {
    for (let y of x) {
      if (y.value === questions.results[count - 1].correct_answer) {
        setBtns(prev => prev.map((btn) => {
          return btn.id === y.id ? { ...btn, isTrue: !btn.isTrue } : btn
        }))
      }
    }
  }

  function handleClickAnswer(value) {
    checkAll(btns)
    if (value === questions.results[count - 1].correct_answer) {
      setPlayer(prev => ({
        ...prev,
        score: prev.score + 1
      }))
      localStorage.setItem("player", JSON.stringify(player))
    }
    setisDisabled(true)
  }

  const answersElements = btns.map(btn =>
    <Answers
      key={btn.id}
      value={btn.value}
      isHeld={btn.isHeld}
      isTrue={btn.isTrue}
      isDisabled={isDisabled}
      holdBtn={() => {
        holdBtn(btn.id)
        handleClickAnswer(btn.value)
      }}

    />
  )

  return (
    <div className="Quiz">
      <header className="Quiz-header">
        <Link className="Quiz-home-btn" to="/portfolio">Back to Portfolio</Link>
        <img src={logo} className="Quiz-logo" alt="logo" />
      </header>
      <main className="Quiz-main">
        {display.start &&
          <StartCard
            questions={questions}
            answers={answers}

            setPlayer={setPlayer}
            setDisplay={setDisplay}
            setQuestions={setQuestions}
            setQ={setCurrentQ}
            setAnswers={setAnswers}
            setCount={setCount}
            objectify={objectify}
            setBtns={setBtns}
          />}

        {display.game &&
          <GameCard
            count={count}
            questions={questions}
            display={display}
            Q={currentQ}

            setDisplay={setDisplay}
          />}

        {display.game &&
          <div className='Quiz-answers-container'>
            <div className='Quiz-answers'>
              {answersElements}</div>
            <div>
              <div className='Quiz-nxt-btn-container'>
                <button className='Quiz-next-btn' onClick={handleClickNext} > Next </button>
              </div>
            </div>
          </div>}

        {display.score &&
          <Scoreboard
            player={player}

            setDisplay={setDisplay}
            setCount={setCount}
          />
        }
      </main>

      <Footer
        thisAppName="Quiz">
        <p>Quiz App by Hazel Wilderspin <br></br>Using techniques taught by Bob Ziroll - Scrimba</p>
      </Footer>
    </div>
  );
}
