import React from 'react'

export default function Scoreboard(props) {
    const Default = [
        {
            id: "",
            name: "XXX",
            score: 0
        },
        {
            id: "",
            name: "XXX",
            score: 0
        },
        {
            id: "",
            name: "XXX",
            score: 0
        }
    ]

    const [rank, setRank] = React.useState(
        JSON.parse(localStorage.getItem("Ranking")) || Default)

    React.useEffect(() => {
        sortScores()
    }, [])

    function sortScores() {
        let scores = rank
        let formatNewScore = {id: "", name:props.player.name, score:props.player.score} 
        scores.push(formatNewScore)
        scores.sort((b, a) => {
            return a.score - b.score
        })
        setRank(scores.slice(0,3))
        localStorage.setItem("Ranking", JSON.stringify(rank))
    }

    function Replay() {
        props.setDisplay({ start: true, game: false, score: false })
        props.setCount(0)
    }

    function Clear() {
        localStorage.setItem("Ranking", JSON.stringify(Default))
        setRank(Default)
    }

    return (
        <main className='Scoreboard-main'>
            <h1 className='Scoreboard-header'>Scoreboard</h1>
            <div className='Scoreboard-grid'>
                <div className='Scoreboard-grid-title'>Player:</div>
                <div className='Scoreboard-grid-title'>Score:</div>
                <div>
                    <p>{rank[0].name}</p>
                    <p>{rank[1].name}</p>
                    <p>{rank[2].name}</p>
                </div>
                <div>
                    <p>{rank[0].score}/10</p>
                    <p>{rank[1].score}/10</p>
                    <p>{rank[2].score}/10</p>
                </div>
            </div>
            <div className='Scoreboard-btns'>
                <button className='Scoreboard-replay' onClick={Replay}>Replay</button>
                <button className='Scoreboard-delete' onClick={Clear}>Clear Scoreboard</button>
            </div>
        </main>

    )

}
