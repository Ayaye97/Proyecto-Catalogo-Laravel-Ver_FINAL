import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID",
    measurementId: "TU_MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const API_URL = "http://127.0.0.1:8000/api/productos";
const token = localStorage.getItem("token");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function cargarProducto() {
    const res = await fetch(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const producto = await res.json();
    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("descripcion").value = producto.descripcion;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("stock").value = producto.stock;
    if (document.getElementById("imagenActual")) {
        document.getElementById("imagenActual").src = producto.imagen;
    }
}

document.getElementById("productoForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const precio = document.getElementById("precio").value;
    const stock = document.getElementById("stock").value;
    const cantidad = parseInt(document.getElementById("cantidad").value, 10);
    const imagenInput = document.getElementById("imagen");
    const mensaje = document.getElementById("mensaje");

    let imagenUrl = document.getElementById("imagenActual") ? document.getElementById("imagenActual").src : "";
    const imagenUrlAnterior = imagenUrl; // Guardar la URL anterior para posible eliminación
    if (imagenInput && imagenInput.files.length > 0) {
        // Eliminar la imagen anterior si existe
        if (imagenUrlAnterior) {
            const path = getStorageRefFromUrl(imagenUrlAnterior);
            if (path) {
                const oldRef = ref(storage, path);
                try {
                    await deleteObject(oldRef);
                } catch (e) {
                    // Si falla la eliminación, puedes ignorar o mostrar un mensaje
                    console.warn("No se pudo eliminar la imagen anterior:", e.message);
                }
            }
        }
        // Subir la nueva imagen
        const file = imagenInput.files[0];
        const storageRef = ref(storage, "productos/" + Date.now() + "_" + file.name);
        await uploadBytes(storageRef, file);
        imagenUrl = await getDownloadURL(storageRef);
    }

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ nombre, descripcion, precio, stock, cantidad, imagen: imagenUrl })
        });
        if (!res.ok) throw new Error("Error al actualizar producto");
        mensaje.textContent = "Producto actualizado correctamente";
        mensaje.className = "text-green-500 mt-4 text-center";
        setTimeout(() => window.location.href = "admin.html", 1500);
    } catch (err) {
        mensaje.textContent = "Error: " + err.message;
        mensaje.className = "text-red-500 mt-4 text-center";
    }
});

function getStorageRefFromUrl(url) {
    // Extrae el path relativo a partir de la URL pública de Firebase Storage
    const matches = url.match(/\/o\/(.+)\?alt=media/);
    if (matches && matches[1]) {
        // Decodifica el path (por si tiene espacios u otros caracteres)
        return decodeURIComponent(matches[1]);
    }
    return null;
}

cargarProducto();