import babel from 'rollup-plugin-babel';

export default {
	entry: 'app/app.js',
	format: 'cjs',
	plugins: [babel()],
	dest: 'public/bundle.js'
};
