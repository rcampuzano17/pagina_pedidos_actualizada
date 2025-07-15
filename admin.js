function verificarClave() {
  const clave = document.getElementById("clave").value;
  if (clave === "eli2025") {
    document.getElementById("acceso").style.display = "none";
    document.getElementById("panel").style.display = "block";
    mostrarPlatos();
  } else {
    alert("Clave incorrecta");
  }
}

const form = document.getElementById("formulario");
const menuAdmin = document.getElementById("menuAdmin");
let platos = JSON.parse(localStorage.getItem("eliMenu")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;
  const imagenFile = document.getElementById("imagen").files[0];

  const reader = new FileReader();
  reader.onloadend = () => {
    const nuevoPlato = {
      nombre,
      precio,
      imagen: reader.result
    };
    platos.push(nuevoPlato);
    localStorage.setItem("eliMenu", JSON.stringify(platos));
    mostrarPlatos();
    form.reset();
  };
  if (imagenFile) reader.readAsDataURL(imagenFile);
});

function mostrarPlatos() {
  menuAdmin.innerHTML = "";
  platos.forEach((plato, index) => {
    const card = document.createElement("div");
    card.className = "menu-card";
    card.innerHTML = `
      <img src="${plato.imagen}" alt="${plato.nombre}" />
      <h3>${plato.nombre}</h3>
      <p><strong>$${parseFloat(plato.precio).toLocaleString("es-CO")}</strong></p>
      <button onclick="eliminarPlato(${index})">🗑️ Eliminar</button>
    `;
    menuAdmin.appendChild(card);
  });
}

window.eliminarPlato = (index) => {
  platos.splice(index, 1);
  localStorage.setItem("eliMenu", JSON.stringify(platos));
  mostrarPlatos();
};
