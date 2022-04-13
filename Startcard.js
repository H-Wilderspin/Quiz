import React from 'react';
import {nanoid} from 'nanoid';

export default function StartCard(props) {
    const [formData, setFormData] = React.useState({ name: "", topic: 0 })
    const topics = { mythology: 20, art: 25, generalknowledge: 0 }

    function decodeString(html) {
        const txt = document.createElement('textarea')
        txt.innerHTML = html
        return txt.value
      }    

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    React.useEffect(() =>{
        fetch(`https://opentdb.com/api.php?amount=12&category=${formData.topic}&type=multiple`)
        .then(res => res.json())
        .then(data => {
            props.setQuestions(data)
            props.setQ(decodeString(data.results[0].question))
            props.setAnswers([
                decodeString(data.results[0].incorrect_answers[0]),
                decodeString(data.results[0].incorrect_answers[1]),
                decodeString(data.results[0].incorrect_answers[2])   
            ])})
    }, [formData.topic])

    function splice() {
        let As = props.answers
        let n = Math.floor(Math.random() *4)
        let CA = props.questions.results[0].correct_answer
        As.splice(n, 0, CA)
      }

    function handleSubmit(event) {
        event.preventDefault()
        splice()
        props.setCount(prev => prev + 1) 
        props.setPlayer({ name: formData.name, id: nanoid(), score: 0 })
        props.setDisplay({ start: false, game: true, score: false })
        let x = props.objectify(props.answers)
        props.setBtns(x)
    }

    return (
        <main className='startcard-main'>
            <h1 className='startcard-header'>Trivia</h1>
            <h2 className='startcard-msg'>Brain training for the Pub Quiz!</h2>
            <form className='startcard-form' onSubmit={handleSubmit}>
                <input
                    className='startcard-input'
                    type="text"
                    placeholder="Player Name"
                    onChange={handleChange}
                    name="name"
                    value={formData.name}
                />

                <input
                    id="Mythology"
                    className='startcard-topic'
                    type="radio"
                    onChange={handleChange}
                    name="topic"
                    value={topics.mythology}>
                </input>
                <label htmlFor='Mythology'>Mythology</label>

                <input
                    id="art"
                    className='startcard-topic'
                    type="radio"
                    onChange={handleChange}
                    name="topic"
                    value={topics.art}>
                </input>
                <label htmlFor='art'>Art</label>

                <input
                    id="generalKnowledge"
                    className='startcard-topic'
                    type="radio"
                    onChange={handleChange}
                    name="topic"
                    value={topics.generalknowledge}>
                </input>
                <label htmlFor='generalKnowledge'>General Knowledge</label>

                <button className='startcard-btn'>GO!</button>

            </form>

        </main>
    )
}