/* Importamos el archivo .css que vamos a utilizar en nuestra aplicación, es decir,
le indicamos a nuestro archivo .js que va a requerir utilizar este archivo .css  */
import '../css/funciones.css'
/* Podemos indicarle a JavaScript cuales son las funciones que deseamos
exportar 'export' a otros módulos, es decir, qué funciones pueden utilizar
otros módulos/archivos.js cuando hacen uso de 'import'. Si no hacemos uso 
de la palbra 'export', lo que sucederá es que JavaScript va a bloquear la 
función/clase/ect de tal modo que no podamos utilizarla fuera de este módulo, 
en otras palabras, bloquea que otros archivos .js puedan acceder a esta función  */

export const saludar = ( nombre )=>{
    console.log('Creando etiqueta h1');
    const h1 = document.createElement('h1');
    h1.innerText = `Hola, ${ nombre }, ¿Cómo estás? `;
    /* Añadimos la etiqueta que creamos al body */
    document.body.append( h1 );

}
