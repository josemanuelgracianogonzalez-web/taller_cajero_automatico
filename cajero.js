
//function de registro
function registro() {
    // pedir nombrre
let nombre = prompt("Ingrese su nombre");
// revisar que el nombre no este vacio
while (nombre === "" || nombre === null) {
    console.log("El nombre no puede estar vacío");
    nombre = prompt("Ingrese su nombre");
}


// pedir clave
let clave = prompt("Ingrese su clave");
//revisar que la clave no este vacia
while (clave === "" || clave === null) {
    console.log("La clave no puede estar vacía");
    clave = prompt("Ingrese su clave");
}


     // pedir saldo inicial
    let saldoInicial = parseFloat(prompt("Ingrese su saldo inicial"));
     // revisar que el saldo sea un numero y no sea negativo
    while (isNaN(saldoInicial) || saldoInicial < 0) {
        console.log("Ingrese un saldo válido");
        saldoInicial = parseFloat(prompt("Ingrese su saldo inicial"));
    }

    // mostrar los datos que se ingresaron

    console.log("Ingrese su nombre: " + nombre);
    console.log("Ingrese su clave: " + clave);
    console.log("Ingrese su saldo inicial: " + saldoInicial);

     // crear los datos del usuario

    let usuario = {
        nombre: nombre,
        clave: clave,
        saldo: saldoInicial,
        movimientos: []
    };  

    // guardar los datos del usuario
    localStorage.setItem("usuario", JSON.stringify(usuario));
    // mostrar que el registro termino correctamente
    console.log("Usuario registrado de forma correcta");
}


// funcion para iniciar sesion

function iniciarSesion() {

    // buscar los datos del usuario guardado

    let usuarioGuard = localStorage.getItem("usuario");
    
    //revisar si hay un usuario guardado

if (usuarioGuard === null) {
    console.log("No hay ningún usuario registrado.");
    return;
}

    // convertir los datos guardados para poder usarlos

     let usuariopar = JSON.parse(usuarioGuard);

     // comenzar los intentos desde cero

        let intentos = 0;

        // permitir hasta tres intentos

    while (intentos < 3) {
 
         // pedir el nombre y la clave

        let nombreIngresado = prompt("Ingrese su nombre");
        let claveIngresada = prompt("Ingrese su clave");

         // revisar si los datos son iguales a los registrados

        if (nombreIngresado === usuariopar.nombre && claveIngresada === usuariopar.clave) {

         // mostrar que el inicio de sesion fue correcto

            console.log("Inicio de sesión exitoso");

            // entrar al menu del cajero

            menuCajero(usuariopar);
            break;
           
            // salir del ciclo de intentos


        } else {

            // sumar un intento cuando los datos son incorrectos
            intentos++;
            // mostrar que los datos no coinciden
            console.log("Usuario o clave incorrectos");
            // mostrar cuantos intentos lleva
            console.log("Intentos utilizados: " + intentos);
        }
    }

         // revisar si se gastaron los tres intentos

    if (intentos === 3) {
        console.log("Usuario bloqueado. Superó los 3 intentos.");
    }
}  

         // funcion para mostrar el menu del cajero

function menuCajero(usuariopar) {

     // crear una variable para guardar la opcion
    let opcionMenu;

     // repetir el menu hasta que se elija la opcion 5
    while (opcionMenu !== "5") {
        // mostrar el menu y pedir una opcion
        opcionMenu = prompt(`
            ===== MI PLATA =====
            1. Retirar plata
            2. Consultar saldo
            3. Consignar dinero
            4. Consultar movimientos
            5. Salir
        `);

        // revisar la opcion que eligio el usuario 
    switch (opcionMenu) {
        // opcion para retirar dinero
        case "1":
            // pedir el valor que se quiere retirar
            let retiro = parseFloat(prompt("Ingrese el valor a retirar"));

        // revisar que el valor sea correcto y que haya suficiente saldo
    if (!isNaN(retiro) && retiro > 0 && retiro <= usuariopar.saldo) {
        // quitar el dinero del saldo
        usuariopar.saldo = usuariopar.saldo - retiro;

        // guardar el retiro en los movimientos
         usuariopar.movimientos.push({
            tipo: "Retiro",
            valor: retiro,
            fecha: new Date()
        });

         // mostrar que el retiro fue correcto
        console.log("Retiro exitoso");
         // mostrar el nuevo saldo
        console.log("Su nuevo saldo es: " + usuariopar.saldo);
         // guardar los nuevos datos
        localStorage.setItem("usuario", JSON.stringify(usuariopar));




    } else {
        // mostrar un mensaje si el retiro no es posible
        console.log("Valor inválido o saldo insuficiente");
    }
            break;

         // opcion para consultar el saldo
        case "2":
            console.log("Su saldo es: " + usuariopar.saldo);
            // mostrar el saldo actual
            break;

         // opcion para consignar dinero
         case "3":
            // pedir el valor que se quiere consignar
            let consignacion = parseFloat(prompt("Ingrese el valor a consignar"));
            // revisar que el valor sea mayor que cero
    if (!isNaN(consignacion) && consignacion > 0) {
         // sumar el dinero al saldo
        usuariopar.saldo = usuariopar.saldo + consignacion;
         // mostrar que la consignacion fue correcta
        console.log("Consignación exitosa");
        // mostrar el nuevo saldo
        console.log("Su nuevo saldo es: " + usuariopar.saldo);
        // guardar la consignacion en los movimientos
        usuariopar.movimientos.push({
             tipo: "Consignación",
            valor: consignacion,
             fecha: new Date()
});

        // guardar los nuevos datos
        localStorage.setItem("usuario", JSON.stringify(usuariopar));
    } else {
        // mostrar un mensaje si el valor no es correcto
        console.log("El valor debe ser mayor que 0");
    }
            break;

            // opcion para consultar los movimientos
            case "4":

            // revisar si hay movimientos guardados
            if (usuariopar.movimientos.length === 0) {
            // mostrar que no hay movimientos
        console.log("No hay movimientos registrados");
    } else {
        // recorrer todos los movimientos
        for (let i = 0; i < usuariopar.movimientos.length; i++) {
            // mostrar el numero del movimiento
            console.log("Movimiento " + (i + 1));
            // mostrar el tipo de movimiento
            console.log("Tipo: " + usuariopar.movimientos[i].tipo);
            // mostrar el valor del movimiento
            console.log("Valor: " + usuariopar.movimientos[i].valor);
            // mostrar la fecha del movimiento
            console.log("Fecha: " + usuariopar.movimientos[i].fecha);
        }
    }
            break;

             //opcion para salir del cajero
            case "5":
             //  mensaje de salida
            console.log("Salir del cajero");
            break;

             // si se escribe una opcion diferente
        default:
            // mostrar que la opcion no existe
            console.log("Opción no válida");
            break;


        }
    }
               
}

//SWITCH DE PRUEBA PARA EL MENU DEL CAJERO AUTOMATICO REPETITIVO
// menu principal de mi plata
let opcion = prompt(`
    ===== MI PLATA =====

    1. Iniciar sesión
    2. Registrar usuario
    3. Salir

    Seleccione una opción:
`);

// revisar la opcion elegida
switch (opcion) {
// inicio de sesion
    case "1":
        iniciarSesion();
        break;
//registrar de usuario
    case "2":
        registro();
        break;
//salir del cajero
    case "3":
        console.log("Gracias por utilizar Mi Plata");
        break;
//opcion no existe
    default:
        console.log("Opción no válida");
        break;
}  




