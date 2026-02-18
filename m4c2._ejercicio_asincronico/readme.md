Instrucciones

1️⃣ Comprende el problema
1. Define tres escenarios posibles para el cálculo del envío:
a. Total de compra menor a $30.000 → envío no gratuito.
b. Total entre $30.000 y $70.000 → envío con descuento del 50%.
c. Total igual o mayor a $70.000 → envío gratuito.
2. Reflexiona: ¿qué tipo de estructura condicional necesitas usar?


(Pista: usa if, else if, else)

respuesta 

if (condición 1) {
   // escenario a
} else if (condición 2) {
   // escenario b
} else {
   // escenario c
}




5️⃣ Reflexiona
Responde brevemente (puedes dejar tus respuestas en comentarios dentro del
código):

• ¿Qué pasaría si omitieras la condición else if?

El programa solo evaluaría la primera condición (if) y luego pasaría directo al else  Esto podría provocar que el cálculo del envío sea incorrecto, porque no se estaría considerando el rango intermedio (descuento del 50%).

• ¿Qué diferencia hay entre == y === en JavaScript?
== compara solo el valor (conversión de tipo automática).
// === compara valor Y tipo de dato (comparación estricta).
// Ejemplo: "30" == 30 → true (convierte el texto a número)
//          "30" === 30 → false (string es distinto de number)


• ¿Qué tipo de variable (let, const o var) usarías para valores que no deben
cambiar?
 const, porque su valor no puede reasignarse.
 Es ideal para valores fijos como el costo de envío base o los límites de compra.


