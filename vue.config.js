const path = require('path')
function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
	devServer: {
		host: "0.0.0.0"
	},
	chainWebpack: config => {
		config.resolve.alias
		    .set('assets', resolve('src/assets'))		  
	}
}