// HACE EL GET DE LOS CLIENTES

'use client'
import Image from 'next/image'
import Link from 'next/link'
import { getCitas } from '@/db/Pocketbase'
import {useEffect, useState} from 'react'
import CitaCard from '@/components/CitaCard'
import {IoAddCircleOutline} from "react-icons/io5";



export default function CitasPage() {
  const[isLoaded, setIsLoaded] = useState(false)

  const[citas, setCitas] = useState([])


  const cargarCitas = async () => {
    const data = await getCitas();
    console.log(data)
    setCitas(data)
  }

  useEffect(()=>{
    setIsLoaded(true)
    cargarCitas()
    
  }, [])

  return (
    <div className='p-5'>
      <div className='flex justify-between mb-7'>
        <h1 className='text-2xl'>Pagina de citas</h1>
        <Link href ="/citas/crear"className='font-bold text-4xl'>
          <IoAddCircleOutline />
        </Link>
      </div>
      {isLoaded && (
        <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-10'>
          {citas.map((cita)=> (
            <CitaCard id= {cita.id} fecha={cita.fecha} hora_i={cita.hora_i} hora_f={cita.hora_f} cliente={cita.expand.cliente} servicios={cita.servicios}></CitaCard>
          ))}
        </div>
      )}

    </div>
  )
}
