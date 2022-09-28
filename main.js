// array de stock de productos
const stock = [];

// array del carrito de compras (use or)
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//constantes
const h2 = document.getElementById("h2");
const stockProductos= document.getElementById("stock");
const compras = document.getElementById("compras");
const nomb = document.getElementById("nombre");
const email = document.getElementById("email");
const btnEnviar = document.getElementById("btnCargar");
const btnBorrar = document.getElementById("btnBorrar")
const checkbox = document.getElementById("checkbox");
const precioTotal = document.querySelector(".total");
const finalizar = document.getElementById("finalizar");
const cancelar = document.getElementById("cancelar");


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

// inicio de pedido de datos al cliente (use operador ternario)
let nombre;
let mail;
btnEnviar.addEventListener("click",()=> {
    nombre = nomb.value;
    mail = email.value;
    if(nombre != "" && mail != ""){
    h2.innerText= "Buenas " + nombre + " , a continuacion podra ver su compra";
    checkbox.checked ? setDatos("localStorage") : setDatos("sessionStorage");
    }else{
        Swal.fire({
            position: 'top-and',
            icon: 'error',
            title: 'Los campos estan vacios',
            showConfirmButton: false,
            timer: 1500
        })
    }
    });

btnBorrar.addEventListener("click",()=> {
    nomb.value="";
    email.value= "";
    localStorage.removeItem("cliente")
    sessionStorage.removeItem("user")
    h2.innerText= "Bienvenido";
});


//local inicio (use and)
function setDatos(valor) {
    let cliente = { nombre: nomb.value, mail: email.value };
    valor === "sessionStorage" && sessionStorage.setItem("user", JSON.stringify(cliente));
    if (valor === "localStorage") {
        localStorage.setItem("cliente", JSON.stringify(cliente));
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Su nombre y Email seran recordados!!!',
            showConfirmButton: false,
            timer: 1500
        })
    }
    return cliente;
    }

function getDatos(datos) {
    if (datos) {
    nomb.value = datos.nombre;
    email.value = datos.mail;
    }
}

getDatos(JSON.parse(localStorage.getItem("cliente")));


// tarjetas del stock (use destructuring)
function tarjetasStock () {
for (const producto of stock) {
    let {nombre, precio, id} = producto
    let prod = document.createElement('div')
    prod.innerHTML=`<div class="card">
    <h4>${nombre}</h4>
    <p> $ ${precio}</p>
    <button id="agregar${id}" class="btnAgregar">Agregar</button>
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

// mostrar el carrito de compras (use destructuring)
function mostrarCarrito(){
    compras.innerHTML = "";
for (const producto of carrito) {
    let {nombre, precio, id, cantidad} = producto
    let prodCarrito = document.createElement('div')
    prodCarrito.innerHTML=`<div class="card">
    <h4>${nombre}</h4>
    <p> $ ${precio*cantidad}</p>
    <h5>CANTIDAD: ${cantidad}</h5>
    <button class="btnCarrito btnBorrar" id="btn-borrar${id}">Borrar</button>
    </div>`
    compras.append(prodCarrito) 
}
localStorage.setItem("carrito", JSON.stringify(carrito))
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

//finalizar
function fin(){
    finalizar.addEventListener("click",()=>{
        localStorage.removeItem("carrito");
        for (let index = 0; index < carrito.length; index++) {
            carrito.splice(index,carrito.length);;
        }
        console.log("fin");
        console.log(carrito);
        mostrarCarrito();
    })
}

//cancelar
function cancel(){
    cancelar.addEventListener("click",()=>{
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Estas seguro que quieres cancelar tu compra?',
            text: "No podrás recuperar tu carrito",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, borrar!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
                'BORRADO!',
                'Su carrito fue vaciado.',
                'success'
            )
            localStorage.removeItem("carrito");
            for (let index = 0; index < carrito.length; index++) {
            carrito.splice(index,carrito.length);;
            }
            console.log(carrito);
            mostrarCarrito();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
                'CANCELADO',
                'Puede continuar su compra 🛒',
                'error'
                )
            }
        })
    })
}


mostrarCarrito();
tarjetasStock();
fin();
cancel();