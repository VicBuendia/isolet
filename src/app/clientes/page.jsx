// HACE EL GET DE LOS CLIENTES

'use client'
import Image from 'next/image'
import Link from 'next/link'
import { getClientes } from '@/db/Pocketbase'
import {useEffect, useState} from 'react'
import ClienteCard from '@/components/ClienteCard'
import {IoAddCircleOutline} from "react-icons/io5";



export default function ClientesPage() {
  const[isLoaded, setIsLoaded] = useState(false)

  const[clientes, setClientes] = useState([])


  const cargarClientes = async () => {
    const data = await getClientes();
    console.log(data)
    setClientes(data)
  }

  useEffect(()=>{
    setIsLoaded(true)
    cargarClientes()
    
  }, [])
  return (
    <div className='p-5'>
      <div className='flex justify-between mb-7'>
        <h1 className='text-2xl'>Pagina de clientes</h1>
        <Link href ="/clientes/crear"className='font-bold text-4xl'>
          <IoAddCircleOutline />
        </Link>
      </div>
      {isLoaded && (
        <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-10'>
          {clientes.map((cliente)=> (
            <ClienteCard id= {cliente.id} nombre={cliente.nombre} apellido_p={cliente.apellido_p} apellido_m={cliente.apellido_m} telefono={cliente.telefono}></ClienteCard>
          ))}
        </div>
      )}

    </div>
  )
}
