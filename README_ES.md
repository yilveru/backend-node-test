# Prueba Técnica Rick & Morty API (TypeScript)

## Descripción

Este proyecto es para mostrar como implementar api REST externas para manipular la data, almacenarla y cachearla para un correcto manejo de la informacion y velocidad requerida para servirla a los usuarios finales.

El servicio funciona con SQLite y puede almacenar la data teniendo en cuenta que se debe crear el las variables de entorno correctas, tal y como se encuentra en el archivo .env.example, si se modifica algun nombre de variable se debe ajustar en el codigo.


## Requisitos

- Node.js v18 o superior
- npm

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/yilveru/backend-node-test.git
cd backend-node-test
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

## Consumo API

Para una ejecución local al iniciar el servicio se debe ir a la siguiente url: http://localhost:3000/characters

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