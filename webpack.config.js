/* 
Este es nuestro archivo global de configuración, este archivo
lo buscará por defecto en el atributo "build":"webpack"

Asi se recomienda especificarlo en la documentación 
si ponemos 'mode: 'production', el código se verá lo
más reducido posible, sin comentarios y lo más limpio posible
pero como queremos ver nuestros comentarios y todo lo demás en
el código, necesitamos especificar el 'mode: 'development' '*/

/* require es una manera que tiene Node.js para cargar archivos de otros paquetes,
es decir, estamos requiriendo ese paquete en esta aplicación */

const HtmlWebPackPlugin       = require('html-webpack-plugin');
const CopyPlugin              = require('copy-webpack-plugin')
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = {
    mode: 'development',
    /* Dentro de la propiedad optimization podemos especificar
    el plugin de css que acabamos de instalar, el cual sólo funcionará
    cuando el modo especificado sea de 'producción' mode: 'production'*/
    optimization: {
        minimizer: [ new OptimizeCssAssetsPlugin() ]
    },
    /* Dentro de 'module' especificar reglas, con las cuales le indicamos a 
    webpack el comportamiento que debe de tener con ciertos tipos de archivos y
    demás cosas... */
    module: {
        rules: [
            {
                /* Para todos los archivos .css utiliza los siguientes loaders */
                test: /\.css$/,
                /* Necesitamos excluir el archivo de estilos globales 'styles.css', ya que 
                la expresión regular anterior se aplica a todos los archivos .css que se 
                encuentren en la carpeta 'src' */
                exclude: /styles\.css$/,
                /* loaders que se van a utilizar; los archivos css se utilizaran solamente en los
                módulos que los requieran, los que hayan utilizado 'import' */
                use: [
                    /* style-loader es para que agregue los css al bundle de la aplicación */
                    'style-loader',
                    'css-loader'
                ]
            },

            /* Especificaremos una regla específica para nuestro achivo de estilos
            globales*/
            {
                test: /styles\.css$/, 
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },

            /* Cada regla se comienza a definir como un objeto literal */
            {
                /* Cada regla debe de tener un 'test', la cual es la condición que webpack tiene que hacer
                cuando este leyendo archivo por archivo, y esta condición se va aplicar si el archivo cumple
                con la expresión regular que se especifique. Con esto /\.html$/ le indicamos a webpack que
                aplique esta regla si es un archivo con extensión .hmtl */
                test: /\.html$/,
                /* Aquí especificamos lo que se va a hacer en caso de que se cumpla lo anterior  */
                loader: 'html-loader',
                options: {
                    attributes: false,
                     /* Con el loader podemos minizar los archivos 'html' que tenemos, de este modo estos serán
                     leídos por el navegador con una mayor rapidez, omitiendo comentarios y espacios en blanco
                     que pudiesen tener nuestros archivos '.html' */
                    minimize: false,
                },

            },

            {
                /* Para todos los archivos .js utiliza lo siguiente */
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            
            },
            /* Regla de los archivos assets */ 
            {
                /* Debemos colocar una expresión regular que evaluará cualquier imagen/asset que queramos utilizar */
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }

                    }
                ] 

            }

        ]
    },
    /* En este apartado se especifican los plugins que se van a utilizar  */
    plugins: [
        new HtmlWebPackPlugin({
            /* Aquí especificaremos la configuración del plugin */
            template: './src/index.html', /* Le indicamos a webpack que archivo tomar */
            filename: './index.html' /* Le indicamos a webpack en donde lo queremos colocar*/
            /* Cuando ejecutemos el comando npm build, webpack automáticamente creará la importación
            del 'script' en donde pondrá el archivo main.js, ya lo hace por nosotros, por lo que
            podemos quitarlo de nuestro archivo 'index.html'  */
        }),

        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false
        }),
        
        new CopyPlugin({
            patterns:[
                { from: 'src/assets', to: 'assets/' }
            ],
        })
    ]

}