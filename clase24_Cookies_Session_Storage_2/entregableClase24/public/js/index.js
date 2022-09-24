// VARIABLES
const userNameContainers = Array.from(document.getElementsByClassName('userNameContainer'))
let session




async function getSession() {
    await fetch('/session', {method: 'GET'})
    .then(async response => {
        if (response.ok === true) {
            session = await response.json()
        }
        else (console.log(`Response error => ${response.status} - ${response.statusText}`))
    })
    .catch(error => console.log(error))
} 

async function renderUser() {
    if(!session) {
        await getSession()
    }
    console.log("usernames => ", userNameContainers)
    for (let elem of userNameContainers) {
        elem.innerHTML = `${session.user.alias || session.user.nombre || session.user.email}`
    }
    // userNameContainers.innerHTML = `${session.user.alias || session.user.nombre || session.user.email}`
}

renderUser()



