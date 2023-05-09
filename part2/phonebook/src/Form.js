const Form = (props) => {

    const handleChange = (event) => {
        const { name, value } = event.target
        props.onTextChange(name, value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.onFormSubmit(props.newPerson)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input name='name' value={props.newPerson.name} onChange={handleChange} />
            </div>
            <div>
                phone number: <input name='number' value={props.newPerson.number} onChange={handleChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Form