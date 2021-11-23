import React, {useState} from 'react';
import styles from './auth.module.css';
import Axios from "axios";

const Auth = (props) => {
    const [username, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(false);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "username") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        let data;
        try {
            // 로그인? 회원가입?
            if (newAccount) {
                // 회원가입
                data = await Axios.post('http://localhost:8080/auth/signup',{
                    'username':username,
                    'password':password,
                })
                alert(`${username}님, 가입되었습니다.`)
            } else {
                // 로그인
                data = await Axios.post('http://localhost:8080/auth/login', {
                    'username':username,
                    'password':password
                })
                console.log(data)
            }
        } catch (error) {
            setError(error.response.data.message)
        }
    };
    const toggleAccount = () => {
        setNewAccount((prev) => !prev);
    };
    return (
        <div className={styles.container}>
            <div className={styles.authContainer}>
                <div className={styles.formContainer}>
                    <form className={styles.form} onSubmit={onSubmit}>
                        <input
                            className={styles.input}
                            name="username"
                            type="text"
                            placeholder="이름"
                            required
                            value={username}
                            onChange={onChange}
                        />
                        <input
                            className={styles.input}
                            name="password"
                            type="password"
                            placeholder="비밀번호"
                            required
                            value={password}
                            onChange={onChange}
                        />
                        <input
                            className={styles.submitBtn}
                            type="submit"
                            value={newAccount ? "계정 생성" : "로그인"}
                        />
                        {error && (
                            <div className={styles.error}>
                                <span>{error}</span>
                            </div>
                        )}
                    </form>
                    <span onClick={toggleAccount} className={styles.switch}>
                        {!newAccount ? (
                            <span className={styles.active}>로그인</span>
                        ) : (
                            <span>로그인</span>
                        )}
                        {!newAccount ? (
                            <span>계정 생성</span>
                        ) : (
                            <span className={styles.active}>계정 생성</span>
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Auth;