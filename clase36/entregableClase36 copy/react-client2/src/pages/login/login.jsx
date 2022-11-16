import React, {useContext, useState} from "react"
import { Context } from "../../context/context"
import Modal from 'react-bootstrap/Modal'

import './login.css'



function Login() {

    const {setSessionUser} = useContext(Context)

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })

    const [showModal, setShowModal] = useState(false);
    const [modalBody, setModalBody] = useState()
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    
    const onChange = (e) => {
        const field = e.target.name
        const value = e.target.value

        setLoginData({...loginData, [field]: value})
        
        console.log(loginData)
    }

    const login = async (e) => {
        console.log("Datos login ingresados => ", loginData)
        try {
            if(!loginData.username || !loginData.password) {            
                setModalBody(`Completar usuario y contraseña !`)
                handleShowModal()
                setTimeout(() => handleCloseModal(), 2000)
                return
            }

            const resp = await fetch('/login', {
                method: 'POST',
                body: JSON.stringify(loginData),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-type': 'application/json'
                }
            })
            console.log(resp)

            if(resp.ok === true) {
                resp.json()
                .then(responseData => {
                    console.log("Resultado loggeo => ", responseData)
                    setSessionUser(responseData)
                })
                // hacer setUser
            }
            else if (resp.status === 401) {
                setLoginData({username: '', password: ''})
                setModalBody(`Usuario o contraseña incorrectos`)
                handleShowModal()
                setTimeout(() => handleCloseModal(), 2000)
            }
            else {
                console.log("resp.status.text ", resp.statusText)
                setLoginData({username: '', password: ''})
                setModalBody(`${resp.statusText}`)
                handleShowModal()
                setTimeout(() => handleCloseModal(), 2000)
            }
        }
        catch(err) {
            console.log("Error ", err)
            setLoginData({username: '', password: ''})
            setModalBody(`${err.message}`)
            handleShowModal()
            setTimeout(() => handleCloseModal(), 2000)
        }
    
    }



    return(
        <div>
            <h1>Login de usuario</h1>
            {/* Input email */}
            <div className="input-group mb-3">
                <input type="text" required className="form-control" placeholder="usuario" name="username" value={loginData.username} aria-label="" onChange={onChange}/>
            </div>

            {/* <!-- Input password --> */}
            <div className="input-group mb-3">
                <input type="text" required className="form-control" placeholder="Password" name="password" value={loginData.password} aria-label="" onChange={onChange}/>
            </div>

            {/* <!-- Botón Login --> */}
            <button className="btn btn-outline-secondary" type="button" id="loginButton" onClick={login}>Login</button>
            
            {/* <!-- Botón Signup --> */}
            <button className="btn btn-outline-secondary" type="button" onClick={(() => () => window.location.replace('/signup'))()}>SignUp</button>

            {/* <!-- Modal --> */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Body>{modalBody}</Modal.Body>
            </Modal>     
        </div>
    )
}

export {Login}