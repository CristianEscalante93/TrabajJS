// array de stock de productos
const stock = [];

// array del carrito de compras
const carrito = [];

//constantes
const h2 = document.getElementById("h2");
const stockProductos= document.getElementById("stock");
const compras = document.getElementById("compras");
const nomb = document.getElementById("nombre");
const email = document.getElementById("email");
const btnEnviar = document.getElementById("btnCargar");
const precioTotal = document.getElementById("total");


// clase constructora de objetos-productos
class productoStock {
    constructor(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;}}

// agregado de productos
const nuevoProducto1 = new productoStock(1,"Colgante de 1 cuerpo",1500);
const nuevoProducto2 = new productoStock(2,"Colgante de 2 cuerpos",2000);
const nuevoProducto3 = new productoStock(3,"Lámpara vintage",1000);
const nuevoProducto4 = new productoStock(4,"Lámpara moderna",2500);
const nuevoProducto5 = new productoStock(5,"Solo portalamparas",500);

// funcion agregar para cualquier array
function cargar(array,objeto){
    array.push(objeto);
}

cargar(stock,nuevoProducto1)
cargar(stock,nuevoProducto2)
cargar(stock,nuevoProducto3)
cargar(stock,nuevoProducto4)
cargar(stock,nuevoProducto5)

// inicio de pedido de datos al cliente
let nombre;
btnEnviar.addEventListener("click",()=> {
    nombre = nomb.value;
    h2.innerText= "Buenas " + nombre + " , a continuacion podra ver su compra";
})

// tarjetas del stock
function tarjetasStock () {
for (const producto of stock) {
    let prod = document.createElement('div')
    prod.innerHTML=`<div class="card">
    <h3>${producto.nombre}</h3>
    <p> $ ${producto.precio}</p>
    <button id="agregar${producto.id}">Agregar</button>
    </div>`
    stockProductos.append(prod) 
}
funcionBoton()
}

// boton agregar
function funcionBoton(){
    for (const producto of stock) {
        document.getElementById(`agregar${producto.id}`).addEventListener("click",()=>{
            agregarCarrito(producto)
    });
}
};

function agregarCarrito(producto){
    let existe = carrito.some(prod=>prod.id === producto.id);
    if(existe===false){
        producto.cantidad = 1;
        cargar(carrito,producto);
    }
    else{
        let prodFind = carrito.find(prod=> prod.id===producto.id);
        prodFind.cantidad++;
    }
    mostrarCarrito();
    }

// mostrar el carrito de compras
function mostrarCarrito(){
    compras.innerHTML = "";
for (const producto of carrito) {
    let prodCarrito = document.createElement('div')
    prodCarrito.innerHTML=`<div class="card">
    <h3>${producto.nombre}</h3>
    <p> $ ${producto.precio}</p>
    <h3>CANTIDAD: ${producto.cantidad}</h3>
    <button class="btnCarrito" id="btn-borrar${producto.id}">Borrar</button>
    </div>`
    compras.append(prodCarrito) 
}
borrar();
let precioTot;
    precioTot = carrito.reduce((acc,el)=> acc + ((el.precio)*(el.cantidad)), 0 );
precioTotal.innerText= "El valor de su compra es de $" + precioTot;
}

// boton borrar
function borrar(){
    carrito.forEach(producto=>{
        document.getElementById(`btn-borrar${producto.id}`).addEventListener("click",()=>{
            let indice = carrito.findIndex(element=>element.id===producto.id);
            carrito.splice(indice,1);
            mostrarCarrito();
        })
    })
}


mostrarCarrito();
tarjetasStock();