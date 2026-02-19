    Instrucciones
Revisa las instrucciones específicas.

Desarrolla todo lo solicitado.

Sigue las indicaciones de entrega.

Especificaciones del Desarrollo
1. Declarar e inicializar variables para:
Nombre del jugador (string).

Edad (number).

Altura (number).

Posición (string).

2. Validaciones con sentencias condicionales (if-else):
Verificar que los valores ingresados sean válidos (nombre tipo String, edad mayor a 15 años, altura mínima de 160 cm, posición existente).

Determinar si el jugador cumple con los requisitos mínimos.

3. Uso de operadores lógicos y de comparación:A
Comparar altura y edad para clasificar al jugador (categoría juvenil o adulto).

4. Condiciones de borde:
¿Qué pasa si el usuario ingresa una edad no válida?

¿Y si deja el campo vacío?

¿Qué sucede si la posición ingresada no existe?


1 Edad no válida: El programa debe detectar el error mediante un if y mostrar un mensaje advirtiendo que la edad es incorrecta o no cumple el mínimo.

2 Campo vacío: JavaScript recibirá un valor vacío o NaN, por lo que se debe validar la entrada para evitar que el registro continúe sin datos.

3 Posición inexistente: Aunque el select limita las opciones, si se ingresa un valor extraño, el código debe usar un else para indicar que la posición no es válida para el torneo.