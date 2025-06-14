# Proyecto-Catalogo-Laravel

Catálogo web de productos con backend Laravel, frontend JavaScript y almacenamiento de imágenes en Firebase Storage. Permite gestión de productos y categorías por administradores, y visualización por clientes. Proyecto documentado y versionado en GitHub.

---

## Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Puesta en Marcha](#instalación-y-puesta-en-marcha)
- [Configuración de Firebase Storage](#configuración-de-firebase-storage)
- [Uso del Sistema](#uso-del-sistema)
- [Rutas Principales](#rutas-principales)
- [Notas de Seguridad](#notas-de-seguridad)
- [Licencia](#licencia)

---

## Descripción

Este proyecto es un catálogo de productos desarrollado con **Laravel** (backend API RESTful) y **JavaScript** (frontend), que permite la visualización de productos y la gestión de imágenes mediante **Firebase Storage**. Incluye autenticación de usuarios con roles de **administrador** y **cliente**. Los administradores pueden crear, editar y eliminar productos y categorías; los clientes pueden visualizar el catálogo.

---

## Tecnologías utilizadas

- **Laravel** (Backend, API REST)
- **MySQL** (Base de datos)
- **JavaScript** (Frontend)
- **Firebase Storage** (Almacenamiento de imágenes en la nube)
- **Tailwind CSS** (Estilos)
- **Postman** (Pruebas de API)

---

## Estructura del Proyecto

```
ProyectoAW_Catalgo/
│
├── backend3/
│   └── catalogo-laravel/
│       ├── app/
│       ├── bootstrap/
│       ├── config/
│       ├── database/
│       ├── public/
│       ├── resources/
│       ├── routes/
│       ├── storage/
│       ├── tests/
│       ├── .env.example
│       ├── .gitignore
│       ├── composer.json
│       └── ...
│
└── Frontend/
    ├── admin_panel.js
    ├── admin.html
    ├── app.js
    ├── contacto.html
    ├── crear_producto.html
    ├── crear_producto.js
    ├── detalle.html
    ├── editar_producto.html
    ├── editar_producto.js
    ├── index.html
    ├── login.html
    ├── Tienda.html
    └── images/
```

---

## Instalación y Puesta en Marcha

### 1. Clona el repositorio

```sh
git clone https://github.com/tuusuario/tu-repo.git
```

### 2. Instala dependencias del backend

```sh
cd backend3/catalogo-laravel
composer install
cp .env.example .env
php artisan key:generate
```

### 3. Configura la base de datos en el archivo `.env`

Edita los valores de:

```
DB_DATABASE=tu_base_de_datos
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
```

### 4. Ejecuta las migraciones y seeders

```sh
php artisan migrate --seed
```

### 5. Configura las URLs de Firebase Storage

- Ve a tu [Firebase Console](https://console.firebase.google.com/).
- Crea un proyecto y un bucket de Storage.
- Copia la configuración en los archivos JS del frontend (`crear_producto.js`, `editar_producto.js`).
- **No subas tus claves reales a GitHub.**

### 6. Inicia el servidor de Laravel

```sh
php artisan serve
```

### 7. Abre el frontend en tu navegador

Navega a la carpeta `Frontend` y abre `index.html` o el archivo principal.

### 8. (Opcional) Prueba la API con Postman

Usa las rutas `/api/productos`, `/api/login`, `/api/register`, etc.

---

## Uso del Sistema

- **Administradores:**  
  - Pueden crear, editar y eliminar productos y categorías desde el panel de administración (`admin.html`).
  - Gestionan imágenes de productos en Firebase Storage.
- **Clientes:**  
  - Pueden visualizar productos, buscar y filtrar por categorías en la tienda (`Tienda.html`).
  - Ver detalles de productos (`detalle.html`).

---

## Rutas Principales

### Frontend

- `/Frontend/index.html` — Página principal
- `/Frontend/Tienda.html` — Catálogo de productos
- `/Frontend/login.html` — Login de usuarios
- `/Frontend/admin.html` — Panel de administración (solo admin)
- `/Frontend/crear_producto.html` — Crear producto (solo admin)
- `/Frontend/editar_producto.html` — Editar producto (solo admin)
- `/Frontend/contacto.html` — Contacto

### Backend (API Laravel)

- `POST /api/login` — Login de usuario
- `POST /api/register` — Registro de usuario
- `GET /api/productos` — Listar productos
- `POST /api/productos` — Crear producto (admin)
- `PUT /api/productos/{id}` — Editar producto (admin)
- `DELETE /api/productos/{id}` — Eliminar producto (admin)
- `GET /api/categorias` — Listar categorías

---

## Notas de Seguridad

- **No subas tu archivo `.env` real ni claves privadas de Firebase a GitHub.**
- Usa `.env.example` para compartir la estructura de configuración.
- No subas carpetas `/storage`, `/vendor`, `/node_modules`, ni archivos de caché o logs.
- Revisa tu código antes de hacer público el repositorio.

---

## Licencia

Este proyecto está bajo la licencia MIT.  
Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

**¡Listo! Ahora puedes usar y mostrar tu catálogo de productos con imágenes en la nube.**

> Si necesitas subir imágenes nuevas, hazlo en Firebase Storage y actualiza las URLs en la base de datos o el seeder.
