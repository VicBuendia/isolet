'use client'
import Image from 'next/image'
import Link from 'next/link'
import { getServicios } from '@/db/Pocketbase'
import {useEffect, useState} from 'react'
//import EmpleadoCard from '@/components/EmpleadoCard'
import ServicioCard from '@/components/ServicioCard'
import { IoAddCircleOutline } from "react-icons/io5";


export default function ServiciosPage() {
  const[isLoaded, setIsLoaded] = useState(false)

  const[servicios, setServicios] = useState([])

  const cargarServicios = async () => {
    const data = await getServicios();
    console.log(data)
    setServicios(data)
  }

  useEffect(()=>{
    setIsLoaded(true)
    cargarServicios()

  },[])
  return (
    <div className='p-5'>
      <div className='flex justify-between mb-7'>
        <h1 className='text-2xl'>Pagina de servicios</h1>
        <Link href ="/servicios/crear"className='font-bold text-4xl'>
          <IoAddCircleOutline />
        </Link>
      </div>
      {isLoaded && (
        <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-10'>
          {servicios.map((servicio)=> (
            <ServicioCard id= {servicio.id} nombre={servicio.nombre} costo={servicio.costo}></ServicioCard>
          ))}
        </div>
      )}

    </div>
  )
}