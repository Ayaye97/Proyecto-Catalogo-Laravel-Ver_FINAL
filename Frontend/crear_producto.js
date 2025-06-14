import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js";

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

document.getElementById("productoForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const precio = document.getElementById("precio").value;
    const stock = document.getElementById("stock").value;
    const cantidad = parseInt(document.getElementById("cantidad").value, 10);
    const imagenInput = document.getElementById("imagen");
    const mensaje = document.getElementById("mensaje");

    let imagenUrl = "";
    if (imagenInput.files.length > 0) {
        const file = imagenInput.files[0];
        const storageRef = ref(storage, "productos/" + Date.now() + "_" + file.name);
        await uploadBytes(storageRef, file);
        imagenUrl = await getDownloadURL(storageRef);
    }

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ nombre, descripcion, precio, stock, cantidad, imagen: imagenUrl })
        });
        if (!res.ok) throw new Error("Error al crear producto");
        mensaje.textContent = "Producto creado correctamente";
        mensaje.className = "text-green-500 mt-4 text-center";
        setTimeout(() => window.location.href = "admin.html", 1500);
    } catch (err) {
        mensaje.textContent = "Error: " + err.message;
        mensaje.className = "text-red-500 mt-4 text-center";
    }
});