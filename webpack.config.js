const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
 
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/main.js',
    },

    // ...previous Webpack config...
    module: {
        rules: [
            // ...additional rules...

              {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },

            
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },

// module: {
//         rules: [
//             {
//                 test: /\.m?js$/,
//                 exclude: /(node_modules|bower_components)/,
//                 use: {
//                     loader: 'babel-loader',
//                     options: {
//                         presets: ['@babel/preset-env'],
//                     },
//                 },
//             },
//             // ...additional rules...
//         ],
//     },

   // ...previous Webpack config...
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/test.css",
        }),
    ],
};
