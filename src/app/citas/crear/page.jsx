//FORMULARIO PARA EL POST DE CLIENTES

"use client"
import { postClientes } from "@/db/Pocketbase";
import { getCita, deleteCita, updateCita, getServicios, postCita, getClientes  } from "@/db/Pocketbase";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";



export default function CitaPage({params}){

    const[isLoaded, setIsLoaded] = useState(false)

    const[cita, setCita] = useState() //
    const[servicios, setServicios] = useState([])
    const[clientes, setClientes] = useState([])
    const[nuevosServicios, setnuevosServicios] = useState([])
    const[miServicios, setMiServicios] = useState([])

    const router = useRouter() 
    /*
    const cargarCita = async () => {
      const data = await getCita(params.id);
      console.log(data.expand.servicios)
      setCita(data) //
      setFormData({
        fecha: data.fecha,
        hora_i: data.hora_i,
        hora_f: data.hora_f,
        cliente: data.cliente,
        servicios: data.servicios
      })
    }*/

    const cargarServicios = async () => {
        const datos = await getServicios();
        console.log(datos)
        setServicios(datos)
      }
      const cargarClientes = async () => {
        const datos = await getClientes();
        console.log(datos)
        setClientes(datos)
      }
  
    const [formData, setFormData] = useState({
        fecha: '',
        hora_i: '',
        hora_f: '',
        cliente: '',
        servicios: []
    });

    const [seleccion, setSeleccion] = useState()

    const [seleccionCliente, setSeleccionCliente] = useState()

        // Handle input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
        ...formData,
        [name]: value
        });
    };
        
    const handleSubmit = (event) => {
        event.preventDefault()
        // Creo un nuevo arreglo que solo contenga los id's de los
        // objetos en nuevosServicios.
        var arregloDeIds = nuevosServicios.map(function(objeto) {
            return objeto.id;
        });
        
        // Actualizo el array de servicios en formData.
        formData.servicios = [...formData.servicios, ...arregloDeIds]
        formData.cliente = seleccionCliente.id
        console.log(formData)
        postCita(formData)
        router.push("/citas")
    }

    useEffect(()=>{
      //cargarCita()
      cargarServicios()
      cargarClientes()
      setIsLoaded(true)
      
    }, [])
    
    //Regresa a la pagina anterior
    async function handleDelete(id){
        await deleteCita(id)
        router.push("/citas")

    }

    // Cada que se cambia la seleccion del SELECT, actualizamos el estado (o variable) "seleccion".
    // Solamente se ejecuta cuando cambiamos de opción, o sea, no añadiremos nada a la lista, aún.
    const handleSelectChange = async (event) => {
        // Obtenemos los datos del option.
        const id = event.target.value
        // Obtenemos el data-info, que es una segunda propiedad del option.
        // La forma de obtenerla es bastante esotérica, así que no le hagas mucho caso
        // solo di que sí Ahuhuhu.
        const nombre = event.target.options[event.target.selectedIndex].dataset.info

        console.log(id)
        console.log(event.target.options[event.target.selectedIndex].dataset.info)

        // Actualizamos la variable selection.
        // La actualizamos con un objeto que contiene el id y el nombre del servicio.
        setSeleccion({id, nombre})
    }

    const handleSelectChangeCliente = async (event) => {
        // Obtenemos los datos del option.
        const id = event.target.value
        // Obtenemos el data-info, que es una segunda propiedad del option.
        // La forma de obtenerla es bastante esotérica, así que no le hagas mucho caso
        // solo di que sí Ahuhuhu.
        const nombre = event.target.options[event.target.selectedIndex].dataset.info

        console.log(id)
        console.log(event.target.options[event.target.selectedIndex].dataset.info)

        // Actualizamos la variable selection.
        // La actualizamos con un objeto que contiene el id y el nombre del servicio.
        setSeleccionCliente({id, nombre})
    }

    // Aquí sí añadimos la selección a la lista de nuevosServicios.
    function actualizarLista(){
        console.log(seleccion)
        // La forma funcional de hacerlo, tomamos lo que hay en nuevosServicios
        // y le concatenamos la selección.
        setnuevosServicios([...nuevosServicios, seleccion])
        console.log(nuevosServicios)

    }

    function borrarLista(nombre){
        console.log(nombre)
        const nuevoArreglo = nuevosServicios.filter(objeto => objeto.nombre !== nombre);
        setnuevosServicios(nuevoArreglo);
    }

    /*async function eliminarServicio(id){
        console.log(id)

        const nuevoArreglo = formData.servicios.filter((el) => el !== id);
        formData.servicios = nuevoArreglo
        console.log(formData)

        await updateCita(params.id, formData)
        location.reload();
    }*/

    // Aquí se manda añaden todos los nuevosServicios al formData, que es lo que
    // se manda a la base de datos.
    async function AgregarServicios (){ //No se usa aqui
        // Creo un nuevo arreglo que solo contenga los id's de los
        // objetos en nuevosServicios.
        var arregloDeIds = nuevosServicios.map(function(objeto) {
            return objeto.id;
        });
        
        // Actualizo el array de servicios en formData.
        formData.servicios = [...formData.servicios, ...arregloDeIds]
        
        // Mando a llamar a la base de datos, y actualizo con los nuevos datos.
        await updateCita(params.id, formData)
        location.reload();
    }

    return(
    <div className='p-20'>
        <div className="flex flex-col justify-between lg:flex-row">
            <div>
                {params.id}
                <button onClick={()=>handleDelete(params.id)}>Borrar</button>
            </div>
            <div className="flex flex-col">
                <h1>Crear cita</h1>
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label className="font-bold">Nombre:</label>
                        {cita?.expand.cliente?.nombre} {cita?.expand.cliente?.apellido_p} {cita?.expand.cliente?.apellido_m}

                        <select defaultValue={'DEFAULT'} onChange={handleSelectChangeCliente} className="border p-3 rounded-xl">
                            <option className="text-zinc-500" value="DEFAULT" disabled>Seleccione un cliente ...</option>
                            {clientes.map((cli)=> (
                                <option key={cli.id} value={cli.id} data-info={cli.nombre}>{cli.nombre} {cli.apellido_p} {cli.apellido_m}</option>
                            ))}
                        </select>

                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-bold">Fecha:</label>
                        <input type="text" name="fecha" value={formData.fecha.substring(0,10)} onChange={handleInputChange}
                        className="border rounded-xl p-3" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-bold">Hora Inicio:</label>
                        <input type="text" name="hora_i" value={formData.hora_i} onChange={handleInputChange}
                        className="border rounded-xl p-3" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-bold">Hora Fin:</label>
                        <input type="text" name="hora_f" value={formData.hora_f} onChange={handleInputChange}
                        className="border rounded-xl p-3" />
                    </div>
                    {//<button type="submit" className="border rounded-xl p-2 bg-zinc-800 text-white">Actualizar Hora</button>
                    }
                </form>
                <div>
                    <div className="flex flex-col my-5">
                        <p className="font-bold mb-3">Servicios:</p>
                        <div className="flex flex-col gap-3">
                            {/*cita?.expand.servicios?.map((servicio)=>(
                                <div key={servicio.id} className="flex justify-between border p-3 rounded-xl">
                                    <p>{servicio.nombre}</p>
                                    <button onClick={() => eliminarServicio(servicio.id)}
                                    className="font-bold text-red-500">Eliminar</button>
                                </div>
                            ))*/}
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        {//<p className="mt-5 font-bold">Servcios a añadir:</p>
                        }
                        {nuevosServicios?.map((item) => (
                            <div className="flex justify-between p-3 border rounded-xl">
                                <p>{item.nombre}</p>
                                <button className="font-bold text-red-500"
                                onClick={()=>borrarLista(item.nombre)}>Eliminar </button>
                                
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-5 mt-9">
                        <select defaultValue={'DEFAULT'} onChange={handleSelectChange} className="border p-3 rounded-xl">
                            <option className="text-zinc-500" value="DEFAULT" disabled>Seleccione un servicio ...</option>
                            {servicios.map((serv)=> (
                                <option key={serv.id} value={serv.id} data-info={serv.nombre}>{serv.nombre}</option>
                            ))}
                        </select>
                        <button onClick={actualizarLista} className="bg-zinc-800 p-3 rounded-xl text-white">Añadir</button>
                    </div>
                    
                    <button onClick={handleSubmit} className="mt-5 border w-full rounded-xl p-2 bg-zinc-800 text-white">Crear Cita</button>
                </div>
            </div>
        </div>
    </div>
    )
}