module.exports = {
    target: 'webworker',
    entry: './index.js',
    mode: process.env.NODE_ENV || "development",
    devtool: 'cheap-module-source-map',
};
