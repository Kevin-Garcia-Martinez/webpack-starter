/* Cuando utilizamos la palabra reservada 'import' y 'from', 
siempre se buscará un archivo con extensión .js, sin importar
que tengamos dos archivos llamados igual, solamente buscará los
.js  */
import { saludar } from './js/funciones';
/* Para importar un archivo de estilos que se encuentra al mismo nivel que el archivo .js
y en el mismo directorio 'src' utilizamos "./"*/
import './styles.css'

const nombre = 'Kevin García'

saludar( nombre );