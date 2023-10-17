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

const SignUp = () => {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        isAccepted: false,
    })

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [formcontainer, setFormContainer] = useState(window.innerWidth < 390);

    useEffect (() => {
        setErrors(validate(data,'signup'))
        window.addEventListener('resize', () => {
            const screenSize = window.innerWidth < 390;
        if (screenSize !== formcontainer) setFormContainer(screenSize);
    }, false);
    
    }, [data,touched,formcontainer])

    const changeHandler = (event) => {
        if (event.target.name === "isAccepted") {
           setData({...data,[event.target.name]:event.target.checked }) 
        } else {
            setData({...data,[event.target.name]:event.target.value})
        }
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
                name: true,
                email: true,
                password: true,
                confirmPassword: true,
                isAccepted: true,
            })
        }
    }

    return (
        <div className={styles.container}>
            <form className={`${formcontainer ? "" : styles.formContainer}`} onSubmit={onSubmitHandler}>
                <img className={styles.logo} src={Logo} alt='Logo' />
                <h2 className={styles.header} >Sign Up</h2>

                <div className={styles.fieldContainer}>
                    <label>Name</label>
                    <input 
                        className={(errors.name && touched.name) ? styles.uncompleted : styles.formInput}
                        type='name' 
                        name='name'
                        value={data.name}
                        onChange={changeHandler}
                        onFocus={focusHandler}
                    />
                    {errors.name && touched.name && <span>{errors.name}</span>}
                </div>
                
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
                
                <div className={styles.fieldContainer}>
                   <label>Confirm Password</label>
                    <input 
                        className={(errors.confirmPassword && touched.confirmPassword) ? styles.uncompleted : styles.formInput}
                        type='password' 
                        name='confirmPassword' 
                        value={data.confirmPassword}
                        onChange={changeHandler}
                        onFocus={focusHandler}
                    />
                    {errors.confirmPassword && touched.confirmPassword && <span>{errors.confirmPassword}</span>} 
                </div>

                <div className={styles.checkBox}>
                    <div className={styles.checkBoxContainer}>
                        <label>I accept terms of privacy policy</label>
                        <input
                            className={(errors.isAccepted && touched.isAccepted) ? styles.checkBoxUncompleted :styles.checkBoxInput}
                            type='checkbox' 
                            name='isAccepted' 
                            value={data.isAccepted}
                            onChange={changeHandler}
                            onFocus={focusHandler}
                        />
                    </div>
                    {errors.isAccepted && touched.isAccepted && <span>{errors.isAccepted}</span>}
                </div>
                
                <div className={styles.formButtons}>
                    <Link to='/login'>Login</Link>
                    <button type='submit'>Sign Up</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default SignUp;