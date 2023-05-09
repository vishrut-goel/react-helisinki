import Header from './Header.js'
import Content from './Content.js'
import Total from './Total.js'

const Course = ({ course }) => {
    return (
        <>
            <Header header={course.name} />
            <Content parts = {course.parts} />
            <Total parts = {course.parts}/>
        </>
    )
}

export default Course