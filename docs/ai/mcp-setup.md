# Configuración Model Context Protocol (MCP)

## Instalación y Conexión
1. Se configuró el archivo `.cursor/mcp.json` vinculando la ruta absoluta del proyecto.
2. Se activó el servidor `filesystem` para permitir el acceso de la IA a archivos locales no abiertos.

## Beneficios en TaskFlow
* **Contexto Total:** La IA ahora puede razonar sobre la relación entre el HTML y el JS sin que yo tenga que copiar y pegar código.
* **Mantenimiento:** Facilita la detección de errores en rutas de archivos y nombres de funciones en todo el proyecto.

## Validación
El sistema MCP se verificó mediante 5 consultas directas al sistema de archivos, obteniendo respuestas precisas sobre la estructura del Gremio.