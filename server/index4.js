

const Vue = require('vue');
const server = require('express')();

const renderer = require('vue-server-renderer').createRenderer({
	template: require('fs').readFileSync('./tem/hello.vue', 'utf-8')
});
const createApp = require('./bin/url');

const context = {
	title: 'Hello Vue',
	meta: `<link rel="stylesheet" href="">`
}
server.get('*', (req, res) => {
	
	const app = createApp({ url: req.url })

	renderer.renderToString(app, context, (err, html) => {
		if (err) {
			res.status(500).end('Internal Server Error');
			return;
		}

		res.end(html)
	})
});

server.listen(3000)