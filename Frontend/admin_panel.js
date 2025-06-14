const API_URL = "http://127.0.0.1:8000/api/productos";
const token = localStorage.getItem("token");

async function cargarProductos() {
    const res = await fetch(API_URL, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });
    const productos = await res.json();
    mostrarProductos(productos);
}

function mostrarProductos(productos) {
    const tbody = document.getElementById("productos");
    tbody.innerHTML = "";
    productos.forEach(producto => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="px-6 py-4"><img src="${producto.imagen}" alt="Imagen" class="w-16 h-16 object-contain rounded shadow"></td>
            <td class="px-6 py-4">${producto.nombre}</td>
            <td class="px-6 py-4">${producto.descripcion}</td>
            <td class="px-6 py-4">$${producto.precio}</td>
            <td class="px-6 py-4">${producto.stock}</td>
            <td class="px-6 py-4">${producto.cantidad}</td>
            <td class="px-6 py-4 text-center">
                <a href="editar_producto.html?id=${producto.id}" 
                   class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 mr-2 inline-block">Editar</a>
                <button onclick="eliminarProducto(${producto.id})" 
                   class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 inline-block">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

window.editarProducto = function(id) {
    window.location.href = `editar_producto.html?id=${id}`;
};

window.eliminarProducto = async function(id) {
    if (!confirm("¿Seguro que deseas eliminar este producto?")) return;
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });
    cargarProductos();
};

cargarProductos();