# 🗓️ Aplicación de Gestión de Eventos

## Descripción

Una aplicación web que permite a los usuarios gestionar eventos de manera sencilla, proporcionando una interfaz intuitiva y fácil de usar.

### Características principales

-  **Crear eventos** con nombre, fecha, hora, descripción y ubicación.
-  **Buscar eventos** por fecha y ubicación.
-  **Editar y eliminar eventos** existentes.
-  **Registro e inicio de sesión** para asociar eventos con la cuenta de usuario.
-  **Diseño responsivo** con Material-UI.
-  **Visualización de eventos** en una lista organizada.
-  **Protección de rutas** con autenticación JWT.

##  Tecnologías utilizadas

### **Frontend:**

-  **React.js**
-  **Material-UI**
-  **React Router Dom**
-  **Axios**

### **Backend:**

-  **Node.js**
-  **Express.js**
-  **MongoDB con Mongoose**
-  **bcryptjs** (para encriptación de contraseñas)
-  **jsonwebtoken** (para autenticación con JWT)
-  **CORS**
-  **Dotenv**
-  **Nodemon** (para desarrollo)

## 📂 Estructura del proyecto

```
📂 Estructura del proyecto
📁 gestion-de-eventos
 ├── 📁 backend
 │   ├── 📁 src
 │   │   ├── 📁 config
 │   │   ├── 📁 controllers
 │   │   ├── 📁 middlewares
 │   │   ├── 📁 models
 │   │   ├── 📁 routes
 │   ├── 📄 server.js
 │   ├── ⚙️ .env
 ├── 📁 frontend
 │   ├── 📁 public
 │   ├── 📁 src
 │   │   ├── 📁 components
 │   │   ├── 📁 pages
 │   │   ├── 📄 styles
 │   ├── ⚙️ .env
 │   ├── 📄 package.json
 ├── 📄 README.md
 ├── 🔶 .gitignore
```
## Instalación y configuración

### **Backend**

1. Clonar el repositorio y acceder al backend:
   ```sh
   git clone https://github.com/CassieNeko/gestion-de-eventos.git
   cd gestion-de-eventos/backend
   ```
2. Instalar dependencias:
   ```sh
   npm install express mongoose bcryptjs jsonwebtoken dotenv cors
   npm install --save-dev nodemon
   ```
3. Crear un archivo `.env` y definir variables de entorno como la conexión a MongoDB.
4. Ejecutar el servidor:
   ```sh
   npm run start
   ```

### **Frontend**

1. Desde la carpeta raíz, acceder al frontend:
   ```sh
   cd frontend
   ```
2. Instalar dependencias:
   ```sh
   npm install react-router-dom axios @mui/material @emotion/react @emotion/styled @mui/icons-material
   ```
3. Ejecutar la aplicación:
   ```sh
   npm start
   ```

## Comandos de instalación

### **Backend**

```sh
npm install express mongoose bcryptjs jsonwebtoken dotenv cors
npm install --save-dev nodemon
```

### **Frontend**

```sh
npm install react-router-dom axios @mui/material @emotion/react @emotion/styled @mui/icons-material
```

