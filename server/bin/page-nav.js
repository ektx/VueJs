const Vue = require('vue');

module.exports = function createApp( _data ) {
		Vue.component('page', {
			template: '\
				<div v-show="selected">\
					<slot></slot>\
				</div>\
			',
			props: {
				name: { required: true },
				link: { required: true },
				active: { default: false }
			},
			data: function() {
				return {
					selected: this.active
				}
			},
			computed: {
				hashLink: function() {
					return '#'+ this.link
				}
			}
		})

		Vue.component('page-nav', {
			template: `
				<div>
					<div class="btn-box">
						<a class="btn" v-for="page in pages" :href="page.hashLink" :class="{'btn-d': !page.selected, 'hover': page.selected}" @click="selectNav(page)">
						   {{page}}
						</a>
					</div>
					<div class="page-detail">
						<slot></slot>
					</div>
				</div>
			`,
			data: function() {
				return {
					pages: []
				}
			},
			created: function() {
				this.pages = this.$children
			},
			methods: {
				selectNav: function(page) {
					this.pages.forEach(function(item, index) {
						item.selected = (item.name === page.name)
					})
				}
			}
		});

	return new Vue({
		template: `<div id="app">
		<page-nav>
			<page name="Mac" link="detail" active="true">
				<h1>Mac</h1>
			</page>
			<page name="iPhone" link="detail2">
				<h1>iPhone</h1>
			</page>
		</page-nav>
	</div>`
	})
}