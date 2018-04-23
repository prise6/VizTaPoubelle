var webpack = require("webpack");
var path = require("path");

// const extractSass = new ExtractTextPlugin({
//   filename: "style.css",
//   disable: mode === "development"
// });

module.exports = {
  context: path.join(__dirname, "src"),
  entry: "./js/client.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "client.min.js"
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },

      {
        test: /\.(png|woff|woff2|eot|ttf|svg|otf|jpe?g|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      }
    ]
  },

  plugins: [new webpack.optimize.OccurrenceOrderPlugin()]
};