// const assert = require("assert");
const chai = require("chai");
const supertest = require("supertest");
const { generateDataProducts, generateDataUser } = require("../src/utils/fakeDataGenerator");
const expect = chai.expect;
const assert = chai.assert;
const agent = supertest.agent(`http://localhost:8080`);


let newUser

let newProduct
let newProducts
let newProductId

let newItemCarrito


describe("Test routes /api/users", () => {

  before(() => {
    newUser = generateDataUser()
    // console.log('newUser => ', newUser)
  })

  it("Debería crear un nuevo usuario", async () => {
    const response = await agent.post("/api/users/signup").send(newUser)
    
    const body = response.body;
    // console.log('response => ', response)
    // console.log('body => ', body)    
  
    expect(response.status).to.eql(200);

  })

  it("Debería logear usuario", async () => {
    const loginData = {
      username: newUser.username,
      password: newUser.password
    }
    const response = await agent.post("/api/users/login").send(loginData)

    const body = response.body
    // console.log('body => ', body)    

    expect(response.status).to.equal(200)
  })

  it("Debería devolver los datos del usuario logeado", async () => {
    const response = await agent.get("/api/users/logged")
    
    const body = response.body
    // console.log("body => ", body)
  
    expect(response.status).to.equal(200)
    expect(body.username).to.equal(newUser.username)
  })

})


describe("Test routes /api/productos ", () => {

  before(()=> {
    newProduct = generateDataProducts(1)[0]
    newProducts = generateDataProducts(5)
    // console.log('nweProduct => ', newProduct)
  });


  it("Deberia devolver el nuevo producto que estoy cargando", async () => {
    const response = await agent.post("/api/productos")
      .send(newProduct);
    // console.log('response => ', response)
    const body = response.body;
    newProduct = body
    newProductId = body._id
    console.log('newProductId => ', newProductId)
    expect(response.status).to.eql(200);
    expect(body).to.include.keys('_id', '__v', 'nombre', 'descripcion', 'categoria', 'codigo', 'precio', 'imgUrl', 'stock');
    expect(body.nombre).to.eql(newProduct.nombre);
  });

  it("Deberia devolver una lista con todos los productos nuevos que estoy cargando", async () => {
    const response = await agent.post("/api/productos")
      .send(newProducts);
    // console.log('response => ', response)
    const body = response.body;
    // console.log('body=> ', body)
    expect(response.status).to.eql(200);
    assert.typeOf(body, 'array');
    // expect(body[0]).to.include.keys('_id', '__v', 'nombre', 'descripcion', 'categoria', 'codigo', 'precio', 'imgUrl', 'stock');
  });  

  it(`Deberia devolver el producto que cargue primero`, async () => {
    const response = await agent.get(`/api/productos/${newProductId}`)
    // console.log('response => ', response)
    const body = response.body;
    // console.log('body => ', body)
    expect(response.status).to.eql(200);
    expect(body).to.include.keys('_id', '__v', 'nombre', 'descripcion', 'categoria', 'codigo', 'precio', 'imgUrl', 'stock');
    expect(body.nombre).to.eql(newProduct.nombre);
  });

  it("Deberia devolver el producto que acabo de cargar", async () => {
    const precio = 5000
    const stock = 10
    const response = await agent.put(`/api/productos/${newProductId}`)
      .send({precio, stock});
    // console.log('response => ', response)
    const body = response.body;
    // console.log('body => ', body)
    expect(response.status).to.eql(200);
    expect(body).to.include.keys('_id', '__v', 'nombre', 'descripcion', 'categoria', 'codigo', 'precio', 'imgUrl', 'stock');
    expect(body.nombre).to.eql(newProduct.nombre);
    expect(body.precio).to.eql(precio);
    expect(body.stock).to.eql(stock);
  });

  it("Deberia retornar una lista con todos los productos", async () => {
    const response = await agent.get("/api/productos")
    // console.log('response => ', response)
    const body = response.body;
    // console.log('body => ', body)
    expect(response.status).to.eql(200);
    assert.typeOf(body, 'array')
  });

  it("Deberia devolver un objeto con la propiedad 'deletedCount: 1'", async () => {
    const response = await agent.delete(`/api/productos/${newProductId}`)
    // console.log('response => ', response)
    const body = response.body;
    // console.log('body => ', body)
    expect(response.status).to.eql(200);
    expect(body.deletedCount).to.eql(1);
  });

  it("Deberia devolver un objeto con la propiedad 'deletedCount' con un valor numérico", async () => {
    const response = await agent.delete(`/api/productos`)
    // console.log('response => ', response)
    const body = response.body;
    // console.log('body => ', body)
    expect(response.status).to.eql(200);
    assert.typeOf(body.deletedCount, 'number');
  });

});



