
const stock = [];

const carrito = [];

class productoStock {
    constructor(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;}}

const nuevoProducto1 = new productoStock(1,"Colgante de 1 cuerpo",1500);
const nuevoProducto2 = new productoStock(2,"Colgante de 2 cuerpos",2000);
const nuevoProducto3 = new productoStock(3,"Lámpara vintage",1000);
const nuevoProducto4 = new productoStock(4,"Lámpara moderna",2500);
const nuevoProducto5 = new productoStock(5,"Solo portalamparas",500);

function cargar(array,objeto){
    array.push(objeto);
}

cargar(stock,nuevoProducto1)
cargar(stock,nuevoProducto2)
cargar(stock,nuevoProducto3)
cargar(stock,nuevoProducto4)
cargar(stock,nuevoProducto5)


function NombreMail() {
    alert("Bienvenido a la mas variada tienda de iluminación")
    let nombre = prompt("Ingrese su nombre");
    while(nombre === ""){
    nombre = prompt("Ingrese su nombre");
    }
    let mail = prompt("Ingrese su mail");
    while(mail === ""){
    mail = prompt("Ingrese su mail");
    }
    alert("Bienvenido " + nombre + " , espero encuentre lo que esta buscando")
}

function lamparas(){
let producto;
do{
producto = parseInt(prompt("Elija su accesorio de iluminación : \n1)Colgante de 1 cuerpo\n2)Colgante de 2 cuerpos\n3)Lámpara vintage\n4)Lámpara moderna\n5)Solo portalámparas"))}while(producto < 1 || producto > 5)

switch(producto){
    case 1:
        return nuevoProducto1.nombre;
    case 2:
        return nuevoProducto2.nombre;
    case 3:
        return nuevoProducto3.nombre;
    case 4:
        return nuevoProducto4.nombre;
    case 5:
        return nuevoProducto5.nombre;
}}

function filtroProducto(array,prod){
const filtro= array.filter((elemento)=>{return elemento.nombre.includes(prod)});
return filtro;
}

function Precio(producto){
    let precioProd= producto[0].precio
    return precioProd
    }

function cobro(array,precio){
alert("Su eleccion fue: "+array[0].nombre+"\nPrecio: $"+precio);
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


NombreMail();
let tipoLampara = lamparas();
let eleccion = filtroProducto(stock, tipoLampara)
let precio = Precio(eleccion);
cobro(eleccion,precio);

