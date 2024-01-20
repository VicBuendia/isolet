//PÁGINA SERVICIO INDIVIDUAL, HACE EL DELETE Y PUT

"use client"
//import { postClientes } from "@/db/Pocketbase";
import { getServicio, deleteServicio, updateServicio  } from "@/db/Pocketbase";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";


export default function ClientePage({params}){
    const[isLoaded, setIsLoaded] = useState(false)

    const[servicio, setServicio] = useState()
    
    const router = useRouter() 
  
    const cargarServicio = async () => {
      const data = await getServicio(params.id);
      console.log(data)
      setServicio(data)
      setFormData({
        nombre: data.nombre,
        costo: data.costo
      })
    }
  

    const [formData, setFormData] = useState({
        nombre: '',
        costo: ''
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
        updateServicio(params.id,formData)
        router.push("/servicios")
    }

    useEffect(()=>{
      setIsLoaded(true)
      cargarServicio()
      
    }, [])
    
//Regresa a la pagina anterior
    async function handleDelete(id){
        await deleteServicio(id)
        router.push("/servicios")

    }

  return(
    <div className='p-6'>
        <div className="flex justify-between">
            

            <div>
                {params.id}
                <button onClick={()=>handleDelete(params.id)}>Borrar</button>

            </div>


            <div className="p-5">

            <h1>Actualizar servicio</h1>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <label className="flex flex-col">
                    Nombre:
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange}
                    className="border border-zinc-900 rounded-md" />
                </label>

                <label className="flex flex-col">
                    Costo:
                    <input type="text" name="costo" value={formData.costo} onChange={handleInputChange}
                    className="border border-zinc-900 rounded-md" />
                </label>

                <button type="submit">Submit</button>
            </form>
        </div>

        </div>
        


  </div>

   
    
  )
}