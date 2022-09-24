
// handleLogin()
const handleLogin = async (e) => {
    const emailInputValue = emailInput.value
    if(emailInputValue && validateEmail(emailInputValue)) {
        const user = {
        email: emailInputValue,
        nombre: nombreInput.value, 
        apellido: apellidoInput.value, 
        edad: edadInput.value, 
        alias: aliasInput.value,
        avatar: avatarInput.value
        }
        emailInput.setAttribute('disabled', '')
        apellidoInput.setAttribute('disabled', '')
        edadInput.setAttribute('disabled', '')
        aliasInput.setAttribute('disabled', '')
        nombreInput.setAttribute('disabled', '')
        avatarInput.setAttribute('disabled', '')
        loginButton.setAttribute('disabled', '')

        console.log("Usuario logueado => ", user)
  
        fetch('/session/login', {
            method: 'POST',
            body: JSON.stringify({user: user}),
            headers: {"Content-Type": "application/json"}
        })
        .then(response => {
            if (response.ok === true) { 
                response.json()
                .then(sessionData => {
                    console.log("Resultado loggeo => ", sessionData)
                    console.log("session => ", sessionData)
                    window.location.replace("/")
                })
            }
            else {
                // console.log("login.js line 34 response => ", response.status, " => ", response.statusText)
                response.text().then(data => console.log("login.js line 35 => ", data))
            }
        })
        .catch(error => console.log(error))
    }
    else {
        const toastElement = document.getElementById('loginToast')
        const toast = new bootstrap.Toast(toastElement)
        toast.show()
    }
}

// handleLogout()
const handleLogout = (e) => {
    fetch('/session/logout', {
        method: 'GET'
    })
    .then(response => {
        console.log(response)
        response.json()
        .then(data => {
            console.log({status: response.statusText, ...data})
            const myModal = new bootstrap.Modal(document.getElementById('logoutModal'), {backdrop: 'static'})
            console.log("myModal => ", myModal)
            myModal.show()
            setTimeout(() => window.location.replace("/"), 2000)
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
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
const nombreInput = document.getElementById("nombreInput")
const apellidoInput = document.getElementById("apellidoInput")
const edadInput = document.getElementById("edadInput")
const aliasInput = document.getElementById("aliasInput")
const avatarInput = document.getElementById("avatarInput")
const loginButton = document.getElementById("loginButton")
