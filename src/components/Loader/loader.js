import React from "react";

//El loader es solo un compoennte el cual muestra un GIF, este se importa en la pagina ver detalle, mientras que carga la info se muestra este componente
function Loader() {
  return (
    <div>
      <img src="/img/loader.gif" alt="Cargando..." />
      <p>Cargando...</p>
    </div>
  );
}

export default Loader;