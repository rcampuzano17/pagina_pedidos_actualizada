
const menu = document.getElementById("menu");
const pedidoLista = document.getElementById("pedido-lista");
const totalSpan = document.getElementById("total");
const btnEnviar = document.getElementById("btnEnviar");
const btnVaciar = document.getElementById("vaciarPedido");

let platos = JSON.parse(localStorage.getItem("eliMenu")) || [];
let pedido = [];

function actualizarPedido() {
  pedidoLista.innerHTML = "";
  let total = 0;

  pedido.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio}`;
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "❌";
    btnEliminar.onclick = () => {
      pedido.splice(index, 1);
      actualizarPedido();
    };
    li.appendChild(btnEliminar);
    pedidoLista.appendChild(li);
    total += parseFloat(item.precio);
  });

  totalSpan.textContent = `$${total.toLocaleString("es-CO")}`;

  if (pedido.length > 0) {
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido") ? document.getElementById("apellido").value.trim() : "";
    const direccion = document.getElementById("direccion").value.trim();

    let mensaje = "Hola! Quiero ordenar:%0A";

    if (nombre || apellido) mensaje += `Nombre: ${nombre} ${apellido}%0A`;
    if (direccion) mensaje += `Dirección: ${direccion}%0A`;

    mensaje += pedido.map(p => `${p.nombre} - $${p.precio}`).join('%0A');
    mensaje += `%0ATotal: $${total}`;

    btnEnviar.href = `https://wa.me/573134114972?text=${mensaje}`;
  } else {
    btnEnviar.href = "#";
  }
}

platos.forEach(plato => {
  const card = document.createElement("div");
  card.className = "menu-card";
  card.innerHTML = `
    <img src="${plato.imagen}" alt="${plato.nombre}" />
    <h3>${plato.nombre}</h3>
    <p><strong>$${parseFloat(plato.precio).toLocaleString("es-CO")}</strong></p>
    <button>➕ Agregar</button>
  `;
  card.querySelector("button").onclick = () => {
    pedido.push(plato);
    actualizarPedido();
  };
  menu.appendChild(card);
});

btnVaciar.onclick = () => {
  pedido = [];
  actualizarPedido();
};

actualizarPedido();

