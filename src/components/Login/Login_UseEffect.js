import React, { useState, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  //UseEffect run after every comp render cycle.
  //When we add an no dependency
  // useEffect(() => {
  //   console.log('EFFECT RUNNING'); //It run when the login comp is rendered for the first time.
  // });

  //When we add an empty dependency, now it run only for the first time when this comp rendered and not hence forth.
  // useEffect(() => {
  //   console.log('EFFECT RUNNING');
  // },[]);
  
  //Now it reruns when the depency changes
  // useEffect(() => {
  //   console.log('EFFECT RUNNING');
  // },[enteredPassword]);

  //This cleanup function run before the state funtion as a whole runs but not before the first time it runs.
  // useEffect(() => {
  //     console.log('EFFECT RUNNING');
  
  //     return () => {
  //       console.log('EFFECT CLEANUP');
  //     };
  //   }, [enteredPassword]);

//When no dependency 1st console runs when components is rendered and 2nd console runs when the comp is removed.
//Here after I press the logIn button. 
    useEffect(() => {
      console.log('EFFECT RUNNING');
  
      return () => {
        console.log('EFFECT CLEANUP');
      };
    }, []);

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;