
import { useEffect, useState, useContext } from 'react'
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/CountDown.module.css'



export function CountDown(){

    const { minutes, seconds, hasFinished, isActive, 
        resetCountDown, startCountDown 
    } = useContext(CountdownContext);
    
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    
    
    return(

        <div>
            <div className={styles.countContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            { hasFinished ? (
                <button 
                disabled
                type='button'
                className={styles.CountDownButton}
                >
                    Ciclo encerrado
                </button>
            ) : (
                <>
                    { isActive ? (
                        <button type='button'
                        className={`${styles.CountDownButton} ${styles.CountDownButtonActive}`}
                        onClick={resetCountDown}>
                            Abandonar um ciclo
                        </button>
                    ) : (
                        <button type='button'
                                className={styles.CountDownButton}
                                onClick={startCountDown}>
                                    Iniciar um ciclo
                        </button>
                    )}
                </>)

            }
            
        </div>
    )
}