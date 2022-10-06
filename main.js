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
const cuotas = document.querySelector('#cuotas');
const formaPago = document.querySelector('#formaPago');
const formCuota = document.querySelector('.form-cuota');
const divCuota = document.querySelector('.divCuotas');
const tipoDePago = document.querySelector('.tipoDePago');

// funcion agregar para cualquier array
function cargar(array,objeto){
    array.push(objeto);
}

async function fetchAPI(){
    try {
    const URL='./data.json';
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
for (const producto of data) {
    cargar(stock,producto)
}
tarjetasStock();
    } catch (error) {
    console.log(error);
    }
}

fetchAPI()

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
    let {nombre, precio, id, img} = producto
    let prod = document.createElement('div')
    prod.innerHTML=`<div class="card card1 mb-3 sombra" style="max-width: 540px;">
    <div class="row g-0">
        <div class="col-md-4">
        <img src="./../imagenes/${img}" class="img-fluid rounded-start cardImage1" alt="...">
    </div>
    <div class="col-md-8 ">
        <div class="card-body h-100 cardContent">
            <h5 class="card-title">${nombre}</h5>
            <h4 class="card-text"> $ ${precio}</h4>
            <button id="agregar${id}" class="btnAgregar w-80">Agregar</button>
        </div>
    </div>
    </div>
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
let precioTot;
function mostrarCarrito(){
    compras.innerHTML = "";
for (const producto of carrito) {
    let {nombre, precio, id, img, cantidad} = producto
    let prodCarrito = document.createElement('div')

    prodCarrito.innerHTML=`<div class="card card1 mb-3 sombra" style="max-width: 540px;">
    <div class="row g-0">
        <div class="col-md-4">
        <img src="../imagenes/${img}" class="img-fluid rounded-start " alt="...">
    </div>
    <div class="col-md-8 ">
        <div class="card-body h-100 cardContent">
            <h5 class="card-title">${nombre}</h5>
            <p class="card-text"> $ ${precio*cantidad}</p>
            <h5>CANTIDAD: ${cantidad}</h5>
            <button class="btnCarrito btnBorrar" id="btn-borrar${id}">Borrar</button>
        </div>
    </div>
    </div>
    </div>`
    compras.append(prodCarrito) 
}
localStorage.setItem("carrito", JSON.stringify(carrito))
borrar();
// let precioTot;
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
        
        Swal.fire({
            icon: 'success',
            title: 'Compra exitosa!!!',
            text: 'Su compra finalizo correctamente, esperamos volver a verlo pronto muchas gracias por su visita 😀',
        })

        localStorage.removeItem("carrito");
        for (let index = 0; index < carrito.length; index++) {
            carrito.splice(index,carrito.length);;
        }
        console.log("fin");
        console.log(carrito);
        mostrarCarrito();
    })
}

fin();

//forma de pago con evento change
let pagar;
let totalPagar;
let valorCuota;
formaPago.addEventListener('change', () => {
    pagar = formaPago.value.toLowerCase()
    seleccionPago();
});

//funcion para seleccionar forma de pago
const seleccionPago = () => {
    if (pagar === 'debito' || pagar === 'transferencia') {
        divCuota.classList.add('oculta')
        finalizar.classList.remove('oculta')
        totalPagar = precioTot * 0.85;
        //mensaje libreria pago realizado con exito
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Realizó su pago con exito',
            color: 'rgb(156, 19, 138)',
            text: `Usted eligió la forma de pago ${pagar} con un descuento del 15%, su compra total es de $ ${totalPagar} Final`,
            showConfirmButton: false,
            timer: 4500
        })
        tipoDePago.innerText=`Usted eligió la forma de pago ${pagar} con un descuento del 15%, su compra total es de $ ${totalPagar} Final`;
    } else {
        divCuota.classList.remove('oculta')
        totalPagar = precioTot;
        //evento change para elegir cuotas
        cuotas.addEventListener('change', () => {
            valorCuota = cuotas.value.toLowerCase();
            console.log(valorCuota);
            seleccionCuotas();
            //mensaje libreria pago realizado con exito
            Swal.fire({
                position: 'center',
                icon: 'success',
                color: 'rgb(156, 19, 138)',
                text: `Usted eligió la forma de pago ${pagar} en cantidad de cuotas, ${valorCuota}, monto de cuota a pagar ${parseInt(totalCuota)} Final`,
                showConfirmButton: false,
                timer: 5500
            })
            tipoDePago.innerText=`Usted eligió la forma de pago ${pagar} en cantidad de cuotas, ${valorCuota} , monto de cuota a pagar $ ${parseInt(totalCuota)} Final`;
        })
    }
}

//funcion para seleccionar cuotas
const seleccionCuotas = () => {
    if (valorCuota === 'una') {
        totalCuota = totalPagar / 1;
    } else if (valorCuota === 'tres') {
        totalCuota = (totalPagar * 1.25) / 3;
    } else {
        totalCuota = (totalPagar * 1.40) / 6;
    }
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
cancel();