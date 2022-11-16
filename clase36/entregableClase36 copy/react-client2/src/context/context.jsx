import React, { createContext, useState, useEffect} from 'react'

export const Context = createContext()
//hay que exportarlo//


function ContextProvider ({ children}) {

    const [sessionUser, setSessionUser] = useState()
    
    useEffect(() => {
        const getSessionUser = async () => {
            try {
                const resp = await fetch('/session', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-type': 'application/json'
                    }
                })
                
                if(resp.ok === true) {
                    const _sessionUser = await resp.json()
                    setSessionUser(_sessionUser)
                }
                else {
                    setSessionUser()
                }
            }
            catch(err) {
                console.log("Error get session user")
                setSessionUser()
            }
        }
        getSessionUser()
    }, [])


    return (
    <Context.Provider value={{sessionUser, setSessionUser}}>
        {children}
    </Context.Provider>
    )
}

export { ContextProvider }
