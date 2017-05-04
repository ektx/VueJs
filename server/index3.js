const server = require('express')();
const renderer = require('vue-server-renderer').createRenderer();
const createApp = require('./bin/url');

server.get('*', (req, res) => {

	const context = { url: req.url }
	const app = createApp( context )

	renderer.renderToString(app, (err, html) => {
		if (err) {
			res.status(500).end('Internal Server Error');
			return;
		}

		res.end(html)
	})
});

server.listen(3000)