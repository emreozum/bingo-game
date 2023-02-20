import React from 'react';
export default function Card(props) {
    const styles = {
        backgroundColor: props.isHeld ? 'orange' : 'white'
    }
    return (
        <div className='card' onClick={props.holdCard} style={styles} >
        {props.value}
        </div>
    )
    }