import React, {useState} from "react"
import Modal from 'react-bootstrap/Modal'

import './signup.css'



function Signup() {

    const [newUser, setNewUser] = useState({
        email: '',
        username: '',
        name: '',
        telephone: '',
        address: '',
        imgurl: '',
        password: ''
    })

    const [showModal, setShowModal] = useState(false);
    const [modalBody, setModalBody] = useState()
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    
    const onChange = (e) => {
        const field = e.target.name
        const value = e.target.value

        setNewUser({...newUser, [field]: value})
        
        console.log(newUser)
    }

    const signUp = async () => {
        try {
            const resp = await fetch('/signup', {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {"Content-Type": "application/json"}
            })
            console.log("signup response ", resp)

            if(resp.ok === true) {
                const dataResp = await resp.json()
                console.log("Resultado signup => ", dataResp)

                setModalBody(`Usuario creado con éxito`)
                handleShowModal()
                setTimeout(() => window.location.replace("/login"), 2000)
            }
            else {
                const error = await resp.json()
                console.log("signup response data ", error)
                setModalBody(`${error.message}`)
                handleShowModal()
                setTimeout(() => handleCloseModal(), 2000)
            }
        }
        catch(err) {
            console.log(err.message)
            setModalBody(`Lo sentimos, hubo un error conectando con el servidor...`)
            handleShowModal()
            setTimeout(() => handleCloseModal(), 2000)
        }
    }



    
    return(
        <div>
            <h1>Signup</h1>
            <h6>Por favor completa los siguientes datos</h6>
            {/* <!-- Input Email --> */}
            <form>
                <div className="input-group mb-3">
                    <input type="text" required className="form-control" placeholder="Email" name="email" value={newUser.email} aria-label="" style={{borderRadius: 6}} onChange={(e) => onChange(e)}/>
                    {/* <!-- toast alert --> */}
                    <div className="toast-container top-0 end-0 p-2">
                        <div id="signupToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                            <div className="toast-body d-flex justify-content-between">
                                <span>{`Chequea los datos ingresados! ;)`}</span>
                                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Input username --> */}
                <div className="input-group mb-3">
                    <input type="text" required className="form-control" placeholder="username" name="username" value={newUser.username} aria-label="" onChange={(e) => onChange(e)}/>
                </div>

                {/* <!-- Input username --> */}
                <div className="input-group mb-3">
                    <input type="text" required className="form-control" placeholder="Nombre" name="name" value={newUser.name} aria-label="" onChange={(e) => onChange(e)}/>
                </div>

                {/* <!-- Input password --> */}
                <div className="input-group mb-3">
                    <input type="text" required className="form-control" placeholder="Password" name="password" value={newUser.password} aria-label="" onChange={(e) => onChange(e)}/>
                </div>

                {/* <!-- Input telephone --> */}
                <div className="input-group mb-3">
                    <input type="text" required className="form-control" placeholder="Número de teléfono" name="telephone" value={newUser.telephone} aria-label="" onChange={(e) => onChange(e)}/>
                </div>
                {/* <!-- Input address --> */}
                <div className="input-group mb-3">
                    <input type="text" required className="form-control" placeholder="Dirección" name="address" value={newUser.address} aria-label="" onChange={(e) => onChange(e)}/>
                </div>

                {/* <!-- Input Avatar --> */}
                <div className="input-group mb-3">
                    <input type="text" required className="form-control" placeholder="Foto de perfil (url de la imagen)" name="imgurl" value={newUser.imgurl} aria-label="" onChange={(e) => onChange(e)}/>
                </div>

                {/* <!-- Botón signup --> */}
                <button className="btn btn-outline-secondary" type="button" id="loginButton" onClick={signUp}>Signup</button>
                {/* <!-- Botón Login --> */}
                <button className="btn btn-outline-secondary" type="button" onClick={(() => () => window.location.replace('/login'))()}>Login</button>
            </form>

            {/* <!-- Modal --> */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Body>{modalBody}</Modal.Body>
            </Modal>        
        </div>
    )
}

export {Signup}