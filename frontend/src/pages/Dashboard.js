import "../styles/dashboard.css";
import Timer from "./Timer";

export default function Dashboard() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const user_id = localStorage.getItem('id');
        data.user_id = user_id;

        try {
            const res = await fetch('http://localhost:3000/api/subjects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            if (res.ok) {
                // give an alert that this was successful
                // Warning: Why do I have to use user? fix backend?
                alert(`Successfully added ${result.user.subject_name}`);
            } 
        } catch (err) {
            console.log("Fetch error:", err);
        }
    }


    return (
        <main id="dashboard">
            {/* Create a new subject */}
            <form id="subjects-form" onSubmit={handleSubmit}>
                <label htmlFor="subject_name">New Subject</label>
                <input type="text" id="subject_name" name="subject_name" />
                <button type="submit">Add</button>
            </form>
            <Timer/>
        </main>
    );
}