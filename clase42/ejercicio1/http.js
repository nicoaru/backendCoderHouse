const http = require('http')


const options = {
    hostname: "jsonplaceholder.typicode.com",
    path: "/posts",
    port: 80,
    method: 'GET'
}

const req = http.request(options, res => {
    // console.log('res => ', res)
    
    res.on('data', data => {
        process.stdout.write(data);

    })
})

req.on('error', err => {
    console.log('Error => ', err)
})

req.end()