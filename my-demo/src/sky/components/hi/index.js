import Sky_hi from './bin/sayHi';

Sky_hi.install = function(Vue) {
	Vue.component(Sky_hi.name, Sky_hi);
};

export default Sky_hi;