import '../styles/login.css';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      console.log(result);
      if (res.ok) {
        await login(result.token, result.user.id);
        navigate('/dashboard');
        console.log("Logged in:", result);
      } else {
        console.error("Login failed:", result.error);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  return (
    <main id="login">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required /><br />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
