# Instrucciones para la Prueba Técnica (TypeScript)

## Objetivo

El objetivo de esta prueba técnica es implementar un endpoint `/characters` que:

1. Busque personajes de Rick & Morty por nombre usando la API pública
2. Persista los resultados en una base de datos SQLite
3. Implemente un sistema de caché en memoria para la última consulta
4. Utilice un middleware de logging para registrar información de cada petición
5. Opcionalmente, agregue filtros por especie y/o género

## Importante: Proyecto en TypeScript

Este proyecto ha sido convertido completamente a TypeScript. Todo el código debe escribirse en TypeScript, aprovechando las ventajas del tipado estático para crear un código más robusto y mantenible.

## Archivos a modificar

Deberás implementar la funcionalidad en los siguientes archivos:

- `src/controllers/characterController.ts`: Implementar la lógica del controlador para buscar y filtrar personajes
- `src/middlewares/logger.ts`: Completar el middleware de logging para registrar información de las peticiones
- Opcionalmente puedes modificar el archivo `src/services/cache.ts` para implementar el sistema de caché

## Funcionalidad del endpoint

El endpoint `/characters` debe:

1. Recibir un parámetro `name` obligatorio para buscar personajes
2. Recibir parámetros opcionales `species` y `gender` para filtrar resultados
3. Buscar primero en la base de datos local
4. Si no encuentra resultados, consultar la API pública y guardar los resultados
5. Implementar un sistema de caché para optimizar consultas repetidas
6. Retornar los resultados en formato JSON

## Recursos disponibles

- La API pública de Rick & Morty está disponible en: https://rickandmortyapi.com/api/character
- Puedes usar el servicio ya implementado en `src/services/rickAndMortyApi.ts`
- El modelo de base de datos ya está configurado en `src/db/models.ts`
- Las rutas ya están configuradas en `src/routes/characterRoutes.ts`

## Tests

Se incluyen tests unitarios que deberás hacer pasar a medida que implementes la funcionalidad.
Puedes ejecutar los tests con `npm test`.

## Criterios de evaluación

- Funcionalidad completa del endpoint `/characters`
- Implementación correcta del sistema de caché
- Implementación correcta del middleware de logging
- Manejo adecuado de errores
- Calidad del código
- Tests unitarios pasando correctamente

¡Buena suerte!
