import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

// configuration for the Rollup commonjs plugin.
// convert commonjs to es6 in order to bundle it along with this projects es6.

export default {
	entry: 'app/app.js',
	dest: 'tmp/es6bundle.js',
	plugins: [nodeResolve({
		jsnext: true,
		main: true,
		browser: true
	}), commonjs({
		include: 'node_modules/**',
		exclude: ['app/**, node_modules/@cycle/**'],
		namedExports: {
			'node_modules/@cycle/dom/lib/cycle-dom.js': ['button', 'p', 'label', 'div', 'makeDOMDriver']
		}
	})]
};
