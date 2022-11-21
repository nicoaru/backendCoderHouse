cleanCode
 . Que las funciones entren en el tamaño vertical de la pantalla del editor de codigo 

Modelo de editores / susctiptores

Dotenv
    . siempre agregarlo al gitignore

DAOs de clases
    . sumado a que la idea de la clase es tener todos los metodos agnosticos, si importar la data que traigan esos metodos
    . una clase que guarde, traiga, elimine o actualice una data, sin importar que. Puden ser users, productos o lo que necesites, la idea es armar la clase de tal forma que useses siempre esa sin necesidad de mofdificarla

Patrones de diseño
    . IIFE
    . Singleton
        Consiste en crear una clase que permita crear una instancia de un objeto, y que cada vez que querramos instanciarlo de nuevo, si ya hay una instancia creada, en vez de instanciarlo de nuevo devuelve la instancia existente

const {PORT = 8080} = require('./config.js')

Librerias
    . cors - para hablilitar peticiones cross-origin
    . node-fetch - back
    Front
    . react-query para getear data sin user useEffect
    . axios - front
