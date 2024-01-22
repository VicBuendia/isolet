import PocketBase from 'pocketbase';

const pb = new PocketBase('https://isolet.pockethost.io');


export async function getCitas(){
    const records = await pb.collection('cita').getFullList({
        sort: '-created',
        expand: 'cliente'
    });

    return records
    
}

export async function getClientes(){
    const records = await pb.collection('cliente').getFullList({
        sort: '-created',
    });

    return records
    
}

export async function getEmpleados(){
    const records = await pb.collection('empleado').getFullList({
        sort: '-created',
    });

    return records
    
}

export async function getServicios(){
    const records = await pb.collection('servicio').getFullList({
        sort: '-created',
    });

    return records
    
}

export async function postCita(data){

    const record = await pb.collection('cita').create(data);

}

export async function postClientes(data){

    const record = await pb.collection('cliente').create(data);

}

export async function postEmpleados(data){

    const record = await pb.collection('empleado').create(data);

}

export async function postServicios(data){

    const record = await pb.collection('servicio').create(data);

}

export async function getCita(id){
    const record = await pb.collection('cita').getFirstListItem(`id="${id}"`, 
    {
        expand:'cliente, servicios'

    });
    return record
}


export async function deleteCita(id){
    await pb.collection('cita').delete(id);
}

export async function updateCita(id, data){
    const record = await pb.collection('cita').update(id, data);
    
}


export async function getCliente(id){
    const record = await pb.collection('cliente').getFirstListItem(`id="${id}"`);
    return record
}


export async function deleteCliente(id){
    await pb.collection('cliente').delete(id);
}

export async function updateCliente(id, data){
    const record = await pb.collection('cliente').update(id, data);
    
}


export async function getEmpleado(id){
    const record = await pb.collection('empleado').getFirstListItem(`id="${id}"`);
    return record
}



export async function deleteEmpleado(id){
    await pb.collection('empleado').delete(id);
}

export async function updateEmpleado(id, data){
    const record = await pb.collection('empleado').update(id, data);
    
}


export async function getServicio(id){
    const record = await pb.collection('servicio').getFirstListItem(`id="${id}"`);
    return record
}



export async function deleteServicio(id){
    await pb.collection('servicio').delete(id);
}

export async function updateServicio(id, data){
    const record = await pb.collection('servicio').update(id, data);
    
}