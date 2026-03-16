# Informe de Experimentos: Humano vs. IA

## 1. Algoritmos Base
| Desafío | Tiempo Manual | Tiempo con IA | Calidad Código |
| :--- | :--- | :--- | :--- |
| Palíndromos | 20 min | < 2 seg | IA: Más conciso, usa métodos encadenados. |
| Factorial ($n!$) | 15 min | < 1 seg | IA: Uso de operador ternario recursivo. |
| Buscador Picos| 40 min | < 2 seg | IA: Manejo de bordes más eficiente. |

## 2. Tareas del Proyecto (TaskFlow)
* **Agrupar por Categoría:** La IA usó `reduce()`, lo que simplificó 15 líneas de código manual a solo 4.
* **Ordenación S-D:** La implementación manual requería un `switch` complejo; la IA usó un mapa de prioridades.
* **Filtro de Fechas:** Manipular objetos `Date` manualmente es propenso a errores; la IA lo resolvió con lógica de milisegundos.