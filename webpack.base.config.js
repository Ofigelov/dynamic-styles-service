const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (env, argv) => {
    return {
        mode: 'production',
        entry: {
            'dc': './src/index.ts'
        },
        output: {
            filename: '[name].min.js',
            libraryTarget: 'umd'
        },
        resolve: {
            extensions: ['.ts'],
            modules: ['node_modules', path.resolve(__dirname, './src'), path.resolve(__dirname, './'), path.resolve(__dirname, './node_modules')]
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.(jsx?)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.(tsx?)$/,
                    loaders: [
                        {
                            loader: 'babel-loader'
                        },
                        {
                            loader: 'thread-loader',
                            options: {
                                // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                                workers: require('os').cpus().length - 1
                            }
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                happyPackMode: true // for thread-loader
                            }
                        }
                    ]
                }

            ]
        },
        plugins: [
            new ForkTsCheckerWebpackPlugin(),
            new CleanWebpackPlugin()
        ]
    };
};
