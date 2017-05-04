const Vue = require('vue');

module.exports = function createApp( _data ) {
	return new Vue({
		data: {
			url: _data.url
		},
		template:  `<div>The visited URL is {{ url }}</div>`
	})
}