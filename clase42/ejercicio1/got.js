const got = require('got')


got("https://jsonplaceholder.typicode.com/posts")
.then(res => console.log(res.body))