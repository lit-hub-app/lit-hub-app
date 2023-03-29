import { useState } from 'react';
import styles from '@/styles/pages/Login.module.scss';
import Link from 'next/link';
import router from 'next/router';
import axios from 'axios';
export default function LoginPage() {

  const cookie = require('cookie-cutter');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function loginUser(event: React.FormEvent) {
    event.preventDefault();
    console.log('logging in', email, password);

    // add stuff to login user and verify user below
    axios.post('/api/MongoAPI/user/loginUser', {
      email: email,
      password: password
    })
      .then((res) => {
        cookie.set('token', res.data.token, { path: '/' });
      })
  };

  function updateInput(event: React.ChangeEvent) {
   
    const { name, value } = event.currentTarget;

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
