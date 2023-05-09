import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [avg, setAvg] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setTotal(updatedGood + bad + neutral)
    setAvg((updatedGood - bad) / (updatedGood + bad + neutral))
    setPositive((updatedGood / (updatedGood + bad + neutral)) * 100)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(good + bad + updatedNeutral)
    setAvg((good - bad) / (good + bad + updatedNeutral))
    setPositive((good / (good + bad + updatedNeutral)) * 100)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(good + updatedBad + neutral)
    setAvg((good - updatedBad) / (good + updatedBad + neutral))
    setPositive((good / (good + updatedBad + neutral)) * 100)
  }

  return (
    <div>
      <Heading text="Give Feedback" />
      <Button handleClick={handleGoodClick} text="good"></Button>
      <Button handleClick={handleNeutralClick} text="neutral"></Button>
      <Button handleClick={handleBadClick} text="bad"></Button>
      <Heading text="Statistics" />
      {total === 0 ?
        <p>No stats to display</p>
        :
        <>
          <DisplayStats total={total} text="good" stat={good} />
          <DisplayStats total={total} text="neutral" stat={neutral} />
          <DisplayStats total={total} text="bad" stat={bad} />
          <DisplayStats total={total} text="total" stat={total} />
          <DisplayStats total={total} text="average" stat={avg} />
          <DisplayStats total={total} text="positive" stat={positive} />
        </>}
    </div>
  )
}

const Heading = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const DisplayStats = ({ text, stat }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>{text} &nbsp;</td>
          <td>{stat}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default App