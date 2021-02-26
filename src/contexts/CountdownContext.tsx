import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ChallengesContext } from './ChallengesContext';

interface CountdownContextData{
    minutes: number;
    seconds:number;
    hasFinished: boolean;
    isActive: boolean;
    startCountDown: ()=> void;
    resetCountDown: ()=> void;
}

interface CountdownProviderProps{
    children: ReactNode;
}

let countDownTimeOut: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({children}: CountdownProviderProps){

    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(25 * 60)
    const [isActive, setIsActive]=useState(false);
    const [hasFinished, setHasFinished]=useState(false);

    const minutes = Math.floor(time/60); 
    const seconds = time%60;

    function startCountDown(){
        setIsActive(true);
    }

    function resetCountDown(){
        clearTimeout(countDownTimeOut);
        setIsActive(false);
        setTime(25*60);   
        setHasFinished(false);
    }

    useEffect(()=>{
        if(isActive && time>0){
            countDownTimeOut = setTimeout(() => {
                setTime(time-1)
            }, 0.01);
        } else if(isActive && time === 0){
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    },[isActive, time]);
    
    return(
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountDown,
            resetCountDown
        }}>
            {children}
        </CountdownContext.Provider>
    )
}