//GET DE EMPLEADO EN FORMATO DE TARJETA

'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function EmpleadoCard(props) {
  return (
    <Link href= {`/empleados/${props.id}`} className='flex justify-between shadow-md p-4 rounded-xl'>

      <div className='flex gap-6'>
        <p className='font-bold'>{props.nombre} {props.apellido_p} {props.apellido_m}</p>
  
        <p className='font-light'> Tel. {props.telefono}</p>

      </div>


    </Link>
  )
}