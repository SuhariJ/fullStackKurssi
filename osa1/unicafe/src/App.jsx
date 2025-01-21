import { useState } from 'react'

const Header = ({header}) => <h1>{header}</h1>

const Button = ({onClick, text}) => (
  <button onClick={onClick}> {text} </button>
)

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad

  if(all === 0) return <p>No feedback given</p>

  const average = (all === 0) ? 0 : (good-bad)/all
  const positive = (all === 0) ? 0 : (good/all) * 100

  return(    
  <>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
    <p>all {all}</p>
    <p>average {average}</p>
    <p>positive {positive} %</p>
  </> 
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGood = () => {
    setGood(good+1)
  }
  const handleNeutral = () => {
    setNeutral(neutral+1)
  }
  const handleBad = () => {
    setBad(bad+1)  
  }

  return (
    <div>
      <Header header="give feedback"/> 
      <Button onClick={handleGood} text="good"/>
      <Button onClick={handleNeutral} text="neutral"/>
      <Button onClick={handleBad} text="bad"/>
      <Header header="statistics"/> 
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App