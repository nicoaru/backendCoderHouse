Testeo de API

. Cuando desarrollamos una API queremos que se comporte como debe cuando se realizan peticiones:
    . Si realizamos una petición a un endpoint que no existe debería devolvernos un 404 como código de respuesta. 
    . Si hacemos una petición por post para crear un recurso debe devolvernos un 201 y un header location con la url donde se puede acceder al recurso creado. 
    . Etc...
    . Que esto funcione de esta forma lo debemos testear previo al funcionamiento real de la aplicación.


. TDD - Test Driven Development
    . 


. BDD - Behaviour Driven Development
    . En BDD no probamos solo unidades o clases, probamos escenarios y el comportamiento de las clases a la hora de cumplir dichos escenarios, los cuales pueden estar compuestos de varias clases.
    . Amplía las ideas de TDD y las combina con otras ideas de diseño de software y análisis de negocio.
    