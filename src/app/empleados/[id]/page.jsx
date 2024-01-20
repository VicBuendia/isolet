//PÁGINA EMPLEADO INDIVIDUAL, HACE EL DELETE Y PUT

"use client"
import { postClientes } from "@/db/Pocketbase";
import { getEmpleado, deleteEmpleado, updateEmpleado  } from "@/db/Pocketbase";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";


export default function EmpleadoPage({params}){
    const[isLoaded, setIsLoaded] = useState(false)

    const[empleado, setEmpleado] = useState()
    
    const router = useRouter() 
  
    const cargarEmpleado = async () => {
      const data = await getEmpleado(params.id);
      console.log(data)
      setEmpleado(data)
      setFormData({
        nombre: data.nombre,
        apellido_p: data.apellido_p,
        apellido_m: data.apellido_m,
        telefono: data.telefono
      })
    }
  

    const [formData, setFormData] = useState({
        nombre: '',
        apellido_p: '',
        apellido_m: '',
        telefono: ''
    });


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
        updateEmpleado(params.id,formData)
        router.push("/empleados")

    }

    useEffect(()=>{
      setIsLoaded(true)
      cargarEmpleado()
      
    }, [])
    
//Regresa a la pagina anterior
    async function handleDelete(id){
        await deleteEmpleado(id)
        router.push("/empleados")

    }

  return(
    <div className='p-6'>
        <div className="flex justify-between">
            

            <div>
                {params.id}
                <button onClick={()=>handleDelete(params.id)}>Borrar</button>

            </div>


            <div className="p-5">

            <h1>Actualizar empleado</h1>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <label className="flex flex-col">
                    Nombre:
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange}
                    className="border border-zinc-900 rounded-md" />
                </label>

                <label className="flex flex-col">
                    Apellido Paterno:
                    <input type="text" name="apellido_p" value={formData.apellido_p} onChange={handleInputChange}
                    className="border border-zinc-900 rounded-md" />
                </label>

                <label className="flex flex-col">
                    Apellido Materno:
                    <input type="text" name="apellido_m" value={formData.apellido_m} onChange={handleInputChange}
                    className="border border-zinc-900 rounded-md" />
                </label>

                <label className="flex flex-col">
                    Telefono:
                    <input type="text" name="telefono" value={formData.telefono} onChange={handleInputChange}
                    className="border border-zinc-900 rounded-md" />
                </label>

                <button type="submit">Submit</button>
            </form>
        </div>

        </div>
        


  </div>

   
    
  )
}