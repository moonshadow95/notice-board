import React, {useState} from 'react';

const Auth = ({setUser, authService, setBanner, setIsAlert}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const onChange = (event) => {
        const {
            target: {name, value},
        } = event;
        if (name === "username") {
            setUsername(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };
    // 로그인
    const onLogin = async (event) => {
        event.preventDefault();
        try {
            await authService.login(username, password)
            authService.me()
                .then(result => setUser(result.data))
                .catch(console.error);
        } catch (error) {
            setIsAlert(true)
            setBanner(error.response.data.message)
        }
    };

    // 회원가입
    const onJoin = async () => {
        try {
            await authService.signup(username, password)
            setIsAlert(false)
            setBanner(`${username}님, 가입되었습니다.`)
            setUsername(username)
            setPassword("")
        } catch (error) {
            setIsAlert(true)
            setBanner(error.response.data.message)
        }
    }

    return (
        <>
            <header className='mt-16 mb-4 text-white py-4 mx-auto text-7xl bg-ictus round w-max'>
                <h1 className='px-10 text-center m-auto'>ictus</h1>
            </header>
            <div className='flex align-center justify-center'>
                <form className='flex-col-center gap-6 mt-10 text-xl'
                      method='POST' onSubmit={onLogin}>
                    <div className='relative m-auto'>
                        <input
                            className='h-14 round indent-4 bg-transparent'
                            name="username"
                            type="text"
                            required
                            value={username}
                            onChange={onChange}
                        />
                        <span className='input-name'>이름</span>
                    </div>
                    <div className='relative m-auto'>
                        <input
                            className='h-14 round indent-4'
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={onChange}
                        />
                        <span className='input-name'>비밀번호</span>
                    </div>
                    <div className='flex justify-between w-200'>
                        <input className='button-common button-animation' type="submit" value="로그인"/>
                        <span onClick={onJoin} className='button-common button-animation'>회원가입</span>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Auth;