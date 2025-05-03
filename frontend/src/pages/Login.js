import '../styles/login.css';

export default function Login() {
    return (
        <main>
            <form>
                <h1>Login</h1>
                <label for="email"> Email: </label>
                <input type="text" id="email" name="email"></input>
                <label for="password"> Password: </label>
                <input type="text" id="password" name="password"></input><br></br>
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}