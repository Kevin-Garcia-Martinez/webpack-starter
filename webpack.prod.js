
const HtmlWebPackPlugin       = require('html-webpack-plugin');
const CopyPlugin              = require('copy-webpack-plugin')
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
/* Plugin para miniminizar nuestro archivo js de producción */
const TerserPlugin            = require('terser-webpack-plugin');
/* Plugin para eliminar la carpeta dist/ cada que corramos el programa 
Utilizamos la destructuración de objetos, ya que solamente nos interesa
de este paquete la clase/función CleanWebpackPlugin  */
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');

module.exports = {

    mode: 'production',
    /* Este es el  módulo que utilizaremos para miniminizar el código de css */
    optimization: {
        minimize: true,
        minimizer: [ 
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin({
                test: /\.js(\?.*)?$/i, 
            })
         
        ],
    },

    /* Crearemos nuestro archivo de salida 'main.js' de manera semi-manual */
    output: {
        /* Asignaremos un nombre a nuestro archivo de salida, es necesario añadir un hash a nuestro archivo
        que será desplegado en el servidor, esto se realiza de este modo debido a que cada vez que despleguemos
        nuestro archivo a producción este tendrá un código distinto, por lo que evitaremos que los navegadores 
        de nuestros clientes almacenen en caché este archivo JS, de tal modo que cuando se realicé un cambio
        significativo en la aplicación este sea detectado por el navegador del cliente y por consiguiente este 
        realicé de nuevo la petición HTTP del archivo de JavaScript al servidor.  */
        filename: 'main-production.[contenthash].js'
    },
    
    module: {
        rules: [
            /* Declaramos una nueva regla para BABEL, como BABEL trabaja con base en JavaScript, esta
            regla solamente afectará a los archivos de JavaScript. */
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
                
            {
                /* Para todos los archivos .css utiliza los siguientes loaders, todos los estilos los
                agrega internamente al archvio main.js cuando se hace uso de 'import', los añade internamente
                al archivo main-production.js */
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },

            {
                /* Especificaremos una regla específica para nuestro achivo de estilos globales*/
                test: /styles\.css$/, 
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },

            {
                /* Para todos los archivos html */ 
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize: false
                },
            },
             
            {
                /* Regla de los archivos assets */    
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: 'assets/[name].[ext]'
                        }

                    }
                ] 

            }

        ]
    },

    /* En este apartado se especifican los plugins que se van a utilizar  */
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html', 
            filename: './index.html' 
        }),
        /* Colocamos el plugin para crear nuestro archivo global de css */
        new MiniCssExtractPlugin({
            filename: 'main-production.[contenthash].css',
            ignoreOrder: false
        }),
        /* Copiamos toda la carpeta assets a la carpeta dist */
        new CopyPlugin({
            patterns:[
                { from: 'src/assets', to: 'assets/' }
            ],
        }),

        new CleanWebpackPlugin(),
    ]

}