import uglify from 'rollup-plugin-uglify';

export default {
	entry: 'tmp/bundle.js',
	dest: 'public/bundle.js',
	plugins: [uglify()]
};
