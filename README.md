# Proyecto-Catalogo-Laravel
Catálogo web de productos con backend Laravel, frontend JavaScript y almacenamiento de imágenes en Firebase Storage. Permite gestión de productos y categorías por administradores, y visualización por clientes. Proyecto documentado y versionado en GitHub
# Catálogo de Productos con Gestión de Imágenes en la Nube

Este proyecto es un catálogo de productos desarrollado con Laravel (backend) y JavaScript (frontend), que permite la visualización de productos y la gestión de imágenes mediante Firebase Storage. Incluye autenticación de usuarios con roles de administrador y cliente.

## Tecnologías utilizadas

- **Laravel** (Backend, API REST)
- **MySQL** (Base de datos)
- **JavaScript** (Frontend)
- **Firebase Storage** (Almacenamiento de imágenes en la nube)
- **Tailwind CSS** (Estilos)
- **Postman** (Pruebas de API)

## Pasos básicos para clonar y ejecutar el sistema

1. **Clona el repositorio:**
   ```sh
   git clone https://github.com/tuusuario/tu-repo.git
   ```

2. **Instala dependencias del backend:**
   ```sh
   cd backend3/catalogo-laravel
   composer install
   cp .env.example .env
   php artisan key:generate
   ```

3. **Configura la base de datos en el archivo `.env`**  
   (ajusta DB_DATABASE, DB_USERNAME, DB_PASSWORD según tu entorno).

4. **Ejecuta las migraciones y seeders:**
   ```sh
   php artisan migrate --seed
   ```

5. **Configura las URLs de Firebase Storage en el seeder de productos**  
   (si quieres usar tus propias imágenes).

6. **Inicia el servidor de Laravel:**
   ```sh
   php artisan serve
   ```

7. **Abre el frontend en tu navegador:**  
   Navega a la carpeta `Frontend` y abre `index.html` o el archivo principal.

8. **(Opcional) Prueba la API con Postman:**  
   Usa las rutas `/api/productos`, `/api/login`, `/api/register`, etc.

---

**¡Listo! Ahora puedes usar y mostrar tu catálogo de productos con imágenes en la nube.**

> Recuerda: Si necesitas subir imágenes nuevas, hazlo en Firebase Storage y actualiza las URLs en la base de datos o el seeder.
