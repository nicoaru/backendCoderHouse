class Contador {
    static cuentaGeneral = 25
    static obtenerCuentaGlobal() { return Contador.cuentaGeneral}
    
    constructor(nombre) {
      this.cuentaPersonal = 0;
      this.responsable = nombre;
    }
    obtenerResponsable() { return this.responsable }
    obtenerCuentaPersonal() { return this.cuentaPersonal }
    sumar(a=1) {this.cuentaPersonal += a;
              Contador.cuentaGeneral += a
             }
  }
  
  const juan = new Contador("Juan");
  const lucia = new Contador("Lucia")

  console.log("Cuenta de Juan => ",juan.cuentaPersonal)
  console.log("Cuenta general => ", Contador.obtenerCuentaGlobal())
  juan.sumar(4)
  juan.sumar(1)
  console.log("Cuenta de Juan => ",juan.cuentaPersonal)
  console.log("Cuenta general => ", Contador.obtenerCuentaGlobal())
  console.log("Cuenta de Lucia => ",lucia.cuentaPersonal)
  lucia.sumar(5)
  lucia.sumar(3)
  lucia.sumar(1)
  console.log("Cuenta de Lucia => ",lucia.cuentaPersonal)
  console.log("Cuenta general => ", Contador.obtenerCuentaGlobal())
  
  /*  */
  console.log("-------")

class Usuario {
  
    constructor(nombre, apellido, libros, mascotas) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.libros = libros;
      this.mascotas = mascotas;
    }
    getFullName() {return `${this.nombre} ${this.apellido}` }
    addMascota(nombreMascota) { this.mascotas.push(nombreMascota)}
    countMascotas() { return this.mascotas.length }
    addBook(nombre, autor) { this.libros.push({nombre: nombre, autor: autor}) }
      getBookNames() { return this.libros.map(obj => obj.nombre).join(', ')}
  }
  
  const user1 = new Usuario("Juan Salvador", "Cabrera", [{nombre: "Rebelion en la granja", autor: "George Orwell"}], ["Ova"])
  
  console.log(user1.getFullName())
  user1.addMascota("Amelie")
  user1.addBook("El viejo del monte", "Autor desconocido")
  console.log("Los libros de ", user1.nombre, " => ",user1.getBookNames())
  console.log("Cantidad de mascotas de ", user1.nombre," ", user1.countMascotas())