import React, { useState } from 'react';

const ToggleComponente = ({ children }) => {
  const [mostrarComponente, setMostrarComponente] = useState(true);

  const toggleComponente = () => {
    setMostrarComponente(!mostrarComponente);
  }

  return (
    <div>
      <button onClick={toggleComponente}>
        {mostrarComponente ? 'Esconder Componente' : 'Mostrar Componente'}
      </button>
      {mostrarComponente && children}
    </div>
  );
}

export default ToggleComponente;

