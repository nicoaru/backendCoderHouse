let instance = null

class MongoDBClient {

    constructor() {
        // this.connectMongoDB()
        this.number = Math.random()*100
    }


    // connectMongoDB() {
    //     mongoose.connect(this.uriString)
    //     .then(res => console.log(`Respuesta conexión DB => conectado a ${res.connections[0]._connectionString}`))
    //     .catch(error => console.log("Error de conexión a DB => ", error.message))
    // }

    static getInstance() {
        if(!instance) {
            instance = new MongoDBClient
            return instance
        }
        else {
            return instance
        }
    }
}



const instance1 = MongoDBClient.getInstance()
const instance2 = MongoDBClient.getInstance()
const instance3 = MongoDBClient.getInstance()

console.log(instance1.number)
console.log(instance2.number)
console.log(instance3.number)