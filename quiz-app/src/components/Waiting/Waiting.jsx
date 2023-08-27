import React from 'react'
import { DotLoader } from 'react-spinners'
import ScoreBoard from '../ScoreBoard/ScoreBoard'
function Waiting({ unAnswered }) {
    return (
        <>
            {unAnswered?.length === 0 ? (
                <ScoreBoard />
            ) : (
                <DotLoader size={300} color='white' />
            )}
        </>
    )
}

export default Waiting