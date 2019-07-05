
//1.1 precioMaquina(componentes): recibe un array de componentes y devuelve el precio de la máquina que se puede armar con esos componentes, que es la suma de los precios de cada componente incluido.

const precioMaquina = componentes => {
    let sumaTotal = 0;
    for (const componente of componentes) {
        for (const comp of local.precios) {
            if (componente === comp.componente) {
                sumaTotal += comp.precio;
            }
        }
    }
    return sumaTotal;
}
console.log(`El precio de una maquina con estos componentes es: ${precioMaquina(["Monitor GPRS 3000", "Motherboard ASUS 1500"])}`);

//1.2 cantidadVentasComponente(componente): recibe un componente y devuelve la cantidad de veces que fue vendido, o sea que formó parte de una máquina que se vendió. La lista de ventas no se pasa por parámetro, se asume que está identificada por la variable ventas.

const cantidadVentasComponente = component => {
    const estaComponente = venta => venta.componentes.includes(component);
    return local.ventas.filter(estaComponente).length;
}
console.log(`Cantidad de ventas de este componente: ${cantidadVentasComponente("Monitor ASC 543")}`);

//1.3 vendedoraDelMes(mes, anio), se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la vendedora que más vendió en plata en el mes. O sea no cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const designadoDelMes = (parametrosGlobales, mes, anio) => {
    let masVendio = '';
    let ventaMasAltaParcial = 0;
    for (let parametro of parametrosGlobales) {
        let ventasActuales = 0;
        for (let venta of local.ventas) {
            if (venta.fecha.getMonth() + 1 === mes && venta.fecha.getFullYear() === anio) {
                ventasActuales += precioMaquina(venta.componentes)
                if (ventasActuales > ventaMasAltaParcial) {
                    ventaMasAltaParcial = ventasActuales;
                    masVendio = parametro;
                }
            }
        }
    }
    return masVendio;
}

const vendedoraDelMes = (mes, anio) => {
    return designadoDelMes(local.vendedoras, mes, anio);
}
console.log(`Vendedora del mes de enero: ${vendedoraDelMes(1, 2019)}`);

//1.4 ventasMes(mes, anio): Obtener las ventas de un mes. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const ventasMes = (mes, anio) => {
    let ventaTotal = 0;
    for (venta of local.ventas) {
        if (venta.fecha.getMonth() + 1 === mes && venta.fecha.getFullYear() === anio) {
            ventaTotal += precioMaquina(venta.componentes);
        }
    }
    return ventaTotal;
}
console.log(`Ventas del mes de enero: ${ventasMes(1, 2019)}`);

//1.5 ventasVendedora(nombre): Obtener las ventas totales realizadas por una vendedora sin límite de fecha.

const total = ventaDesignada => { // ver que pedo
    let sumaTotal = 0;
    ventaDesignada.forEach(comp => {
        sumaTotal += precioMaquina(comp.componentes)
    });
    return sumaTotal;
}

const ventasVendedora = name => {
    const vendedoras = local.ventas.filter(venta => venta.nombreVendedora === name);
    return total(vendedoras);
};
console.log(`Ventas totales de Grace: ${ventasVendedora("Grace")}`);

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
console.log(`Componente mas vendido: ${componenteMasVendido()}`);

//1.7 huboVentas(mes, anio): que indica si hubo ventas en un mes determinado. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const huboVentas = (mes, anio) => {
    let ventasHubo = false;
    for (venta of local.ventas) {
        let year = venta => venta.fecha.getFullYear() === anio;
        let month = venta => venta.fecha.getMonth() === mes - 1;
        if (year === true && month === true) {
            ventasHubo = true;
        }
    }
    return ventasHubo;
}
console.log(`Hubo ventas en el mes de marzo? ${huboVentas(3, 2019)}`);

//Vendedora mas ingresos, para utilizar en render

const vendedoraMasIngresos = () => {
    let venta = 0;
    let vendedoraConMasIngresos = '';
    for (vendedora of local.vendedoras) {
        let mayorVenta = ventasVendedora(vendedora);
        if (mayorVenta > venta) {
            venta = mayorVenta;
            vendedoraConMasIngresos = vendedora;
        }
    }
    return vendedoraConMasIngresos;
}

//2.1 En las ventas ya existentes, tenemos que agregar la propiedad sucursal con el valor Centro (ya que es la sucursal original).

for (venta of local.ventas) {
    venta.sucursal = 'Centro';
}

//2.2 Agregar al objeto principal la propiedad sucursales: ['Centro', 'Caballito']

local.sucursales = ['Centro', 'Caballito'];

// 2.3Cargar la siguiente información en el array ventas, creando sus respectivos objetos siguiendo el patrón: fecha, nombreVendedora, componentes, sucursal

