import React, { useState, useContext, createContext } from 'react'
import "./GamePlay.css"
import { GamePlayContext } from '../../pages/Home/Home'
import Waiting from '../Waiting/Waiting'
export const RoomIdContext = createContext()
function GamePlay({ question }) {
    const { unAnswered, answerQuestion, me } = useContext(GamePlayContext)
    return (
        <>
            {unAnswered?.includes(me) && <div className='gamePlayBody'>
                {question && <> <div className="questionText">
                    {question?.questionText}
                </div>
                    <span>{unAnswered.length}</span>
                    <div className="options">
                        {question?.answerOptions.map(option => {
                            return (
                                <div className='optionCard' onClick={() => answerQuestion(option.isCorrect)}>
                                    {option.answerText}
                                </div>
                            )
                        })}
                    </div>
                </>}
            </div>}
            {!unAnswered?.includes(me) &&
                <RoomIdContext.Provider value={question?.roomId}>

                    <Waiting unAnswered={unAnswered} />
                </RoomIdContext.Provider>
            }
        </>
    )
}

export default GamePlay