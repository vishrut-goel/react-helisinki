import Part from './Part.js'

const Content = ({ parts }) => {
    return (
        <div>
            {
                parts.map((part) => (
                    <Part key={part.id} part={part} />
                ))
            }
        </div>
    )
}

export default Content