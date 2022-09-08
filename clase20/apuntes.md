Mongo Atlas
. Creamos un cluster
. Nos conectamos con mongosh con el comando que nos pasa Atlas y trabajamos desde la shell como si la DB estuviera alijada nuestra compu
. Nos conectamos con Robo3T o MongoCompass, en new connection mediante la URI que nos pasa Atlas


Types.ObjectId(<string>)
. lo que hace es crear un objeto ObjectId a partir del string que le pasamos


Firebase
. Configuracion del proyecto => cuentas de servicios => generar nueva clave privada. Eso es para conectarse con Node.js
. npm i firebase-admin


Entregable
. Usar .dotenv
. Hacer un contenedor para mongodb y otro para firebase
. en el DAO pasar como parámetro el esquema(mongoose) o la referencia a la coleccion(firebase)

En el confg vas a tener todas las key, para cada base de datos

La idea del daos es que vos no tengas que instanciar nuevamente las clases, sino que van a estar todas instanciadas y luego desde un punto .env vos vas a decidir que db utilizar y gracias al daos no vas a tener que modificar nada ya que va a estar configurado agonostico a la base de datos

Es importante que todos los metodos de cada clase se llamen de la misma manera

Import dinámico
. ejemplo: 
    try {
        const nameModule = this.type[parameter-sample];
        const moduleStore = require(`./dao|storage/${nameModule}`);
        this.store = new moduleStore(this);
        return this.store;
        } catch (error) {
        throw new Error(`Error al realizar set de modelo para ${error}`);
        }
