module.exports = {
    entry:  __dirname + '/src/index.tsx',
    output: {
        filename: 'bundle.js',
        path:     __dirname + '/dist'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/, loader: 'ts-loader'
            },
            {
                test: /\.css$/,
                use:  ['style-loader', 'css-loader']
            }

        ]
    },
    watch: true
};
