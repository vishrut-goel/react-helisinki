const Total = ({ parts }) => {
    const total = parts.reduce((prevVal, curVal) => prevVal + curVal.exercises, 0)
    return (
        <b>total of {total} exercises</b>
    )
}

export default Total