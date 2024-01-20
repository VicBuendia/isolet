//FORMULARIO PARA EL POST DE SERVICIOS

"use client"
import { postServicios} from "@/db/Pocketbase";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function crear(){

    const [formData, setFormData] = useState({
        nombre: '',
        costo: ''
    });

    const router = useRouter() 
    
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
        postServicios(formData)
        router.push("/servicios")
    }

    return(
        <div className="p-5">

            <h1>Insertar servicio</h1>

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

       
    )
}