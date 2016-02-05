	import Cycle from '@cycle/core';
	import {
		h, h1, span, makeDOMDriver
	}
	from '@cycle/dom';
	import Rx from 'rx';

	// This lessons shows how we are able to easily swap our toy DOM Driver 
	// with the actual Cycle.js DOM Driver, 
	// a more solid, 
	// more flexible, 
	// more efficient implementation.

	// source: is input (read) effects.
	// sink: is output (write) effects.

	document.querySelector('#lesson').textContent = 'Lesson 10 - From toy DOM Driver to Cycle.js DOM Driver.';

	// const {
	// h, h1, span, makeDOMDriver
	// } = CycleDOM;

	// logic:
	function main(sources) {
		const event$ = sources.DOM.select('span').events('mouseover');
		return {
			DOM: event$
				.startWith(null)
				.flatMapLatest(() =>
					Rx.Observable.timer(0, 1000)
					.map(ii => h1([
						span({
							style: {
								background: 'red'
							}
						}, [
							`Seconds elapsed ${ii}`
						])
					]))
				),
			Log: Rx.Observable.timer(0, 2000)
				.map(ii => ii * 2)
		};
	}

	// effects:
	function ConsoleLogDriver(text$) {
		text$.subscribe(text => {
			console.log(text);
		});
	}

	const drivers = {
		DOM: makeDOMDriver('#app'),
		Log: ConsoleLogDriver
	};

	Cycle.run(main, drivers);

	export default {};
