const path = require('path');

const webpack = require('webpack');
const bootstrap = require('bootstrap');
// const $ = require('jquery');

module.exports = {
	context: path.resolve(__dirname, 'src'),

	entry: {
		main: './index.js',
	},
	output: {
		filename: './js/[name].js',
		path: path.join(__dirname, 'dist'),
	},
	devtool: 'eval-source-map',
	devServer: {
		hot: true,
		static: {
			directory: './dist',
			watch: true,
		},
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jquery: 'jquery',
			jQuery: 'jquery',
			'window.jquery': 'jquery',
			'window.jQuery': 'jquery',
		}),
	],
};
