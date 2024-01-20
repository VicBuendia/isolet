//FORMULARIO PARA EL POST DE EMPLEADOS

"use client"
import { postEmpleados} from "@/db/Pocketbase";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function crear(){

    const [formData, setFormData] = useState({
        nombre: '',
        apellido_p: '',
        apellido_m: '',
        telefono: ''
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
        postEmpleados(formData)
        router.push("/empleados")
    }

    return(
        <div className="p-5">

            <h1>Insertar empleado</h1>

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

       
    )
}