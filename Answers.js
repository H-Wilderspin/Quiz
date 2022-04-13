import React from 'react'

export default function Answers(props) {

const styles = {
    backgroundColor: props.isHeld ? "darkBlue" : "#282c34",
    borderColor: props.isTrue ? "green" : "black"
}

    return(
       <div className='answers-main'>
           <button 
           className='answers-btn' 
           onClick={props.holdBtn}
           disabled={props.isDisabled}
           style={styles}
           >{props.value}</button>
        </div>
    )
}