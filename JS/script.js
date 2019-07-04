// local.ventas[ i ].componentes[ i ]

//1.1 precioMaquina(componentes): recibe un array de componentes y devuelve el precio de la máquina que se puede armar con esos componentes, que es la suma de los precios de cada componente incluido.

const precioMaquina = componentes => { // porque se rompe si pongo los parentesis y...????
    let sumaTotal = 0;
    for (const componente of componentes) {
        for (const comp of local.precios) {
            if (componente === comp.componente) {
                sumaTotal += comp.precio;
            }
        } // ver si puedo hacer una funcion aca
    }
    return sumaTotal;
}

console.log(`El precio de una maquina que poseea estos componentes es: ${precioMaquina(["Monitor GPRS 3000", "Motherboard ASUS 1500"])}`); // 320 ($200 del monitor + $120 del motherboard)

//1.2 cantidadVentasComponente(componente): recibe un componente y devuelve la cantidad de veces que fue vendido, o sea que formó parte de una máquina que se vendió. La lista de ventas no se pasa por parámetro, se asume que está identificada por la variable ventas.

const cantidadVentasComponente = component => {
    const estaComponente = venta => venta.componentes.includes(component);
    return local.ventas.filter(estaComponente).length;
}
console.log(`Cantidad de ventas de este componente: ${cantidadVentasComponente("Monitor ASC 543")}`); // 2

// 1.3 vendedoraDelMes(mes, anio), se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la vendedora que más vendió en plata en el mes. O sea no cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const vendedoraDelMes = (mes, anio) => {
    let vendedoraQueVendioMas = '';
    let ventaMasAltaParcial = 0;   
    for (let vendedora of local.vendedoras){
        let ventasActuales = 0;
        for (let venta of local.ventas){
             if (venta.fecha.getMonth()+1 === mes && venta.fecha.getFullYear() === anio) {
            ventasActuales += precioMaquina(venta.componentes)
                    
                if (ventasActuales > ventaMasAltaParcial){
                    ventaMasAltaParcial = ventasActuales;
                    vendedoraQueVendioMas = vendedora;
                }   

            }
     
        }
    }
    
    return vendedoraQueVendioMas;
}
console.log(`Vendedora del mes: ${vendedoraDelMes(1, 2019)}`); // "Ada" (vendio por $670, una máquina de $320 y otra de $350)

//1.4 ventasMes(mes, anio): Obtener las ventas de un mes. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const ventasMes = (mes, anio) => { 
    let ventaTotal = 0;
    for (venta of local.ventas){
        if (venta.fecha.getMonth()+1 === mes && venta.fecha.getFullYear() === anio){
            ventaTotal += precioMaquina(venta.componentes);
        } 
    }
    return ventaTotal;
}
console.log(`Ventas del mes: ${ventasMes(1, 2019)}`); // 1250

//1.5 ventasVendedora(nombre): Obtener las ventas totales realizadas por una vendedora sin límite de fecha.

const ventasVendedora = name => {
    let ventaTotal = 0;
    for (venta of local.ventas){
        if (venta.nombreVendedora === name){
            ventaTotal += precioMaquina(venta.componentes);       
        } 
    }
    return ventaTotal;
}

console.log(`Ventas totales de Grace: ${ventasVendedora("Grace")}`); // 900

//1.6 componenteMasVendido(): Devuelve el nombre del componente que más ventas tuvo historicamente. El dato de la cantidad de ventas es el que indica la función cantidadVentasComponente

const componenteMasVendido = () => {
    let mayorVenta = '';
    let anterior = 0;
    for (let i = 0; i < local.precios.length; i++) {
        let ventasComponente = cantidadVentasComponente(local.precios[i].componente);
        if (anterior < ventasComponente) {
            anterior = ventasComponente;
            mayorVenta = local.precios[i].componente;
        }
    }
    return mayorVenta;
}
console.log(`Componente mas vendido: ${componenteMasVendido()}`); // Monitor GPRS 3000

//1.7 huboVentas(mes, anio): que indica si hubo ventas en un mes determinado. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const huboVentas = (mes, anio) => {
    let ventasHubo = false; 
    for (venta of local.ventas) {
        let year = venta => venta.fecha.getFullYear() === anio;
        let month = venta => venta.fecha.getMonth() === mes-1;
        if (year === true  && month === true) {
            ventasHubo = true;
        }
    }
    return ventasHubo;
}
console.log(`Hubo ventas en el mes de marzo? ${huboVentas(3, 2019)}`); // false

const vendedoraMasIngresos = () => {
    let venta = 0;
    let vendedoraConMasIngresos = '';
    for(vendedora of local.vendedoras){
        let mayorVenta = ventasVendedora(vendedora);
        if (mayorVenta > venta){
            venta = mayorVenta;
            vendedoraConMasIngresos = vendedora;
        }
    }
    return vendedoraConMasIngresos;
}
console.log(vendedoraMasIngresos());


// Para tener una mejor muestra de como está resultando el local, queremos desarrollar un reporte que nos muestre las ventas por sucursal y por mes. Para esto, necesitamos crear las siguientes funciones:

// renderPorMes(): Muestra una lista ordenada del importe total vendido por cada mes/año
const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

const renderPorMes = () => {
    let render = [];
    for (i = 0; i <= meses.length; i++) {
         let renderMes = ventasMes(i, 2019);
         if (renderMes !== 0){
             render += ` Total de ${meses[i - 1]}: ${ventasMes(i, 2019)}`;
         } // aca ver para que quede uno abajo de otro
    }
    return render;
}
console.log( `Ventas por mes: ${renderPorMes()}`);
// aca seguramente hay que hacer un map /////////////////////////

// // Ventas por mes:
//   Total de enero 2019: 1250
//   Total de febrero 2019: 4210

// renderPorSucursal(): Muestra una lista del importe total vendido por cada sucursal
// const renderPorSucursal = () => {
//     let renderSucursal = [];
//     for (sucursal of local.sucursales) {
//          let render = ventasSucursal(sucursal, 2019);
//          if (render !== 0){
//              renderSucursal += `Total de ${sucursal}: ${ventasSucursal(i, 2019)}`;
//          }
//     }
//     return renderSucursal;    
// }
// console.log( `Ventas por sucursal : ${renderPorSucursal()}`);


// aca no puedo probarlo porque no esta la funcion 
// // Ventas por sucursal:
// //   Total de Centro: 4195
// //   Total de Caballito: 1265

// render(): Tiene que mostrar la unión de los dos reportes anteriores, cual fue el producto más vendido y la vendedora que más ingresos generó

// const render = () => // // ACA VER SI LE PONGO LAS LLAVES O NO
//     `Reporte
//     renderPorMes();
//     renderPorSucursal();
//     Producto estrella: ${componenteMasVendido()}
//     Vendedora que mas ingresos generó: ${vendedoraMasIngresos()}`;

// console.log(render());


// // Reporte
// // Ventas por mes:
// //   Total de enero 2019: 1250
// //   Total de febrero 2019: 4210
// // Ventas por sucursal:
// //   Total de Centro: 4195
// //   Total de Caballito: 1265
// // Producto estrella: Monitor GPRS 3000
// // Vendedora que más ingresos generó: Grace



