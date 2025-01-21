import { useState } from 'react'

const Header = ({header}) => <h1>{header}</h1>

const Button = ({onClick, text}) => (
  <button onClick={onClick}> {text} </button>
)

const Data = ({text, value}) => <p>{text} {value}</p>

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good+1)
  const handleNeutral = () => setNeutral(neutral+1)
  const handleBad = () => setBad(bad+1)

  return (
    <div>
      <Header header="give feedback"/> 
      <Button onClick={handleGood} text="good"/>
      <Button onClick={handleNeutral} text="neutral"/>
      <Button onClick={handleBad} text="bad"/>
      <Header header="statistics"/>
      <Data text="good" value={good}/>
      <Data text="neutral" value={neutral}/>
      <Data text="bad" value={bad}/>
    </div>
  )
}

export default App