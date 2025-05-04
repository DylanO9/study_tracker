import "../styles/dashboard.css";
import Timer from "./Timer";

export default function Dashboard() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const user_id = localStorage.getItem('id');
        data.user_id = user_id;

    }

    // Fetch 

    return (
        <main id="dashboard">
            {/* Create a new subject */}
            <form onSubmit={handleSubmit}>
                <label htmlFor="subject_name">New Subject</label>
                <input type="text" id="subject_name" name="subject_name" />
                <button type="submit">Add</button>
            </form>
            <Timer/>
        </main>
    );
}