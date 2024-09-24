import { useEffect, useState, useRef } from "react";

export default function Timer() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const timer = useRef();

  useEffect(() => {
    if (running) {
      timer.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer.current);
    }
    return () => clearInterval(timer.current);
  }, [running]);

  const handleLap = () => {
    setLaps([...laps, time]);
  };

  const format = (time) => {
    let hours = Math.floor((time / 60 / 60) % 24);
    let minutes = Math.floor((time / 60) % 60);
    let seconds = Math.floor(time % 60);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  };

  return (
    <div className="stopwatch">
      <p className="timer">{format(time)}</p>
      <div className="actions">
        <button onClick={() => setRunning(!running)}>
          {running ? "Stop" : "Start"}
        </button>

        <button
          onClick={() => {
            setTime(0);
            setLaps([]);
            setRunning(false);
          }}
        >
          Reset
        </button>

        <button onClick={handleLap} disabled={!running}>
          Lap
        </button>
      </div>

      <div className="laps">
        <h3>Laps</h3>
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>
              Lap {index + 1}: {format(lap)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
