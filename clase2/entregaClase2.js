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
      getBookNames() { return this.libros.map(obj => obj.nombre)}
  }
  
  const user1 = new Usuario("Juan Salvador", "Cabrera", [{nombre: "Rebelion en la granja", autor: "George Orwell"}], ["Ova"])
  
  console.log(user1.getFullName())
  user1.addMascota("Amelie")
  user1.addBook("El viejo del monte", "Autor desconocido")
  console.log(user1.getBookNames())
  console.log(user1.countMascotas())