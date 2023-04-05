import { useState } from 'react';
import styles from '@/styles/pages/Login.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';
import axios from 'axios';

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  function loginUser(event: React.FormEvent) {
    event.preventDefault();
    console.log('logging in', email, password);


    axios.post('/api/MongoAPI/user/loginUser', {
      email: email,
      password: password
    })
      .then((res) => {
        // Sets session token and redirects to reader
        setCookie('token', res.data.token);
        setCookie('logged-in', true);
        router.push('/reader');
      })
  };



  function updateInput(event: React.ChangeEvent) {
   
    const { name, value } = event.currentTarget as HTMLInputElement;

    switch (name) {
      case 'email':
        setEmail(value);
        break;

      case 'password':
        setPassword(value);
        break;

      default:
        break;
    }

  }

  return (
    <div className='page-container'>
      <h1 className='page-header'>Login</h1>
      <div className={styles.login}>
        <form onSubmit={loginUser}>
          <label>
            EMAIL
            <input
              id='email'
              type='text'
              placeholder='email'
              name='email'
              value={email}
              onChange={updateInput}
            />
          </label>
          <label>
            PASSWORD
            <input
              id='password'
              type='password'
              placeholder='password'
              name='password'
              value={password}
              onChange={updateInput}
            />
          </label>
          <button type='submit'>LOGIN</button>
          <Link href='/'>Create Account</Link>
          <Link href='/'>Forgot Username/Password?</Link>
        </form>
      </div>
    </div >
  );
};
