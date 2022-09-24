// VARIABLES
const userNameContainers = Array.from(document.getElementsByClassName('userNameContainer'))

let sessionUser

async function getUser() {
    await fetch('/session', {method: 'GET'})
    .then(async response => {
        if (response.ok === true) {
            const _user = await response.json()
            // sessionStorage.setItem('user', JSON.stringify(_user))
            sessionUser = _user
            console.log("script => ", sessionUser)
        }
        else (console.log(`Response error => ${response.status} - ${response.statusText}`))
    })
    .catch(error => console.log(error))
};

async function renderUser() {
    console.log("js => ", sessionUser)
    if(!sessionUser) {
        await getUser()
    }
    
    console.log("usernames => ", userNameContainers)
    for (let elem of userNameContainers) {
        elem.innerHTML = `${sessionUser.username}`
    }
    // userNameContainers.innerHTML = `${session.user.alias || session.user.nombre || session.user.email}`
}


renderUser()



