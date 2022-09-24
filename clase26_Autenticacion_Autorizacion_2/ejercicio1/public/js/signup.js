
// handleLogin()
const handleSignup = async (e) => {
    const emailInputValue = emailInput.value
    if(emailInputValue && validateEmail(emailInputValue)) {
        const user = {
        email: emailInputValue,
        username: usernameInput.value, 
        password: passwordInput.value, 
        telephone: telephoneInput.value, 
        avatar: avatarInput.value
        }
        // emailInput.setAttribute('disabled', '')

        console.log("Datos de usuario ingresados => ", user)
  
        fetch('/login', {
            method: 'POST',
            body: JSON.stringify({user: user}),
            headers: {"Content-Type": "application/json"}
        })
        .then(response => {
            console.log(`response login => `, response)
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
const usernameInput = document.getElementById("usernameInput")
const passwordInput = document.getElementById("passwordInput")
const telephoneInput = document.getElementById("telephoneInput")
const avatarInput = document.getElementById("avatarInput")
const loginButton = document.getElementById("loginButton")
