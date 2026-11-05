# Explorer App

Aplicación web desarrollada con **React, TypeScript, Vite y Tailwind CSS**, que permite explorar diferentes países y consultar información relevante de cada uno.

## Características

- Visualización de países mediante tarjetas.
- Búsqueda de países por nombre.
- Filtrado de países por región.
- Búsqueda y filtrado simultáneos.
- Visualización de información detallada de cada país.
- Diseño adaptable a dispositivos de escritorio y móviles.
- Menú de navegación para dispositivos móviles.
- Componentes reutilizables y organizados.

## Tecnologías utilizadas

- **React:** biblioteca para construir interfaces de usuario.
- **TypeScript:** lenguaje que permite trabajar con tipado estático.
- **Vite:** herramienta para desarrollo y compilación.
- **Tailwind CSS:** framework para los estilos y diseño adaptable.
- **JavaScript:** lógica de la aplicación.

## Estructura del proyecto

```text
explorer-react/
├── public/
├── src/
│   ├── components/
│   │   ├── atoms/
│   │   ├── molecules/
│   │   └── organisms/
│   ├── data/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── App.css
│   └── index.css
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Instalación y ejecución

Para ejecutar el proyecto localmente, sigue estos pasos:

### 1. Clonar el repositorio

```bash
git clone https://github.com/emeraul1/explorer-react.git
```

### 2. Ingresar a la carpeta del proyecto

```bash
cd explorer-react
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

### 5. Abrir la aplicación

Vite mostrará una dirección local en la terminal, normalmente:


http://localhost:5173/


## Compilación para producción

Para generar la versión de producción:

```bash
npm run build
```

Para visualizar la compilación localmente:

```bash
npm run preview
```

## Organización de componentes

El proyecto utiliza una arquitectura basada en componentes reutilizables:

- **Atoms:** componentes pequeños, como insignias y banderas.
- **Molecules:** componentes que agrupan elementos, como tarjetas de países y barra de búsqueda.
- **Organisms:** componentes más completos, como encabezados, cuadrículas y detalles de países.

El estado principal se administra en `App.tsx` mediante el hook `useState` de React y se comparte con los componentes hijos mediante props y funciones callback.

## Autor

** Emerson Raul Ventura Castillo**

Proyecto académico de diseño y desarrollo de interfaces web adaptables.

## Licencia

Proyecto desarrollado con fines educativos.