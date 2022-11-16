
// handleLogin()
const handleLogin = async (e) => {

    const user = {
    username: usernameInput.value, 
    password: passwordInput.value, 
    }

    if(!user.username || !user.password) {
        const myModal = new bootstrap.Modal(document.getElementById('failedLoginModal'), {backdrop: 'static'})
        failedLoginMessage.innerHTML = `Completar usuario y contraseña !`
        myModal.show()
        setTimeout(() => myModal.hide(), 2000)
        return
    }

    console.log("Datos login ingresados => ", user)

    fetch('/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        }
    })
    .then(async response => {
        console.log(`response login => `, response)
        if (response.ok === true) { 
            response.json()
            .then(responseData => {
                console.log("Resultado loggeo => ", responseData)
                window.location.replace("/")
            })
        }
        else if(response.status === 401) {
            usernameInput.value = '' 
            passwordInput.value = '' 
            const myModal = new bootstrap.Modal(document.getElementById('failedLoginModal'), {backdrop: 'static'})
            failedLoginMessage.innerHTML = `Usuario o contraseña incorrectos`
            myModal.show()
            setTimeout(() => myModal.hide(), 2000)
        }
        else {
            usernameInput.value = '' 
            passwordInput.value = '' 
            const myModal = new bootstrap.Modal(document.getElementById('failedLoginModal'), {backdrop: 'static'})
            failedLoginMessage.innerHTML = `${response.statusText}`
            myModal.show()
            setTimeout(() => myModal.hide(), 2000)
        }

    })
    .catch(error => console.log(error))
}

// handleLogout()
const handleLogout = (e) => {
    fetch('/logout', {
        method: 'DELETE'
    })
    .then(response => {
        console.log(response)
        if(response.redirected) {
            const myModal = new bootstrap.Modal(document.getElementById('logoutModal'), {backdrop: 'static'})
            logoutModalMessage.innerHTML = "La sesión expiró"
            myModal.show()
            setTimeout(() => window.location.replace(response.url), 2000)

            // window.location.assign(response.url)
        }
        else {
        response.json()
        .then(data => {
            console.log({status: response.statusText, ...data})
            const myModal = new bootstrap.Modal(document.getElementById('logoutModal'), {backdrop: 'static'})
            myModal.show()
            setTimeout(() => window.location.replace("/"), 2000)
        })
        .catch(error => console.log(error))            
        }

    })
    .catch(error => console.log(error))
}

// handleSignup()
const handleSignup = async (e) => {

        const user = {
            email: emailInput.value,
            username: usernameInput.value, 
            password: passwordInput.value, 
            telephone: telephoneInput.value, 
            avatar: avatarInput.value
        // emailInput.setAttribute('disabled', '')
        }
        console.log("line 81 . Datos de usuario ingresados => ", user)


        fetch('/signup', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {"Content-Type": "application/json"}
        })
        .then(response => {
            console.log(`response login => `, response)
            if (response.ok === true) { 
                response.json()
                .then(dataResponse => {
                    console.log("Resultado signup => ", dataResponse)
                    const myModal = new bootstrap.Modal(document.getElementById('signupModal'), {backdrop: 'static'})
                    signupModalMessage.innerHTML = `Usuario creado con éxito`
                    myModal.show()
                    setTimeout(() => window.location.replace("/"), 2000)                    
                })
            }
            else {
                response.json()
                .then(dataResponse => {
                    console.log("line 122 . response login => ", dataResponse)
                    const myModal = new bootstrap.Modal(document.getElementById('signupModal'), {backdrop: 'static'})
                    signupModalMessage.innerHTML = `${dataResponse.message}`
                    myModal.show()
                    setTimeout(() => myModal.hide(), 2000)                         
                })
                .catch(error => console.log("line 128 error resp.json() => ", error))
        }
        })
        .catch(error => {
            console.log(error.message)
            const myModal = new bootstrap.Modal(document.getElementById('signupModal'), {backdrop: 'static'})
            signupModalMessage.innerHTML = `Lo sentimos, hubo un error conectando con el servidor...`
            myModal.show()
            setTimeout(() => myModal.hide(), 2000)
        })

}




// FUNCIONES ACCESIORIAS
// validateEmail()
const validateEmail = (value) => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (value.match(validRegex)) { return true } 
    else { return false }
}

// OTRAS VARIABLES
const emailInput = document.getElementById("emailInput")
const usernameInput = document.getElementById("usernameInput")
const passwordInput = document.getElementById("passwordInput")
const telephoneInput = document.getElementById("telephoneInput")
const avatarInput = document.getElementById("avatarInput")
const loginButton = document.getElementById("loginButton")
const failedLoginMessage = document.getElementById("failedLoginMessage")
const signupModalMessage = document.getElementById("signupModalMessage")
const logoutModalMessage = document.getElementById("logoutModalMessage")