const path = require('path');

module.exports = {
    entry: './src/main/webapp/src/app.js',
    devtool: 'sourcemaps',
    cache: true,
    mode: 'development',
    output: {
        path: __dirname,
        // filename: './src/main/resources/static/built/bundle.js',
        filename: './target/classes/static/built/bundle.js'
    },
    module: {
        rules: [
            {
                // look for .js or .jsx files
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }]
            },
            {
                // look for .css or .scss files
                test: /\.s[ac]ss$/i,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            discardDuplicates: true,
                            importLoaders: 1,
                            // This enables local scoped CSS based in CSS Modules spec
                            modules: true,
                            // generates a unique name for each class (e.g. app__app___2x3cr)
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ]
            },
        ]
    }
};