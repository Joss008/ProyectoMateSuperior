# 🍕 Mate Superior - Sistema Integral de Gestión para Negocios de Comida

**Proyecto educativo para Feria de Exposición de Matemáticas**

Este sistema demuestra cómo los temas de Matemática Superior se aplican en el desarrollo de un software real de gestión para un negocio de comida y delivery.

---

## 🚀 Instalación y Uso (Sin base de datos, funciona en cualquier PC)

### Requisitos
- **Node.js** instalado (https://nodejs.org) — versión 16 o superior.

### Pasos para correrlo

```bash
# 1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>

# 2. Entrar a la carpeta del backend
cd ProyectoMateSuperior/backend

# 3. Instalar dependencias (solo la primera vez)
npm install

# 4. Iniciar el servidor
node server.js
```

### 5. Abrir en el navegador
```
http://localhost:3000
```

---

## 👤 Credenciales por Defecto

| Campo    | Valor                      |
|----------|----------------------------|
| Correo   | admin@matesuperior.com     |
| Password | admin123                   |
| Rol      | Administrador              |

> Puedes crear cuentas nuevas desde la pantalla de Registro.

---

## 🧮 Módulos Matemáticos

| Módulo | Tema | Autor |
|--------|------|-------|
| 🍔 Lógica y Conjuntos | Teoría de Conjuntos y Lógica Proposicional | Sugey y Josie |
| 🛵 Grafos: Delivery | Grafos Ponderados (Dijkstra) | Joaquín |
| 🎟️ Permutaciones: Cupones | Permutaciones sin repetición | Miguel |
| 🧠 Recursividad: Sugerencias | Algoritmos Recursivos | Fabricio |
| 💰 Árboles: Finanzas | Árboles Jerárquicos (Post-orden) | Leandro |
| 💳 Autómatas: Pagos | Autómatas Finitos Deterministas | Kevin |
| 🗺️ Árbol Mínimo: Expansión | Árbol de Expansión Mínima (Kruskal) | Kevin |

---

## 📁 Estructura del Proyecto

```
ProyectoMateSuperior/
├── backend/
│   ├── config/
│   │   └── jsonDb.js        # Base de datos en archivo JSON (sin MySQL)
│   ├── controllers/
│   │   └── authController.js
│   ├── data/
│   │   └── db.json          # Archivo de base de datos (usuarios)
│   ├── routes/
│   │   └── authRoutes.js
│   └── server.js
└── frontend/
    ├── css/
    ├── js/
    ├── modules/             # Módulos matemáticos interactivos
    ├── index.html           # Login
    ├── panel.html           # Dashboard principal
    └── register.html
```

---

## ⚙️ Tecnologías

- **Backend:** Node.js + Express
- **Base de datos:** Archivo JSON local (sin instalación)
- **Autenticación:** JWT + Bcrypt
- **Frontend:** HTML5, CSS3 (Variables CSS / Dark Mode), JavaScript Vanilla
