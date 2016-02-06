	import Cycle from '@cycle/core';
	import {
		label, input, hr, h1, div, makeDOMDriver
	}
	from '@cycle/dom';
	import Rx from 'rx';

	document.querySelector('#lesson').textContent = 'Lesson 11 - Hello world in Cycle.js.';

	// source: is input (read) effects.
	// sink: is output (write) effects.


	// main: is logic
	// returns: sinks
	function main(sources) {
		// build the source streams:
		const input$ = sources.DOM.select('.name').events('input');
		// name$ startWith() initializes the stream with something so that name$.map() executes.
		const name$ = input$.map(ev => ev.target.value).startWith('');

		// return our sinks:
		return {
			DOM: name$.map(name =>
				div([
					label('Name '),
					input('.name', {
						type: 'text'
					}),
					hr(),
					h1(`Hello ${name}!`)
				])
			)
		};
	}


	const drivers = {
		DOM: makeDOMDriver('#app')
	};

	Cycle.run(main, drivers);

	export default {};
