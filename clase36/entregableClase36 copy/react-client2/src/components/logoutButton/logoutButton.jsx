import React, {useContext} from "react"
import { Context } from "../../context/context"
import './logoutButton.css'



function LogoutButton() {
    const {sessionUser, setSessionUser} = useContext(Context)
    const handleLogout = async () =>{
        try {
            const resp = await fetch('/logout', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-type': 'application/json'
                }
            })

            if (resp.ok === true) {
                const respData = await resp.json()
                console.log("logout user ok. User: ", respData.user)
                setSessionUser(respData.user)
            }
            else if (resp.status === 401 ){
                const respData = await resp.json()
                console.log("Loged: ", respData.message)
                setSessionUser(respData.user)
            }
            else {
                const respData = await resp.json()
                console.log("Error haciendo logout: ", respData.message)
                // mostrar aviso
            }
        }
        catch(err) {
            console.log("Error haciendo logout ", err.message)
            // mostrar aviso
        }

    }

    return (

        <div className='logoutButton' onClick={handleLogout}>{'Logout'}</div>

    )
}


export { LogoutButton }