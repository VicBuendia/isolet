//GET DE CITA EN FORMATO DE TARJETA

'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function CitaCard(props) {
  let subFecha = props.fecha.toString()
  return (
    <Link href= {`/citas/${props.id}`} className='flex justify-between shadow-md p-4 rounded-xl'>

      <div className='flex gap-6'>
        <p className='font-bold'>{subFecha.substring(0,10)} {props.hora_i} {props.hora_f} {props.cliente.nombre} {props.cliente.apellido_p} {props.cliente.apellido_m}</p>
  
        <p className='font-light'> Tel. {props.servicios}</p>

      </div>

      <div>
        <button>Borrar</button>

      </div>

    </Link>
  )
}