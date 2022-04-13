import React from 'react'

export default function GameCard(props) {

    return (
        <main className='gamecard-main'>
            <div className='gamecard-question'>
                <h1>{props.Q}</h1>
            </div>
        </main>
    )
}