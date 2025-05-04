import { useEffect, useState } from "react";

export default function Timer() {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    useEffect(() => {
        // Fetch all subjects
        const fetchSubjects = async () => {
            try {
                const user_id = localStorage.getItem("id");
                const res = await fetch(`http://localhost:3000/api/subjects/?user_id=${user_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const result = await res.json();
                if (res.ok) {
                    setSubjects(result);
                }
            } catch (err) {
                console.log("Fetch error:", err);
            }
        };

        fetchSubjects();
    }, []);

    const handleChange = (e) => {
        setSelectedSubject(e.target.value);
    };



    return (
        <div>
            <h1> Timer </h1>
            <h2>Pick a subject</h2>
            <select id="subject-select" value={selectedSubject} onChange={handleChange}>
                <option value="">--Please choose an option--</option>
                {subjects.map((subject, index) => (
                    <option key={index} value={subject}>
                        {subject.subject_name}
                    </option>
                ))}
            </select>
            {selectedSubject && <p> You selected: {selectedSubject} </p>}
            
            
            
        </div>
    );
}