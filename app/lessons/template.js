	import Cycle from '@cycle/core';
	import {
		div, label, p, makeDOMDriver
	}
	from '@cycle/dom';
	import Rx from 'rx';

	document.querySelector('#lesson').textContent = 'Lesson ## - x';

	// source: is input (read) effects.
	// sink: is output (write) effects.

	// main: is logic
	// returns: sinks
	function main(sources) {
		// build the source streams:
		const number$ = Rx.Observable.of(99);

		// return sinks:
		return {
			DOM: number$.map(number =>
				div([
					p([
						label(String(number))
					])
				])
			)
		};
	}


	const drivers = {
		DOM: makeDOMDriver('#app')
	};

	Cycle.run(main, drivers);

	export default {};
