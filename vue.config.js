const path = require('path')
function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
	publicPath: '/mall',
	devServer: {
		host: "0.0.0.0"
	},
	chainWebpack: config => {
		config.resolve.alias
		    .set('assets', resolve('src/assets'))		  
	}
}