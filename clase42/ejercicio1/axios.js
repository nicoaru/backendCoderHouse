const axios = require('axios')

axios.get("https://jsonplaceholder.typicode.com/posts", {headers: {'accept-encoding': '*'}})
.then(res => console.log(res))

