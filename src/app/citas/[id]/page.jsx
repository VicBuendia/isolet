//PÁGINA CLIENTE INDIVIDUAL, HACE EL DELETE Y PUT

"use client"
import { postClientes } from "@/db/Pocketbase";
import { getCita, deleteCita, updateCita, getServicios  } from "@/db/Pocketbase";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";


export default function CitaPage({params}){
    const[isLoaded, setIsLoaded] = useState(false)

    const[cita, setCita] = useState() //
    const[servicios, setServicios] = useState([])
    const[miServicios, setMiServicios] = useState([])
    const router = useRouter() 
  
    const cargarCita = async () => {
      const data = await getCita(params.id);
      console.log(data)
      setCita(data) //
      setMiServicios(data.servicios)
      setFormData({
        fecha: data.fecha,
        hora_i: data.hora_i,
        hora_f: data.hora_f,
        cliente: data.cliente,
        servicios: data.servicios
      })
    }

    const cargarServicios = async () => {
        const datos = await getServicios();
        console.log(datos)
        setServicios(datos) //
      }
  


    const [formData, setFormData] = useState({
        fecha: '',
        hora_i: '',
        hora_f: '',
        cliente: '',
        servicios: []
    });

    const [seleccion, setSeleccion] = useState()

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
        console.log(formData)
        updateCita(params.id,formData)
        router.push("/citas")
    }

    useEffect(()=>{ //
      cargarCita()
      cargarServicios()
      setIsLoaded(true)
      
    }, [])
    
//Regresa a la pagina anterior
    async function handleDelete(id){
        await deleteCita(id)
        router.push("/citas")

    }


      const handleSelectChange = async (event) => {
        const selectedServicio = event.target.value;
        console.log(selectedServicio)
        /*
        // Verificar si el servicio ya está en el arreglo
        if (!miServicios.includes(selectedServicio)) {
          const serviciosActuales = [...miServicios]
          serviciosActuales.push(selectedServicio)
          setMiServicios(serviciosActuales)
          formData.servicios = [...formData.servicios, selectedServicio]
          await updateCita(params.id,formData)
        };*/

        setSeleccion(event.target.value)
      }

      function AgregarServicio(){
        if (!formData.servicios.includes(seleccion)){
            setFormData({
                ...formData,
                servicios: [...formData.servicios, seleccion],
              });
        }

      }

  return(
    <div className='p-6'>
        <div className="flex justify-between">
            

            <div>
                {params.id}
                
                <button onClick={()=>handleDelete(params.id)}>Borrar</button>

            </div>


            <div className="p-5">

            <h1>Actualizar cita</h1>


                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

                    <label className="flex flex-col">
                        Nombre:
                        {cita?.expand.cliente?.nombre} {cita?.expand.cliente?.apellido_p} {cita?.expand.cliente?.apellido_m}
                    </label>
                    
                    <label className="flex flex-col">
                        Fecha:
                        <input type="text" name="fecha" value={formData.fecha} onChange={handleInputChange}
                        className="border border-zinc-900 rounded-md" />
                    </label>

                    <label className="flex flex-col">
                        Hora Inicio: 
                        <input type="text" name="hora_i" value={formData.hora_i} onChange={handleInputChange}
                        className="border border-zinc-900 rounded-md" />
                    </label>
                    

                    
                    <label className="flex flex-col">
                        Hora Fin:
                        <input type="text" name="hora_f" value={formData.hora_f} onChange={handleInputChange}
                        className="border border-zinc-900 rounded-md" />
                    </label>

                    <button type="submit">Submit</button>
                </form>

                <form className="mt-5"onSubmit={AgregarServicio}>
                        <select onChange={handleSelectChange} >
                            <option  disabled defaultValue={""}>Select your option</option>
                            {servicios.map((serv)=> (
                                <option key={serv.id}>{serv.nombre}</option>
                            ))}
                        </select>
                        <button type="submit"> Aniadir</button>
                        <label className="flex flex-col mt-5">
                            Servicios:
                            {cita?.expand.servicios?.map((servicio)=>(<label key={servicio.id}>{servicio.nombre}</label>))}
                        </label>
                </form>
                

            
        </div>

        </div>
        


  </div>

   
    
  )
}