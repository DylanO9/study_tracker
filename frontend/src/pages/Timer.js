import { useEffect, useState } from "react";
import "../styles/timer.css";

export default function Timer() {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [start, setStart] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const user_id = localStorage.getItem("id");
                const res = await fetch(`http://localhost:3000/api/subjects/?user_id=${user_id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                const result = await res.json();
                if (res.ok) setSubjects(result);
            } catch (err) {
                console.log("Fetch error:", err);
            }
        };

        fetchSubjects();
    }, []);

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setElapsedTime(Date.now() - new Date(start));
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning, start]);

    const handleChange = (e) => {
        const subjectObj = subjects.find(sub => sub.subject_id === e.target.value);
        setSelectedSubject(subjectObj);
    };

    const handleStart = () => {
        setStart(new Date());
        setIsRunning(true);
    };

    const handleStop = async () => {
        const end = new Date();
        setIsRunning(false);

        const user_id = localStorage.getItem("id");

        const sessionData = {
            user_id,
            subject_id: selectedSubject.subject_id,
            start_time: formatTimestamp(start),
            end_time: formatTimestamp(end),
        };

        try {
            const res = await fetch("http://localhost:3000/api/sessions/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sessionData),
            });

            if (!res.ok) throw new Error("Failed to save session");

            alert("Session saved successfully!");
            setElapsedTime(0);
            setStart(null);
        } catch (error) {
            console.error("Error saving session:", error);
        }
    };

    const formatTimestamp = (dateObj) => {
        return dateObj.toISOString().slice(0, 19).replace("T", " ");
    };

    const formatTime = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const hrs = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        return `${hrs}h ${mins}m ${secs}s`;
    };

    return (
        <div id="timer">
            <h1>Timer</h1>
            <h2>Pick a subject</h2>
            <select onChange={handleChange} defaultValue="">
                <option value="">--Please choose an option--</option>
                {subjects.map((subject, index) => (
                    <option key={index} value={subject.subject_id}>
                        {subject.subject_name}
                    </option>
                ))}
            </select>

            {selectedSubject && (
                <div>
                    <p>Selected subject: {selectedSubject.subject_name}</p>
                    {!isRunning && <button onClick={handleStart}>Start</button>}
                    {isRunning && <button onClick={handleStop}>Stop</button>}
                    {start && <p>Elapsed Time: {formatTime(elapsedTime)}</p>}
                </div>
            )}
        </div>
    );
}
