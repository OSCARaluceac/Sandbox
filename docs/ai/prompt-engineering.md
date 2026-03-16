# Guía de Prompt Engineering - TaskFlow

## 1. Prompt de Arquitecto Senior (Rol)
* **Prompt:** "Actúa como un Desarrollador Senior de Software con 10 años de experiencia en JavaScript. Revisa la función de renderizado de TaskFlow y sugiere 3 optimizaciones de rendimiento."
* **Por qué funciona:** Al establecer un rol, la IA prioriza patrones de diseño avanzados y eficiencia sobre soluciones básicas.

## 2. Refactorización Estricta (Restricciones)
* **Prompt:** "Refactoriza la función de guardado en localStorage. Restricción: No utilices variables globales y asegúrate de que el código no supere las 15 líneas."
* **Por qué funciona:** Las restricciones obligan a la IA a ser creativa y concisa, eliminando el "ruido" o código redundante.

## 3. Generación de Pruebas (Few-Shot)
* **Prompt:** "Aquí tienes un ejemplo: Entrada: 'Comprar pan' -> Salida: {id: 1, texto: 'Comprar pan', completada: false}. Ahora, genera la lógica para una misión de Rango S con categoría 'Caza'."
* **Por qué funciona:** Los ejemplos reducen la ambigüedad y aseguran que el formato de salida sea idéntico al que ya usas.

## 4. Análisis de Errores (Chain of Thought)
* **Prompt:** "Analiza por qué mi filtro de categorías no se actualiza inmediatamente. Piensa paso a paso: revisa el evento del botón, el estado global y la función de renderizado."
* **Por qué funciona:** Obliga a la IA a seguir una secuencia lógica, evitando que pase por alto detalles pequeños en el flujo de datos.

## 5. Auditoría de Seguridad (Rol + Negativo)
* **Prompt:** "Actúa como un experto en seguridad web. Analiza el manejo de IDs en mi formulario. No permitas el uso de `Math.random()` para generar IDs."
* **Por qué funciona:** Enfoca la atención en vulnerabilidades específicas y prohíbe soluciones mediocres.

## 6. Generación de Estilos Dinámicos (Contexto)
* **Prompt:** "Genera clases de Tailwind para una misión que está a punto de expirar. Debe verse urgente pero mantener la estética minimalista del Gremio."
* **Por qué funciona:** Combina el contexto visual con restricciones de diseño coherentes.

## 7. Documentación JSDoc (Estandarización)
* **Prompt:** "Documenta todas las funciones de `app.js` usando JSDoc. Usa un tono técnico, profesional y breve."
* **Por qué funciona:** Establece el tono y el formato, asegurando que la documentación sea uniforme.

## 8. Simplificación de Lógica (Optimización)
* **Prompt:** "Tengo este `if-else` anidado. Simplifícalo usando un objeto de mapeo o un operador ternario, pero mantén la legibilidad para principiantes."
* **Por qué funciona:** Equilibra la eficiencia técnica con la claridad del código.

## 9. Creación de Componentes (Few-Shot)
* **Prompt:** "Si un botón de Rango D es gris, y uno de Rango B es azul, genera el código CSS para un botón de Rango S que use un degradado dorado animado."
* **Por qué funciona:** Utiliza la progresión lógica para inferir un diseño de nivel superior.

## 10. Revisión Crítica de Código (Rol Crítico)
* **Prompt:** "Sé un crítico de código implacable. Encuentra 2 fallos de arquitectura en mi sistema de filtros de `app.js` y explícame cómo corregirlos."
* **Por qué funciona:** Rompe la tendencia de la IA a ser complaciente, forzándola a encontrar errores sutiles.