describe("Test routes /api/carritos ", () => {

  before(()=> {
    newItemCarrito = {
      producto: newProduct,
      cantidad: 4
    }
  });

  it("Debería devolver el carrito correspondiente al usuario logeado", async () => {
    const response = await agent.get("/api/carritos")
    const body = response.body
    // console.log("body => ", body)
    expect(response.status).to.eql(200);
    expect(body).to.include.keys('_id', 'userId', 'productos');
  })

  it("Debería devolver el carrito correspondiente al usuario logeado con el item agregado", async () => {
    // console.log('newItemCarrito => ', newItemCarrito)
    const response = await agent.post("/api/carritos/productos")
      .send(newItemCarrito)
    const body = response.body
    // console.log("body => ", body.productos)
    expect(response.status).to.eql(200);
    expect(body).to.include.keys('_id', 'userId', 'productos');
  })

  it("Debería devolver los productos del carrito correspondiente al usuario logeado", async () => {
    const response = await agent.get("/api/carritos/productos")
    const body = response.body
    // console.log("body => ", body)
    expect(response.status).to.eql(200);
    assert.typeOf(body, 'array');
    expect(body[0]).to.include.keys('producto', 'cantidad')
  })

  it("Debería devolver un mensaje de error", async () => {
    const response = await agent.delete(`/api/carritos/productos/6372fec04a18c036330c09be`)
    const body = response.body
    // console.log("body => ", body)
    expect(response.status).to.eql(404); 
  })

  it("Debería devolver el carrito correspondiente al usuario logeado sin productos", async () => {
    // console.log('newProductId => ', newProductId)
    const response = await agent.delete(`/api/carritos/productos/${newProductId}`)
    const body = response.body
    // console.log("body => ", body)
    expect(response.status).to.eql(200);
    assert.typeOf(body.productos, 'array');
    expect(body.productos.length).to.be.equal(0)
  })

  // repito esta prueba para probar el siguiente método de borrado
  it("Debería devolver el carrito correspondiente al usuario logeado con el item agregado", async () => {
    // console.log('newItemCarrito => ', newItemCarrito)
    const response = await agent.post("/api/carritos/productos")
      .send(newItemCarrito)
    const body = response.body
    // console.log("body => ", body.productos)
    expect(response.status).to.eql(200);
    expect(body).to.include.keys('_id', 'userId', 'productos');
  })

  it("Debería devolver el carrito correspondiente al usuario logeado sin productos", async () => {
    // console.log('newProductId => ', newProductId)
    const response = await agent.delete(`/api/carritos/productos`)
    const body = response.body
    // console.log("body => ", body)
    expect(response.status).to.eql(200);
    assert.typeOf(body.productos, 'array');
    expect(body.productos.length).to.be.equal(0)
  })


});



describe("Test routes /api/pedidos ", () => {

  before(()=> {
    items = [
      newItemCarrito
    ]
  });

  it("Deberia devolver un array vacío, ya que el usuario logeado no tiene pedidos cargados", async () => {
    const response = await agent.get("/api/pedidos")
    // console.log('response => ', response)
    const body = response.body;
    // console.log("body => ", body)
    expect(response.status).to.eql(200);
    assert.typeOf(body, "array")
    expect(body.length).to.be.equal(0)

  });

  it("Deberia devolver el pedido agregado", async () => {
    const response = await agent.post("/api/pedidos")
      .send({items});
    // console.log('response => ', response)
    const body = response.body;
    // console.log("pedido guardado => ", body)
    expect(response.status).to.eql(200);
    expect(body).to.include.keys('_id', 'userId', 'items');
    expect(body.items.length).to.be.greaterThan(0)
  });

  it("Deberia devolver un array con los pedidos correspondientes al usuario logeado", async () => {
    const response = await agent.get("/api/pedidos")
    // console.log('response => ', response)
    const body = response.body;
    // console.log("body => ", body)
    expect(response.status).to.eql(200);
    assert.typeOf(body, "array")
    expect(body.length).to.be.greaterThan(0)
    expect(body[0]).to.include.keys('_id', 'userId', 'items')
    expect(body[0].items.length).to.be.greaterThan(0)
  });

});



describe("Test routes /api/users", () => {

  it("Debería deslogear usuario", async () => {
    const response = await agent.delete("/api/users/logout")

    const body = response.body
    console.log('body => ', body)    

    expect(response.status).to.equal(200)
    expect(body.loged).to.equal("false")
    expect(body.user).to.equal(null)
    // {ok: true, loged: "false", user: req.user}
  })

  it("Debería devolver los datos del usuario logeado", async () => {
    const response = await agent.get("/api/users/logged")
    
    const body = response.body
    console.log("body => ", body)
  
    expect(response.status).to.equal(401)
    expect(body.loged).to.equal("false")

    // {error: true, loged: "false", message: 'Not loged', user: req.user}
  })

})