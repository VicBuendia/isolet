//BARRA DE NAVEGACIÓN

'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function BarraNav() {
  return (
    <div className='flex justify-between bg-zinc-800 p-5 text-white '>
      
      <div>
        <Link href ="/">Inicio</Link>
      </div>

      <div className='flex gap-5'>
        <Link href ="/clientes">Clientes</Link>
        <Link href ="/citas">Citas</Link>
        <Link href ="/empleados">Empleados</Link>
        <Link href ="/servicios">Servicios</Link>
      </div>

      <div>
        Usuario
      </div>

    </div>
  )
}
