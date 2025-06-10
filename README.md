# Prueba Técnica Rick & Morty API (TypeScript)

## Descripción

Este template es el punto de partida para una prueba técnica de backend. El objetivo es implementar un endpoint `/characters` que busque personajes de Rick & Morty usando la API pública, persistiendo resultados en una base de datos local y agregando un sistema de caché en memoria.


## Tecnologías utilizadas

- Node.js (v18+)
- TypeScript
- Express
- SQLite (con Sequelize ORM)
- Axios para peticiones HTTP
- Jest y ts-jest para testing

## Estructura del proyecto

```
/src
  /controllers       # Controladores para manejar la lógica de negocio
  /routes            # Definición de rutas de la API
  /middlewares       # Middleware para logging y otras funcionalidades
  /services          # Servicios para conectar con APIs externas
  /db                # Configuración y modelos de la base de datos
  /tests             # Tests unitarios
  /types             # Interfaces y tipos de TypeScript
```

## Requisitos

- Node.js v18 o superior
- npm

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/homecu/backend-node-test-template.git
cd backend-test-template
```

2. Instala las dependencias:
```bash
npm install
```

3. Copia el archivo de configuración:
```bash
cp .env.example .env
```

4. Inicia el servidor en modo desarrollo:
```bash
npm run dev
```

## Comandos disponibles

- `npm run build` - Compila los archivos TypeScript a JavaScript
- `npm start` - Inicia el servidor en modo producción (requiere build previo)
- `npm run dev` - Inicia el servidor en modo desarrollo con recarga automática
- `npm test` - Ejecuta los tests unitarios

## Objetivo de la prueba

El objetivo de esta prueba técnica es implementar un endpoint `/characters` que:

1. Busque personajes de Rick & Morty por nombre usando la API pública
2. Persista los resultados en una base de datos SQLite
3. Implemente un sistema de caché en memoria para la última consulta
4. Utilice un middleware de logging para registrar información de cada petición
5. Opcionalmente, agregue filtros por especie y/o género

## Especificaciones del endpoint `/characters`

### Parámetros de consulta

- `name` (obligatorio): Nombre del personaje a buscar
- `species` (opcional): Filtrar por especie
- `gender` (opcional): Filtrar por género

### Ejemplo de uso

```
GET /characters?name=rick&species=human&gender=male
```

### Flujo de funcionamiento

1. Recibir un parámetro `name` obligatorio para buscar personajes
2. Recibir parámetros opcionales `species` y `gender` para filtrar resultados
3. Buscar primero en la base de datos local
4. Si no encuentra resultados, consultar la API pública y guardar los resultados
5. Implementar un sistema de caché para optimizar consultas repetidas
6. Retornar los resultados en formato JSON

### Respuesta esperada

La API debe devolver un array de personajes que coinciden con los criterios de búsqueda, en formato JSON.

## Archivos a modificar

Deberás implementar la funcionalidad en los siguientes archivos:

- `src/controllers/characterController.ts`: Implementar la lógica del controlador para buscar y filtrar personajes
- `src/middlewares/logger.ts`: Completar el middleware de logging para registrar información de las peticiones
- Puedes utilizar o modificar el archivo `src/services/cache.ts` para la implementación del caché

## Recursos disponibles

- La API pública de Rick & Morty está disponible en: https://rickandmortyapi.com/api/character
- Puedes usar el servicio ya implementado en `src/services/rickAndMortyApi.ts`
- El modelo de base de datos ya está configurado en `src/db/models.ts`
- Las rutas ya están configuradas en `src/routes/characterRoutes.ts`

## Componentes a implementar

1. **Controller de Characters**: Implementar la lógica para buscar personajes en la base de datos o en la API
2. **Sistema de caché**: Implementar un mecanismo para almacenar en memoria la última consulta
3. **Middleware de logging**: Completar el middleware para registrar información relevante de cada petición

## Desarrollo

Para ejecutar el servidor en modo desarrollo con recarga automática:

```bash
npm run dev
```

Para ejecutar el servidor en modo producción:

```bash
npm start
```

## Tests

Se incluyen tests unitarios que deberás hacer pasar a medida que implementes la funcionalidad.

Para ejecutar los tests:

```bash
npm test
```

## Criterios de evaluación

- Funcionalidad completa del endpoint `/characters`
- Implementación correcta del sistema de caché
- Implementación correcta del middleware de logging
- Manejo adecuado de errores
- Calidad del código
- Tests unitarios pasando correctamente

¡Buena suerte!