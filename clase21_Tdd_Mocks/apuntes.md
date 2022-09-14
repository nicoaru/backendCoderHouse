TDD - Test Driven Development
    . Practica de programacion basada en tests. 
    . Consiste en escribir primero las pruebas (generalmente unitarias), después escribir el código fuente que pase la prueba satisfactoriamente y, por último, refactorizar el código escrito.
    . primero escribo cómo debe funcionar mi programa y una vez que lo tengo claro, paso a codificarlo.
    . Al escribir el test estamos diseñando cómo va a funcionar el software.
    . Es importante pasar todos los tests después de refactorizar por si nos olvidado de algo.
    . Paquetes: 
        . mochajs 
        . jestjs => configurar el script Test en package.json: "jest --detectOpenHandles"


MockApi

    . Mocking es la técnica utilizada para simular objetos en memoria con la finalidad ejecutar pruebas unitarias sobre las peticiones que queremos poner a prueba, devolviendo datos de prueba similares a los esperados
    . Los Mocks son objetos preprogramados en función de las llamadas que se espera recibir.
    . Los Mocks se pueden servir desde un servidor web a través de una Mock API.
    . Por ejemplo teniendo un endpoint "/test"
    . Los Mocks de API son una herramienta muy potente que permite desarrollar y probar el front-end como un componente independiente del back-end, facilitando y reduciendo tiempos de desarrollo, ya que responde preguntas triviales y permite avanzar en el desarrollo de la interfaz de usuario sin tener que esperar que el desarrollo del backend esté terminado
    . Paquetes:     
        . supertest => simula peticiones. Se usa junto con jestjs
        . faker.js => genera datos aleatorios

API
. Permiten que sus productos y servicios se comuniquen con otros
. Las API se consideran como contratos, con documentación que representa un acuerdo entre las partes: 
. Si una de las partes envía una solicitud remota con cierta estructura, esa misma estructura determinará cómo responderá el software de la otra parte


Git grep <loQueQuerramosBuscar> => puede buscar en todos los archivos del repositorio

ThunderClient => extensión de VSCode tipo postman



