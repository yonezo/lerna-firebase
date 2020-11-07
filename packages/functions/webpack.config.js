const fs = require('fs')
const path = require('path')
const GenerateJsonPlugin = require('generate-json-webpack-plugin')

const pkg = require('./package.json')
const externals = ['firebase-admin', 'firebase-functions']
const genPackage = () => ({
  name: 'functions',
  private: true,
  main: 'index.js',
  license: 'UNLICENSED',
  engines: pkg.engines,
  dependencies: externals.reduce(
    (acc, name) =>
      Object.assign({}, acc, {
        [name]: pkg.dependencies[name] || pkg.devDependencies[name],
      }),
    {}
  ),
})

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)
const appDist = resolveApp('dist')

module.exports = {
  target: 'node',
  mode: 'production',
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: appDist,
    libraryTarget: 'commonjs',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  externals: externals.reduce(
    (acc, name) => Object.assign({}, acc, { [name]: true }),
    {}
  ),
  plugins: [
    new GenerateJsonPlugin('package.json', genPackage()),
  ],
}
