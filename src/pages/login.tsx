import { useState } from "react"

export default function loginPage() {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div>
            <form>
                <div>
                    <label>username: </label>
                    <input type='text' value={userName} onChange={(e) => setUserName(e.target.value)}></input>
                </div>
                <div>
                    <label>password: </label>
                    <input type='text' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <button type='submit'> Login </button>
            </form>
            {userName}
            {password}
        </div>
    )
}