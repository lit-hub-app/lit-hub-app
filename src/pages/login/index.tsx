import { useState } from 'react';
import styles from '@/styles/pages/Login.module.scss';
import Link from 'next/link';

export default function LoginPage() {

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  function loginUser(event: React.FormEvent) {
    event.preventDefault();
    console.log('logging in', user, password);

    // add stuff to login user and verify user below
  };

  function updateInput(event: React.ChangeEvent) {
    const { name, value } = event.currentTarget;
    console.log(name, value);

    switch (name) {
      case 'user':
        setUser(value);
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
            USERNAME
            <input
              id='username'
              type='text'
              placeholder='username'
              name='user'
              value={user}
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
