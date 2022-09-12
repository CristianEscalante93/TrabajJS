// array de stock de productos
const stock = [];

// array del carrito de compras
const carrito = [];

//constantes
const h2 = document.getElementById("h2");
const stockProductos= document.getElementById("stock");
const compras = document.getElementById("compras")

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
function NombreMail() {
    alert("Bienvenido a la mas variada tienda de iluminación")
    nombre = prompt("Ingrese su nombre");
    while(nombre === "" || !isNaN(nombre)){
    nombre = prompt("Ingrese su nombre");
    return}
    let mail = prompt("Ingrese su mail");
    while(mail === ""){
    mail = prompt("Ingrese su mail");
    }
    alert("Bienvenido " + nombre + " , espero encuentre lo que esta buscando");
    h2.innerText= "Buenas " + nombre + " , a continuacion podra ver su compra";
}

// eleccion de productos
let seguir = true;
let insumo;
function lamparas() {
    let precioTotal;
    while (seguir === true) {
        insumo = parseInt(prompt(("Elija su accesorio de iluminación : \n1)Colgante de 1 cuerpo\n2)Colgante de 2 cuerpos\n3)Lámpara vintage\n4)Lámpara moderna\n5)Solo portalámparas\n6)Finalizar pedido")));
        switch (insumo) {
            case 1:
                cargar(carrito, nuevoProducto1);
                alert('Selecciono' + ' ' + nuevoProducto1.nombre + ' ' + 'que cuesta $' + ' ' + nuevoProducto1.precio);
                break;
            case 2:
                cargar(carrito, nuevoProducto2);
                alert('Selecciono' + ' ' + nuevoProducto2.nombre + ' ' + 'que cuesta $' + ' ' + nuevoProducto2.precio);
                break;
            case 3:
                cargar(carrito, nuevoProducto3);
                alert('Selecciono' + ' ' + nuevoProducto3.nombre + ' ' + 'que cuesta $' + ' ' + nuevoProducto3.precio);
                break;
            case 4:
                cargar(carrito, nuevoProducto4);
                alert('Selecciono' + ' ' + nuevoProducto4.nombre + ' ' + 'que cuesta $' + ' ' + nuevoProducto4.precio);
                break;
            case 5:
                cargar(carrito, nuevoProducto5);
                alert('Selecciono' + ' ' + nuevoProducto5.nombre + ' ' + 'que cuesta $' + ' ' + nuevoProducto5.precio);
                break;
            case 6:
                seguir = false;
                alert('Usted ha finalizado la compra');
                break;
            default:
                alert('Opción no válida');
                break;}
                
            precioTotal = carrito.reduce((acc,el)=> acc + el.precio, 0 );
            
            }
            return precioTotal;
        }

// pago
function cobro(precio){
alert("Precio total de la compra: $"+precio);
let formaPago;
do{
    formaPago = parseInt(prompt("Como desea abonar?\n1)Efectivo\n2)Tarjeta"))
}while(formaPago < 1 || formaPago > 2)
let pago;
if (formaPago==1){
    pago = parseInt(prompt("con cuanto abona??"))
    if(pago>precio){
        alert("Muchas gracias, su cambio es " + (pago-precio))
    }else if(pago==precio){
        alert("Abono con cambio justo, por favor pase a retirar su compra, muchas gracias!!")
    }
}else if(formaPago==2){
    alert("Gracias por su compra, revise su mail donde encontrara el link de pago, muchas gracias!!")
}
}

// tarjetas del stock

for (const producto of stock) {
    let prod = document.createElement('div')
    prod.innerHTML=`<div class="card">
    <h3>${producto.nombre}</h3>
    <p>${producto.precio}</p>
    </div>`
    stockProductos.append(prod) 
}

NombreMail();
const resultado = lamparas();
console.log(resultado);
cobro(resultado);

// tarjetas de compras
for (const producto of carrito) {
    let prodCarrito = document.createElement('div')
    prodCarrito.innerHTML=`<div class="card">
    <h3>${producto.nombre}</h3>
    <p>${producto.precio}</p>
    </div>`
    compras.append(prodCarrito) 
}
/* <img src="../img/${servicio.img}" alt=""></img> */