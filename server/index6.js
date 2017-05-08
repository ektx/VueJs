const fs = require('fs');
const server = require('express')();
const renderer = require('vue-server-renderer');

server.get('*', (req, res) => {
	// for url vue data
	const createApp = require('./bin/page-nav');
	const app = createApp({ url: req.url });

	// for hello.vue
	const context = {
		title: 'Hello Vue',
		meta: `<link rel="stylesheet" href="">`
	}

	renderer.createRenderer({
		template: fs.readFileSync('./tem/nav.vue', 'utf-8')
	})
	.renderToString(app, context, (err, html) => {
		if (err) {
			res.status(500).end('Internal Server Error');
			return;
		}

		res.end(html)
	})
});

server.listen(3000)
