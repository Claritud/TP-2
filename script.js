// local.ventas[ i ].componentes[ i ]

//1.1 precioMaquina(componentes): recibe un array de componentes y devuelve el precio de la máquina que se puede armar con esos componentes, que es la suma de los precios de cada componente incluido.

// const precioMaquina = (...cosas) => {
//     let suma = 0;  
//     for (const cosa of cosas){
//             let sumaParcial = 0;
//         for (const component of local.precios){  
//                sumaParcial += suma;      
//             if (component.componente === cosa[0]){
//                 suma = component.precio;
//             }           
//         }  
//     }    
//     return suma;
// }
// console.log(precioMaquina(["Monitor GPRS 3000", "Motherboard ASUS 1500"]) ); // 320 ($200 del monitor + $120 del motherboard)

const precioMaquina = (...components) => {
    
    const estaComponente = venta => venta.componentes.includes(component);
    return local.ventas.filter(estaComponente).price;
}

// const precioMaquina = (...cosas) => {
//     let losQueSi = [];
//     for (const cosa of cosas){
//      const componenteABuscar = component => component.componente === cosa[0];
//      losQueSi = local.precios.filter(componenteABuscar);
     
//     } 
//     const sumar =(total, price) => total += price;
//     return losQueSi.precio.reduce(sumar); // aca podria poner .precio antes de reduce y sacar el de arriba despues de el filter
// }
// console.log(precioMaquina(["Monitor GPRS 3000", "Motherboard ASUS 1500"]) ); // 320 ($200 del monitor + $120 del motherboard)

// const precioMaquina = (...cosas) => {
//     let losQueSi;
//     for (let i = 0; i < cosas.length; i++){
//      const componenteABuscar = component => component.componente === cosas[i];
//      losQueSi = local.precios.filter(componenteABuscar).precio;   
//     } 
//     const sumar =(total, price) => total += price;
//     return losQueSi.reduce(sumar); // aca podria poner .precio antes de reduce y sacar el de arriba despues de el filter
// }
// console.log(precioMaquina(["Monitor GPRS 3000", "Motherboard ASUS 1500"]) ); // 320 ($200 del monitor + $120 del motherboard)

//1.2 cantidadVentasComponente(componente): recibe un componente y devuelve la cantidad de veces que fue vendido, o sea que formó parte de una máquina que se vendió. La lista de ventas no se pasa por parámetro, se asume que está identificada por la variable ventas.

const cantidadVentasComponente = component => {
    
    const estaComponente = venta => venta.componentes.includes(component);
    return local.ventas.filter(estaComponente).length;
}
console.log(cantidadVentasComponente("Monitor ASC 543")); // 2

// 1.3 vendedoraDelMes(mes, anio), se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la vendedora que más vendió en plata en el mes. O sea no cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

// const vendedoraDelMes = (mes,anio) => {
//     //aca tiene qeu usar la primera funcion para sacar el precio de las maquinas que vendio. yo creo que aca lo que tiene que hacer es recorrer y ver si es el mes que correspronde comparar, tener variables para las vendeodras y si la venta es de ellas se les suma. como hicimos en los otros nombre y presios digamos y luego se compara entre ellas o las que es mayor (tiene que recorrer el array de vendedoras)
// }

// console.log( vendedoraDelMes(1, 2019) ); // "Ada" (vendio por $670, una máquina de $320 y otra de $350)



//1.4 ventasMes(mes, anio): Obtener las ventas de un mes. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

// console.log( ventasMes(1, 2019) ); // 1250

//1.5 ventasVendedora(nombre): Obtener las ventas totales realizadas por una vendedora sin límite de fecha.

const ventasVendedora = name => {

}
console.log( ventasVendedora("Grace") ); // 900

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
console.log( componenteMasVendido() ); // Monitor GPRS 3000

//1.7 huboVentas(mes, anio): que indica si hubo ventas en un mes determinado. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

// console.log( huboVentas(3, 2019) ); // false
