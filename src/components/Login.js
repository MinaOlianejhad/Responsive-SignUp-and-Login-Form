import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//images
import Logo from '../images/logo.webp';

//Components
import { validate } from './validate';
import { notify } from './Toast';

//Styles
import styles from './SignUp.module.css';

const Login = () => {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        isAccepted: false,
    })

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    useEffect (() => {
        setErrors(validate(data,'login'))
    }, [data,touched])

    const changeHandler = (event) => {
            setData({...data,[event.target.name]:event.target.value})
    }

    const focusHandler = (event) => {
        setTouched({...touched, [event.target.name]:true});
    }
    
    const onSubmitHandler = event => {
        event.preventDefault();
        if(!Object.keys(errors).length) {
            notify("You signed in successfully", "success");
        } else {
            notify("Invalid data!", "error");
            setTouched ({
                email: true,
                password: true,
            })
        }
    }

    return (
        <div className={styles.container}>
            <form className={styles.formContainer} onSubmit={onSubmitHandler}>
                <img className={styles.logo} src={Logo} alt='Logo' />
                <h2 className={styles.header} >Sign Up</h2>
                
                <div className={styles.fieldContainer}>
                    <label>Email</label>
                    <input 
                        className={(errors.email && touched.email)? styles.uncompleted : styles.formInput}
                        type='email' 
                        name='email'
                        value={data.email}
                        onChange={changeHandler}
                        onFocus={focusHandler}
                    /> 
                    {errors.email && touched.email && <span>{errors.email}</span>}

                </div>

                <div className={styles.fieldContainer}>
                    <label>Password</label>
                    <input 
                        className={(errors.password && touched.password ) ? styles.uncompleted : styles.formInput}
                        type='password' 
                        name='password'
                        value={data.password}
                        onChange={changeHandler}
                        onFocus={focusHandler}
                    />
                    {errors.password && touched.password &&<span>{errors.password}</span>} 
                </div>
                
                <div className={styles.formButtons}>
                    <Link to='/signup'>Sign Up</Link>
                    <button type='submit'>Login</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;