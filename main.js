


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
/* producto < 1 || producto > 3 */
switch(producto){
    case 1:
        return "Colgante de 1 cuerpo";
    case 2:
        return "Colgante de 2 cuerpos";
    case 3:
        return "Lámpara vintage";
    case 4:
        return "Lámpara moderna";
    case 5:
        return "Solo portalámparas";
}

}

function Precio(producto){
    if(producto==="Colgante de 1 cuerpo"){
        return 1500;
    }
    else if(producto==="Colgante de 2 cuerpos"){
        return 2000;
    }
    else if(producto==="Lámpara vintage"){
        return 1000;
    }
    else if(producto==="Lámpara moderna"){
        return 2500;
    }
    else if(producto==="Solo portalámparas"){
        return 500;
    }
}

function cobro(lampara,precio){
alert("Su eleccion fue: "+lampara+"\nPrecio: $"+precio);
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
let precio = Precio(tipoLampara);
cobro(tipoLampara,precio);
