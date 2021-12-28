module.export = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: __dirname,
        filename: 'app/js/main.js',
        publicPath: '/',
    },
    devServer: {
        historyApiFallback: true,
      },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    }

}