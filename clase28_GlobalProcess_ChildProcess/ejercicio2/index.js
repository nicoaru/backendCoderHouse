const {exec, execFile, spawn} = require('child_process')

// console.log("comSpec => ", process.env.Comspec)

// exec('dir', (error, stdout, stderr) => {
//     if(error) {
//         console.error(`Error: ${error}`)
//         return
//     }
//     else if(stderr) {
//         console.error(`StdError: `, stderr)
//         return
//     }
//     else {
//         console.log(`resultado=> \n ${stdout}`)
//     }
// })


// execFile(process.execPath, ['-v'], (error, stdout, stderr) => {
//     if(error) {
//         console.error(`Error: ${error}`)
//         return
//     }
//     else if(stderr) {
//         console.error(`StdError: `, stderr)
//         return
//     }
//     else {
//         console.log(`resultado=> \n ${stdout}`)
//     }
// })


const childProc1 = spawn('dir', {shell: true})

childProc1.on('error', error => console.log(`childProc1 error: `, error))

childProc1.stdout.on('data', data => console.log(`childProc1 stdout => ${data}`))

childProc1.stderr.on('data', error => console.log(`childProc1 stderr => ${error}`))

