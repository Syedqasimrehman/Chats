const path =require('path');

module.exports={
    mode: 'development',
    entry: './scripts/send.js',
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'bundle.js'
    },
    watch: true
}