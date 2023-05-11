import { useState } from "react"
import styles from '../styles/login.module.css'
import { useRouter } from "next/router"


export default function loginPage() {

    const [userName, setUserName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loggedIn, setLoggedIn] = useState<boolean>(false)
    const router = useRouter()  //Router Hook

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        const data = {userName, password} ;
        console.log('Data Sending:', data);
      
        try {

            const response: Response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();
            console.log('Response from server:', responseData);

            if (responseData){
                setLoggedIn(true)
            }
            
        } catch (err) {
            console.log(err)
        }
    }
    
    if (loggedIn) {
        //Redirect to /profile
        router.push('/profile')
    }

    return (
        <div className={styles.main}>
            <form onSubmit={handleSubmit}>
                <div className={styles.input}>
                    <label>username: </label>
                    <input type='text' value={userName} onChange={(e) => setUserName(e.target.value)}></input>
                </div>
                <div className={styles.input}>
                    <label>password: </label>
                    <input type='text' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <button type='submit'> Login </button>
            </form>
            {userName}<br/>
            {password}
        </div>
    )
}