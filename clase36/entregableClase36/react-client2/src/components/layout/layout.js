import { NavBar } from "./navBar/navBar";
import './layout.css'

function Layout({children}) {

    return(
    <main className='main'>
        <NavBar/>
        {children}

    </main>


    )
}


export { Layout }