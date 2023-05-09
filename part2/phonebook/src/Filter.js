const Filter = (props) => {

    const handleSearch = (event) => {
        const query = event.target.value
        props.onSearch(query)

    }
    return (
        <div>
            filter shown with <input value = {props.filteredList} onChange={handleSearch} />
        </div>
    )
}

export default Filter