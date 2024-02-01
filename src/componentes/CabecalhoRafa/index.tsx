import React from 'react'

interface CabecalhoProps {
    titulo: string,
    texto: string,
    id: string
}

function CabecalhoRafa({titulo,texto, id}:CabecalhoProps) {
  return (
    <div role="container" className="text-center" id={id}>
        <h1 className="pt-5">{titulo}</h1>
        <p>{texto}</p>
    </div>
  )
}

export default CabecalhoRafa