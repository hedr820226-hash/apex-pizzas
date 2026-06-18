import {
  useState,
  useEffect,
} from "react";

export default function Admin() {

  const [seccion, setSeccion] =
    useState("productos");

   const [promociones,
  setPromociones] =
  useState(() => {

    const guardadas =
      localStorage.getItem(
        "apex_promociones"
      );

    if (guardadas) {
      return JSON.parse(
        guardadas
      );
    }

    return [
      {
        nombre:
          "2x1 Pepperoni",
        descripcion:
          "Compra 2 y paga 1",
      },
    ];

  });

const [nombrePromo,setNombrePromo] =
  useState("");

const [descripcionPromo,setDescripcionPromo] =
  useState("");
    
const [editandoPromo,
  setEditandoPromo] =
  useState(null);

const [nuevoNombrePromo,
  setNuevoNombrePromo] =
  useState("");

const [nuevaDescripcionPromo,
  setNuevaDescripcionPromo] =
  useState("");


  const [configuracion,
  setConfiguracion] =
  useState(() => {

    const guardada =
      localStorage.getItem(
        "apex_configuracion"
      );

    if (guardada) {
      return JSON.parse(
        guardada
      );
    }

    return {
      negocio:
        "Apex Pizzas",
      whatsapp:
        "9131091251",
      direccion:
        "Cunduacán, Tabasco",
      horario:
        "12 PM - 11 PM",
    };
  });


 const [productos, setProductos] =
  useState(() => {

    const guardados =localStorage.getItem(
        "apex_productos"
      );

    if (guardados) {
      return JSON.parse(
        guardados
      );
    }

    return [
     {
  nombre: "Pepperoni",
  precio: 189,
  categoria: "Pizza",
  imagen: "/pepperoni.jpg",
},
     {
  nombre: "Hawaiana",
  precio: 199,
  categoria: "Pizza",
  imagen: "/hawaiana.jpg",
},
      {
  nombre: "Mexicana",
  precio: 209,
  categoria: "Pizza",
  imagen: "/mexicana.jpg",
},
     {
  nombre: "Suprema",
  precio: 249,
  categoria: "Pizza",
  imagen: "/suprema.jpg",
},
    ];
  });

  const [editando, setEditando] =
  useState(null);

const [nuevoPrecio,setNuevoPrecio] =
  useState("");

  const [nombreProducto, setNombreProducto] =
    useState("");

  const [precioProducto, setPrecioProducto] =
    useState("");

const agregarPromocion = () => {

  if (
    nombrePromo.trim() === ""
  ) {
    return;
  }

  setPromociones([
    ...promociones,
    {
      nombre: nombrePromo,
      descripcion:
        descripcionPromo,
    },
  ]);

  setNombrePromo("");
  setDescripcionPromo("");
};


const eliminarPromocion =
(index) => {

  const nuevasPromos =
    promociones.filter(
      (_, i) => i !== index
    );

  setPromociones(
    nuevasPromos
  );
};

  const [categoriaProducto, setCategoriaProducto] =
    useState("Pizza");

    useEffect(() => {

  localStorage.setItem(
    "apex_productos",
    JSON.stringify(
      productos
    )
  );

}, [productos]);

useEffect(() => {

  localStorage.setItem(
    "apex_configuracion",
    JSON.stringify(
      configuracion
    )
  );

}, [configuracion]);

useEffect(() => {

  localStorage.setItem(
    "apex_promociones",
    JSON.stringify(
      promociones
    )
  );

}, [promociones]);

const guardarPrecio =
(index) => {

  const copia =
    [...productos];

  copia[index].precio =
    Number(nuevoPrecio);

  setProductos(copia);

  setEditando(null);

  setNuevoPrecio("");
};


const eliminarProducto = (index) => {

  const nuevosProductos =
    productos.filter(
      (_, i) => i !== index
    );

  setProductos(
    nuevosProductos
  );
};

const guardarPromocion =
(index) => {

  const copia =
    [...promociones];

  copia[index] = {
    nombre:
      nuevoNombrePromo,
    descripcion:
      nuevaDescripcionPromo,
  };

  setPromociones(copia);

  setEditandoPromo(
    null
  );
};

  const agregarProducto = () => {

    if (
      nombreProducto.trim() === "" ||
      precioProducto === ""
    ) {
      alert("Completa todos los campos");
      return;
    }

    const nuevoProducto = {
      nombre: nombreProducto,
      precio: Number(precioProducto),
      categoria: categoriaProducto,
    };

    setProductos([
      ...productos,
      nuevoProducto,
    ]);

    setNombreProducto("");
    setPrecioProducto("");
    setCategoriaProducto("Pizza");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "white",
        display: "flex",
      }}
    >

      {/* MENU */}

      <div
        style={{
          width: "250px",
          background: "#640707",
          padding: "20px",
        }}
      >
        <h2>⚙️ APEX ADMIN</h2>

        <hr />

        <p
          style={{ cursor: "pointer" }}
          onClick={() =>
            setSeccion("productos")
          }
        >
          📦 Productos
        </p>

        <p
          style={{ cursor: "pointer" }}
          onClick={() =>
            setSeccion("promociones")
          }
        >
          🔥 Promociones
        </p>

        <p
          style={{ cursor: "pointer" }}
          onClick={() =>
            setSeccion("configuracion")
          }
        >
          ⚙️ Configuración
        </p>

        <p
          style={{ cursor: "pointer" }}
          onClick={() =>
            setSeccion("pedidos")
          }
        >
          📋 Pedidos
        </p>
      </div>

      {/* CONTENIDO */}

      <div
        style={{
          flex: 1,
          padding: "30px",
        }}
      >

        {seccion === "productos" && (
          <>
            <h1>📦 Productos</h1>

            {productos.map(
              (producto, index) => (
            <div
  key={index}
  style={{
    marginBottom: "10px",
    padding: "10px",
    background: "#111",
    borderRadius: "10px",
  }}
>

  🍕 {producto.nombre}
  {" - $"}
  {producto.precio}

  <button
    onClick={() =>
      eliminarProducto(index)
    }
    style={{
      marginLeft: "15px",
      background: "red",
      color: "white",
      border: "none",
      padding: "5px 10px",
      borderRadius: "5px",
      cursor: "pointer",
    }}
  >
    🗑 Eliminar
  </button>

  <button
    onClick={() => {

      setEditando(index);

      setNuevoPrecio(
        producto.precio
      );

    }}
    style={{
      marginLeft: "10px",
      background: "#00d9ff",
      border: "none",
      padding: "5px 10px",
      borderRadius: "5px",
      cursor: "pointer",
    }}
  >
    ✏️ Editar
  </button>

  {editando === index && (
    <div
      style={{
        marginTop: "10px",
      }}
    >
      <input
        value={nuevoPrecio}
        onChange={(e) =>
          setNuevoPrecio(
            e.target.value
          )
        }
      />

      <button
        onClick={() =>
          guardarPrecio(index)
        }
      >
        Guardar
      </button>
    </div>
  )}

</div>
              )
            )}

  
            <hr
              style={{
                marginTop: "30px",
                marginBottom: "20px",
              }}
            />

            <h2>
              ➕ Nuevo Producto
            </h2>

            <input
              placeholder="Nombre"
              value={nombreProducto}
              onChange={(e) =>
                setNombreProducto(
                  e.target.value
                )
              }
              style={{
                width: "300px",
                padding: "10px",
                marginBottom: "10px",
                display: "block",
              }}
            />

            <input
              placeholder="Precio"
              type="number"
              value={precioProducto}
              onChange={(e) =>
                setPrecioProducto(
                  e.target.value
                )
              }
              style={{
                width: "300px",
                padding: "10px",
                marginBottom: "10px",
                display: "block",
              }}
            />

            <select
              value={categoriaProducto}
              onChange={(e) =>
                setCategoriaProducto(
                  e.target.value
                )
              }
              style={{
                width: "320px",
                padding: "10px",
                marginBottom: "15px",
              }}
            >
              <option>
                Pizza
              </option>

              <option>
                Hamburguesa
              </option>

              <option>
                Bebida
              </option>
            </select>

            <br />

            <button
              onClick={
                agregarProducto
              }
              style={{
                padding:
                  "12px 25px",
                border: "none",
                borderRadius:
                  "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Guardar Producto
            </button>
          </>
        )}

        

    {seccion === "promociones" && (
  <>
    <h1>🔥 Promociones</h1>

    {promociones.map(
      (promo, index) => (
        <div
          key={index}
          style={{
            background: "#111",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "10px",
          }}
        >

          <strong>
            {promo.nombre}
          </strong>

          <br />

          {promo.descripcion}

          <div
            style={{
              marginTop: "10px",
            }}
          >
            <button
              onClick={() => {

                setEditandoPromo(
                  index
                );

                setNuevoNombrePromo(
                  promo.nombre
                );

                setNuevaDescripcionPromo(
                  promo.descripcion
                );

              }}
            >
              ✏️ Editar
            </button>

            <button
              onClick={() =>
                eliminarPromocion(
                  index
                )
              }
              style={{
                marginLeft: "10px",
              }}
            >
              🗑 Eliminar
            </button>
          </div>

          {editandoPromo ===
            index && (
            <div
              style={{
                marginTop: "10px",
              }}
            >
              <input
                value={
                  nuevoNombrePromo
                }
                onChange={(e) =>
                  setNuevoNombrePromo(
                    e.target.value
                  )
                }
              />

              <br />

              <input
                value={
                  nuevaDescripcionPromo
                }
                onChange={(e) =>
                  setNuevaDescripcionPromo(
                    e.target.value
                  )
                }
              />

              <br />

              <button
                onClick={() =>
                  guardarPromocion(
                    index
                  )
                }
              >
                Guardar
              </button>
            </div>
          )}
        </div>
      )
    )}

    <hr />

    <h2>
      ➕ Nueva Promoción
    </h2>

    <input
      placeholder="Nombre"
      value={nombrePromo}
      onChange={(e) =>
        setNombrePromo(
          e.target.value
        )
      }
      style={{
        display: "block",
        marginBottom: "10px",
        padding: "10px",
        width: "300px",
      }}
    />

    <input
      placeholder="Descripción"
      value={descripcionPromo}
      onChange={(e) =>
        setDescripcionPromo(
          e.target.value
        )
      }
      style={{
        display: "block",
        marginBottom: "10px",
        padding: "10px",
        width: "300px",
      }}
    />

    <button
      onClick={
        agregarPromocion
      }
    >
      Guardar Promoción
    </button>
  </>
)}
       {seccion === "configuracion" && (
  <>
    <h1>
      ⚙️ Configuración
    </h1>

    <input
      placeholder="Nombre negocio"
      value={
        configuracion.negocio
      }
      onChange={(e) =>
        setConfiguracion({
          ...configuracion,
          negocio:
            e.target.value,
        })
      }
      style={{
        display: "block",
        marginBottom: "10px",
        padding: "10px",
        width: "350px",
      }}
    />

    <input
      placeholder="WhatsApp"
      value={
        configuracion.whatsapp
      }
      onChange={(e) =>
        setConfiguracion({
          ...configuracion,
          whatsapp:
            e.target.value,
        })
      }
      style={{
        display: "block",
        marginBottom: "10px",
        padding: "10px",
        width: "350px",
      }}
    />

    <input
      placeholder="Dirección"
      value={
        configuracion.direccion
      }
      onChange={(e) =>
        setConfiguracion({
          ...configuracion,
          direccion:
            e.target.value,
        })
      }
      style={{
        display: "block",
        marginBottom: "10px",
        padding: "10px",
        width: "350px",
      }}
    />

    <input
      placeholder="Horario"
      value={
        configuracion.horario
      }
      onChange={(e) =>
        setConfiguracion({
          ...configuracion,
          horario:
            e.target.value,
        })
      }
      style={{
        display: "block",
        marginBottom: "10px",
        padding: "10px",
        width: "350px",
      }}
    />

    <div
      style={{
        marginTop: "20px",
        background: "#111",
        padding: "15px",
        borderRadius: "10px",
      }}
    >
      <h3>Vista previa</h3>

      <p>
        🏪 {
          configuracion.negocio
        }
      </p>

      <p>
        📱 {
          configuracion.whatsapp
        }
      </p>

      <p>
        📍 {
          configuracion.direccion
        }
      </p>

      <p>
        🕒 {
          configuracion.horario
        }
      </p>
    </div>
  </>
)}

        {seccion === "pedidos" && (
          <h1>📋 Pedidos</h1>
        )}

      </div>
    </div>
  );
}