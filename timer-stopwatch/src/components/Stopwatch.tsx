import * as React from 'react'

const Stopwatch = () => {

    interface Time{
        hour: number,
        minute: number,
        second: number,
        milliSecond: number,
        isRunning: boolean
    }

    const [elapsedTime, setElapsedTime] = React.useState<Time>({
        hour: 0,
        minute: 0,
        second: 0,
        milliSecond: 0,
        isRunning: false
    })

    
    function handleElapsedTime(){
        setElapsedTime(prev => ({...prev, isRunning: true}))
    }

   
    React.useEffect(() => {
        if (!elapsedTime.isRunning) return;

        const id = setInterval(() => {
            setElapsedTime(prev => {
                let ms = prev.milliSecond + 10
                let s = prev.second
                let m = prev.minute
                let h = prev.hour

                if (ms >= 1000) {
                    ms -= 1000
                    s += 1
                }

                if (s >= 60) {
                    s -= 60
                    m += 1
                }

                if (m >= 60) {
                    m -= 60
                    h += 1
                }

                return {
                    ...prev,
                    hour: h,
                    minute: m,
                    second: s,
                    milliSecond: ms,
                }
            })
        }, 10)

        return () => clearInterval(id)
    }, [elapsedTime.isRunning])

    function handlePause(){
        setElapsedTime({...elapsedTime, isRunning: false})
    }

    function handleReset(){
        setElapsedTime({
            hour: 0,
            minute: 0,
            second: 0,
            milliSecond: 0,
            isRunning: false
        })
    }

    function displayElapsedTime(){
        const pad = (value: number, length = 2) => String(value).padStart(length, '0')

        const { hour, minute, second, milliSecond } = elapsedTime

        const ms = pad(milliSecond, 2)

        // When hours exist, show HH:MM:SS:MS
        if (hour > 0) {
            return `${pad(hour)}:${pad(minute)}:${pad(second)}:${ms}`
        }

        // When minutes exist (but hours don't), show MM:SS:MS
        if (minute > 0) {
            return `${pad(minute)}:${pad(second)}:${ms}`
        }

        // Default: show SS:MS
        return `${pad(second)}:${ms}`
    }

  return (
        <div className="time-panel stopwatch-panel">
                <div className="time-display">
                    <h2 className="time-value">{displayElapsedTime()}</h2>
                </div>

                <div className="time-controls">
                    {
                            elapsedTime.isRunning 
                                    ? 
                                            <>
                                                <button className="control-button control-button-primary" onClick={handlePause}>Pause</button>
                                                <button className="control-button control-button-ghost" onClick={handleReset}>Reset</button>
                                            </>
                                    : 
                                            <>
                                                <button className="control-button control-button-primary" onClick={handleElapsedTime}>Start</button>
                                                <button className="control-button control-button-ghost" onClick={handleReset}>Reset</button>
                                            </>
                    }
                </div>
    </div>
  )
}

export default Stopwatch