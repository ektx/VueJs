const Vue = require('vue');

let app = new Vue({
	render: function(h) {
		return h('p', 'hello world')
	}
});

let renderer = require('vue-server-renderer').createRenderer();

renderer.renderToString(app, function(err, html) {
	if (err) throw err;

	console.log( html )
})