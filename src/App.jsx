import {
  useState,
  useEffect
} from "react";
function App() {
  const [configuracion,
  setConfiguracion] =
  useState({
    negocio:
      "Apex Pizzas",
    whatsapp:
      "9131091251",
    direccion:
      "Cunduacán, Tabasco",
    horario:
      "12 PM - 11 PM",
  });

  const [promociones,
  setPromociones] =
  useState([]);

useEffect(() => {

  const guardadas =
    localStorage.getItem(
      "apex_promociones"
    );

  if (guardadas) {

    setPromociones(
      JSON.parse(
        guardadas
      )
    );

  }

}, []);


useEffect(() => {

  const guardada =
    localStorage.getItem(
      "apex_configuracion"
    );

  if (guardada) {

    setConfiguracion(
      JSON.parse(
        guardada
      )
    );

  }

}, []);

useEffect(() => {

  const guardados =
    localStorage.getItem(
      "apex_productos"
    );

  if (guardados) {

    setProductos(
      JSON.parse(
        guardados
      )
    );

  }

}, []);

const [productos, setProductos] =useState([]);
  const [carrito, setCarrito] = useState([]);
    const [nombre, setNombre] = useState("");
const [telefono, setTelefono] = useState("");
const [direccion, setDireccion] = useState("");
const pepperoniCantidad =
  carrito.filter(
    p => p[0] === "Pepperoni"
  ).length;

const ahorroPepperoni =
  Math.floor(
    pepperoniCantidad / 2
  ) * 189;
const agregarPizza = (pizza) => {
  setCarrito([...carrito, pizza]);
};

const quitarPizza = (nombrePizza) => {
  const indice = carrito.findIndex(
    (p) => p[0] === nombrePizza
  );

  if (indice === -1) return;

  const nuevoCarrito = [...carrito];

  nuevoCarrito.splice(indice, 1);

  setCarrito(nuevoCarrito);
};
const agrupados = {};

carrito.forEach((item) => {
  const nombrePizza = item[0];

  if (!agrupados[nombrePizza]) {
    agrupados[nombrePizza] = {
      cantidad: 0,
      precio: item[1],
    };
  }

  agrupados[nombrePizza].cantidad++;
});
  const realizarPedido = () => {

    if (
  nombre.trim() === "" ||
  telefono.trim() === "" ||
  direccion.trim() === ""
) {
  alert(
    "Completa nombre, teléfono y dirección"
  );
  return;
}

  if (carrito.length === 0) {
    alert("Agrega al menos una pizza");
    return;
  }

  const lista = Object.entries(agrupados)
  .map(([nombre, datos]) =>
    `🍕 ${nombre} x${datos.cantidad}`
  )
  .join("\n");

  let total = 0;

const conteo = {};

carrito.forEach((item) => {
  const nombre = item[0];
  const precio = item[1];

  if (!conteo[nombre]) {
    conteo[nombre] = {
      cantidad: 0,
      precio,
    };
  }

  conteo[nombre].cantidad++;
});

Object.entries(conteo).forEach(
  ([nombre, datos]) => {

    if (nombre === "Pepperoni") {

      total +=
        Math.ceil(
          datos.cantidad / 2
        ) * datos.precio;

    } else {

      total +=
        datos.cantidad *
        datos.precio;

    }
  }
);

 const totalFinal = total;

const mensaje =
`🍕 *APEX PIZZAS*

🔥 *NUEVO PEDIDO*

👤 *Cliente:*
${nombre}

📞 *Teléfono:*
${telefono}

📍 *Dirección:*
${direccion}

━━━━━━━━━━━━━━

📋 *PEDIDO*

${lista}

━━━━━━━━━━━━━━

🎉 *Descuento 2x1*
-$${ahorroPepperoni}

💰 *TOTAL FINAL*
$${totalFinal}

🚀 Gracias por su compra.
Su pedido será preparado en breve.`;

  window.open(
    `https://wa.me/529131091251?text=${encodeURIComponent(mensaje)}`,
    "_blank"
  );
};
  const whatsapp =
`https://wa.me/52${configuracion.whatsapp}?text=Hola%20quiero%20hacer%20un%20pedido%20en%20${encodeURIComponent(
  configuracion.negocio
)}`;

  return (
    <div
      style={{
        minHeight: "100vh",
       background:
  "radial-gradient(circle at top, #001933 0%, #050505 35%, #000000 100%)",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* NAVBAR */}

      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 50px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <img
  src="/logo-apex.png"
  alt="logo"
  style={{
    width: "140px",
  }}
/>

        <div
          style={{
            display: "flex",
            gap: "25px",
          }}
        >
          <span>Inicio</span>
          <span>Menú</span>
          <span>Promociones</span>
          <span>Contacto</span>
        </div>
      </nav>

      {/* HERO */}

      <section
        style={{
          textAlign: "center",
          padding: "80px 20px",
        }}
      >

       <h2>🔥 Promociones del Día</h2>

{promociones.length === 0 ? (

  <div
    style={{
      marginTop: "20px",
      color: "#999",
    }}
  >
    No hay promociones activas
  </div>

) : (

  promociones.map(
    (promo, index) => (

      <div
        key={index}
        style={{
          marginTop: "10px",
        }}
      >
        🔥 {promo.nombre}
      </div>

    )
  )

)}
   
 <img
  src="/logo-apex.png"
  alt="Apex Pizzas"
  style={{
    width: "500px",
    maxWidth: "90%",
    display: "block",
    margin: "30px auto",
    borderRadius: "20px",
    boxShadow:
      "0 0 40px rgba(0,217,255,0.4)",
  }}
/>

<h1
  style={{
    color: "#ffffff",
    fontSize: "clamp(32px, 7vw, 48px)",
    marginTop: "20px",
    marginBottom: "10px",
    lineHeight: "1.1",
    padding: "0 10px",
  }}
>
  Las pizzas más tecnológicas de Tabasco
</h1>
<h3>
  {configuracion.negocio}
</h3>
<p
  style={{
    color: "#cfcfcf",
    fontSize: "22px",
    maxWidth: "800px",
    margin: "auto",
    lineHeight: "1.6",
  }}
>
  Ingredientes frescos, entrega rápida y pedidos
  directos por WhatsApp.
</p>
    
 

      <h2
  style={{
    color: "#ff3f6c",
    marginBottom: "20px",
    fontSize: "32px",
    textShadow: "0 0 15px #ff3f6c",
  }}
>
  Tecnología • Velocidad • Sabor
</h2>

        <p
          style={{
            maxWidth: "700px",
            margin: "auto",
            fontSize: "20px",
            color: "#d6d6d6",
          }}
        >
          Pizzas artesanales, entrega rápida con tecnología para que tu
          pedido llegue caliente hasta tu puerta.
        </p>

   <a
  href={whatsapp}
  target="_blank"
  rel="noreferrer"
>
  <button
    style={{
      marginTop: "35px",
      background:
        "linear-gradient(90deg,#00d9ff,#00a6ff)",
      color: "white",
      border: "none",
      padding: "18px 45px",
      borderRadius: "15px",
      fontSize: "22px",
      fontWeight: "bold",
      cursor: "pointer",
      boxShadow:
        "0 0 25px rgba(0,217,255,0.5)",
    }}
  >
    🍕 Pedir Ahora
  </button>
</a>

<div
  style={{
    marginTop: "20px",
  }}
>
  <button
    style={{
      background: "transparent",
      border: "2px solid #ff3f6c",
      color: "#ff3f6c",
      padding: "15px 35px",
      borderRadius: "12px",
      fontSize: "18px",
      cursor: "pointer",
    }}
  >
    Ver Menú
  </button>
</div>

</section>

      {/* MENU */}

      <section
        style={{
          maxWidth: "1200px",
          margin: "auto",
          padding: "40px 20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#3fd8ff",
          }}
        >
          Nuestro Menú
        </h2>

        <div
  style={{
    textAlign: "center",
    marginTop: "20px",
    marginBottom: "20px",
    color: "#fff",
  }}
>
  🛒 Carrito: {carrito.length} productos
</div>

<div
  style={{
    marginTop: "20px",
    background: "#111",
    padding: "20px",
    borderRadius: "15px",
  }}
>

  {Object.entries(agrupados).map(
  ([nombrePizza, datos]) => (
    <div
      key={nombrePizza}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "15px",
      }}
    >
      <span>
        🍕 {nombrePizza}
      </span>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <button
          onClick={() =>
            quitarPizza(nombrePizza)
          }
          style={{
            background: "#ff3f6c",
            border: "none",
            color: "white",
            width: "35px",
            height: "35px",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        >
          -
        </button>

        <strong>
          {datos.cantidad}
        </strong>

        <button
          onClick={() =>
            agregarPizza([
              nombrePizza,
              datos.precio,
            ])
          }
          style={{
            background: "#00d9ff",
            border: "none",
            color: "white",
            width: "35px",
            height: "35px",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        >
          +
        </button>
      </div>

      <span>
        $
        {datos.cantidad *
          datos.precio}
      </span>
    </div>
  )
)}

</div>

<h3
  style={{
    color: "#00d9ff",
    marginTop: "20px",
  }}
>
  Total: $
  {carrito.reduce(
    (total, item) => total + item[1],
    0
  )}  
  
</h3>

{ahorroPepperoni > 0 && (
  <p
    style={{
      color: "#25D366",
      fontWeight: "bold",
    }}
  >
    🎉 Ahorraste $
    {ahorroPepperoni}
  </p>
)}


<button
  onClick={() => setCarrito([])}
  style={{
    marginTop: "15px",
    background: "#444",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",
    cursor: "pointer",
  }}
>
  🗑 Vaciar carrito
</button>

        <section
  style={{
    maxWidth: "1200px",
    margin: "auto",
    padding: "40px 20px",
  }}
>
{/* DATOS DEL CLIENTE */}

<div
  style={{
    marginTop: "25px",
    background: "#111",
    padding: "20px",
    borderRadius: "15px",
  }}
>
  <h3 style={{ color: "#3fd8ff" }}>
    👤 Datos de entrega
  </h3>

  <input
    placeholder="Nombre completo"
    value={nombre}
    onChange={(e) =>
      setNombre(e.target.value)
    }
    style={{
      width: "100%",
      padding: "12px",
      marginBottom: "10px",
      borderRadius: "10px",
    }}
  />

  <input
    placeholder="Teléfono"
    value={telefono}
    onChange={(e) =>
      setTelefono(e.target.value)
    }
    style={{
      width: "100%",
      padding: "12px",
      marginBottom: "10px",
      borderRadius: "10px",
    }}
  />

  <input
    placeholder="Dirección de entrega"
    value={direccion}
    onChange={(e) =>
      setDireccion(e.target.value)
    }
    style={{
      width: "100%",
      padding: "12px",
      borderRadius: "10px",
    }}
  />
</div>

<button
  onClick={realizarPedido}
  style={{
    marginLeft: "10px",
    background: "#25D366",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  }}

>
  📲 Enviar Pedido

</button>  
</section>

<section
  style={{
    padding: "60px 20px",
    textAlign: "center",
  }}
>
  <h2
    style={{
      color: "#3fd8ff",
    }}
  >
    ⭐ Opiniones de Clientes
  </h2>

  <p>
    "Las mejores pizzas de Cunduacán"
  </p>

  <p>
    "Llegó caliente y rápido"
  </p>

  <p>
    "Volveré a pedir"
  </p>
</section>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          {productos.map((producto, index) => (
            <div
              key={index}
              style={{
                background: "#111",
                border: "1px solid #222",
                borderRadius: "20px",
                padding: "20px",
                textAlign: "center",
              }}
            >
  <img
  src="/pepperoni.jpg"
  alt={producto.nombre}
  style={{
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "15px",
    marginBottom: "15px",
  }}
/>
              <h3>{producto.nombre}</h3>

             <p
  style={{
    color: "#ff3f6c",
    fontSize: "22px",
  }}
>
  ${producto.precio}
</p>

           <button
  onClick={() =>
    setCarrito([
      ...carrito,
      producto
    ])
  }
  style={{
    background: "#00d9ff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",
    cursor: "pointer",
  }}
>
  Agregar
</button>
            </div>
          ))}
        </div>
      </section>

      <section
  style={{
    textAlign: "center",
    padding: "50px",
  }}
>
  <h2
    style={{
      color: "#3fd8ff",
    }}
  >
    📍 Encuéntranos
  </h2>

 <p>
  {configuracion.direccion}
</p>

  <p>
🕒 {configuracion.horario}
</p>
</section>

      {/* FOOTER */}

      <footer
        style={{
          textAlign: "center",
          padding: "40px",
          marginTop: "50px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <h3>
  {configuracion.negocio}
</h3>

       <p>
  {configuracion.direccion}
</p>

        <p>Pedidos por WhatsApp</p>
      </footer>


<a
  href={whatsapp}
  target="_blank"
  rel="noreferrer"
  style={{
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: "#25D366",
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "35px",
    textDecoration: "none",
    boxShadow: "0 0 20px #25D366",
  }}
>
  📱
</a>

    </div>
    
  );
}



export default App;

