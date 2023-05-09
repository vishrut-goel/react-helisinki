const Persons = (props) => {

    const onDeleteClick = (name,id) => {
        props.onDeleteClick(name, id)
    }

    return (
        <>
            {
                props.persons.map((person) => (
                    <div style={{display: 'flex', alignItems: 'center'}} key={person.id}>
                        <p key={person.id}>{person.name} {person.number}</p>
                        <button style={{ width: '50px', height: '20px' }} onClick={() => onDeleteClick(person.name, person.id)}>delete</button>
                    </div>

                ))
            }
        </>
    )
}

export default Persons