const path = require('path'); // 引入一個依賴
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/main.js', // 入口
    output: { // 出口
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,                
                exclude: /(node_modules|bower_components)/, // 排除 node_modules 與 bower_components 底下資料
                use: {                    
                    loader: 'babel-loader',
                },
            },             
            {
                test: /\.s[ac]ss$/i, // 把 sass-loader 放在首要處理 (第一步)
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [        
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html'
        }),   
        new CleanWebpackPlugin(),     
    ],    
    resolve: {
        alias: {
          '@img': path.resolve(__dirname, 'src/img'), // 設定圖片路徑別名
        },
    },        
};