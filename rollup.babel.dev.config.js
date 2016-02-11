import babel from 'rollup-plugin-babel';

export default {
	entry: 'tmp/es6bundle.js',
	format: 'cjs',
	plugins: [babel({
		"babelrc": false,
		"presets": ["es2015-rollup"]
	})],
	dest: 'public/bundle.js'
};
