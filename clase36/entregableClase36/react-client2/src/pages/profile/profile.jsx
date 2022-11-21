import React, {useContext} from "react"
import { Layout } from '../../components/layout/layout'
import { Context } from "../../context/context"
import './profile.css'




function Profile () {

    const {sessionUser, setSessionUser} = useContext(Context)

    return (
        <Layout>
            <div className="d-flex">
                <img src={`${sessionUser.imgurl}`} alt="foto de perfil" width={100} />
                <h1>{sessionUser.name}</h1>
            </div>
            <h3>Nombre: {sessionUser.name}</h3>
            <h3>Email: {sessionUser.email}</h3>
            <h3>Dirección: {sessionUser.address}</h3>
            <h3>Teléfono: {sessionUser.telephone}</h3>


        </Layout>




    )
}

export {Profile}