local.ventas.push(
    {
        fecha: new Date(2019, 1, 12),
        nombreVendedora: "Hedy",
        componentes: ["Monitor GPRS 3000", "HDD Toyiva"],
        sucursal: "Centro"
    },
    {
        fecha: new Date(2019, 1, 24),
        nombreVendedora: "Sheryl",
        componentes: ["Motherboard ASUS 1500", "HDD Wezter Dishital"],
        sucursal: "Caballito"
    },
    {
        fecha: new Date(2019, 1, 1),
        nombreVendedora: "Ada",
        componentes: ["Motherboard MZI", "RAM Quinston Fury"],
        sucursal: "Centro"
    },
    {
        fecha: new Date(2019, 1, 11),
        nombreVendedora: "Grace",
        componentes: ["Monitor ASC 543", "RAM Quinston"],
        sucursal: "Caballito"
    },
    {
        fecha: new Date(2019, 1, 15),
        nombreVendedora: "Ada",
        componentes: ["Motherboard ASUS 1200", "RAM Quinston Fury"],
        sucursal: "Centro"
    },
    {
        fecha: new Date(2019, 1, 12),
        nombreVendedora: "Hedy",
        componentes: ["Motherboard ASUS 1500", "HDD Toyiva"],
        sucursal: "Caballito"
    },
    {
        fecha: new Date(2019, 1, 21),
        nombreVendedora: "Grace",
        componentes: ["Motherboard MZI", "RAM Quinston"],
        sucursal: "Centro"
    },
    {
        fecha: new Date(2019, 1, 8),
        nombreVendedora: "Sheryl",
        componentes: ["Monitor ASC 543", "HDD Wezter Dishital"],
        sucursal: "Centro"
    },
    {
        fecha: new Date(2019, 1, 16),
        nombreVendedora: "Sheryl",
        componentes: ["Monitor GPRS 3000", "RAM Quinston Fury"],
        sucursal: "Centro"
    },
    {
        fecha: new Date(2019, 1, 27),
        nombreVendedora: "Hedy",
        componentes: ["Motherboard ASUS 1200", "HDD Toyiva"],
        sucursal: "Caballito"
    },
    {
        fecha: new Date(2019, 1, 22),
        nombreVendedora: "Grace",
        componentes: ["Monitor ASC 543", "HDD Wezter Dishital"],
        sucursal: "Centro"
    },
    {
        fecha: new Date(2019, 1, 5),
        nombreVendedora: "Ada",
        componentes: ["Motherboard ASUS 1500", "RAM Quinston"],
        sucursal: "Centro"
    },
    {
        fecha: new Date(2019, 1, 1),
        nombreVendedora: "Grace",
        componentes: ["Motherboard MZI", "HDD Wezter Dishital"],
        sucursal: "Centro"
    },
    {
        fecha: new Date(2019, 1, 7),
        nombreVendedora: "Sheryl",
        componentes: ["Monitor GPRS 3000", "RAM Quinston"],
        sucursal: "Caballito"
    },
    {
        fecha: new Date(2019, 1, 14),
        nombreVendedora: "Ada",
        componentes: ["Motherboard ASUS 1200", "HDD Toyiva"],
        sucursal: "Centro"
    });


//2.4 Crear la función ventasSucursal(sucursal), que obtiene las ventas totales realizadas por una sucursal sin límite de fecha.

const ventasSucursal = sucursal => {
    const ventasPorSucursal = local.ventas.filter(venta => venta.sucursal === sucursal);
    return total(ventasPorSucursal);
}
console.log(`Ventas totales de la sucursal Centro: ${ventasSucursal("Centro")}`);

//2.5 Crear la función sucursalDelMes(mes, anio), que se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la sucursal que más vendió en plata en el mes. No cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const sucursalDelMes = (mes, anio) => {
    return designadoDelMes(local.sucursales, mes, anio);
}
console.log(`Sucursal del mes: ${sucursalDelMes(1, 2019)}`);

//3.1 renderPorMes(): Muestra una lista ordenada del importe total vendido por cada mes/año

const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

const renderPorMes = () => {
    let render = [];
    let yearBefore = '';
    for (venta of local.ventas) {
        let year = venta.fecha.getFullYear();
        if (year !== yearBefore) {
            for (i = 0; i <= meses.length; i++) {
                let renderMes = ventasMes(i, year);
                if (renderMes !== 0) {
                    render += `\n Total de ${meses[i - 1]}: ${ventasMes(i, year)}`;
                }
            }
        }
        yearBefore = year;
    }
    return render;
}
console.log(`Ventas por mes: ${renderPorMes()}`);

//3.2 renderPorSucursal(): Muestra una lista del importe total vendido por cada sucursal

const renderPorSucursal = () => {
    let renderSucursal = [];
    for (sucursal of local.sucursales) {
        let render = ventasSucursal(sucursal);
        if (render !== 0) {
            renderSucursal += `\n Total de ${sucursal}: ${ventasSucursal(sucursal)}`;
        }
    }
    return renderSucursal;
}
console.log(`Ventas por sucursal : ${renderPorSucursal()}`);

//3.3 render(): Tiene que mostrar la unión de los dos reportes anteriores, cual fue el producto más vendido y la vendedora que más ingresos generó

const render = () => {
    return `Reporte
 Ventas por mes: ${renderPorMes()} 
 Ventas por sucursal: ${renderPorSucursal()}
 Producto estrella: ${componenteMasVendido()}
 Vendedora que mas ingresos generó: ${vendedoraMasIngresos()}`;
}
console.log(render());

//FIN :)
