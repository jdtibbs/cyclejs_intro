	import Cycle from '@cycle/core';
	import {
		label, input, hr, h1, div, makeDOMDriver
	}
	from '@cycle/dom';
	import Rx from 'rx';

	document.querySelector('#lesson').textContent = 'Lesson ## - ';

	// source: is input (read) effects.
	// sink: is output (write) effects.

	// main: is logic
	// returns: sinks
	function main(sources) {
		// build the source streams:
		// return sinks:
		return {};
	}


	const drivers = {
		DOM: makeDOMDriver('#app')
	};

	Cycle.run(main, drivers);

	export default {};
