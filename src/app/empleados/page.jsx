'use client'
import Image from 'next/image'
import Link from 'next/link'
import { getEmpleados } from '@/db/Pocketbase'
import {useEffect, useState} from 'react'
//import EmpleadoCard from '@/components/EmpleadoCard'
import EmpleadoCard from '@/components/EmpleadoCard'
import { IoAddCircleOutline } from "react-icons/io5";


export default function EmpleadosPage() {
  const[isLoaded, setIsLoaded] = useState(false)

  const[empleados, setEmpleados] = useState([])

  const cargarEmpleados = async () => {
    const data = await getEmpleados();
    console.log(data)
    setEmpleados(data)
  }

  useEffect(()=>{
    setIsLoaded(true)
    cargarEmpleados()

  },[])
  return (
    <div className='p-5'>
      <div className='flex justify-between mb-7'>
        <h1 className='text-2xl'>Pagina de empleados</h1>
        <Link href ="/empleados/crear"className='font-bold text-4xl'>
          <IoAddCircleOutline />
        </Link>
      </div>
      {isLoaded && (
        <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-10'>
          {empleados.map((empleado)=> (
            <EmpleadoCard id= {empleado.id} nombre={empleado.nombre} apellido_p={empleado.apellido_p} apellido_m={empleado.apellido_m} telefono={empleado.telefono}></EmpleadoCard>
          ))}
        </div>
      )}

    </div>
  )
}