	import Cycle from '@cycle/core';
	import Rx from 'rx';

	// Our application was able to produce write effects, through sinks, 
	// and was able to receive read effects, through the DOM sources. 
	// However, the main function only gets the DOMSource as input. 
	// This lessons shows how we can generalize main to receive an object of sources, 
	// containing all kinds of read effects that we can use.

	// Also our toy Cycle.js library is almost complete, we can replace run() with the actual Cycle.js run().

	// source: is input (read) effects.
	// sink: is output (write) effects.

	document.querySelector('#lesson').textContent = 'Lesson 6 - Generalizing main() for more types of sources.';

	// we change main() to take an object that may contain many types of sources.

	// logic:
	function main(sources) {
		//  returns sinks.
		const click$ = sources.DOM;
		return {
			DOM: click$
				.startWith(null)
				.flatMapLatest(() =>
					Rx.Observable.timer(0, 1000)
					.map(ii => `Seconds elapsed ${ii}`)),
			Log: Rx.Observable.timer(0, 2000)
				.map(ii => ii * 2)
		};
	}

	// effect:
	function DOMDriver(text$) {
		// a 'write' effect.
		text$.subscribe(text => {
			document.querySelector('#app').textContent = text;
		});
		// returns a 'read' effect (mouse clicks).
		const DOMSource = Rx.Observable.fromEvent(document, 'click');
		return DOMSource;
	}

	// another effect:
	function ConsoleLogDriver(text$) {
		text$.subscribe(text => {
			console.log(text);
		});
	}


	// we change run to provide main() with any type of source.
	function run(main, drivers) {
		// we declare a sources object (proxy).
		const proxySources = {};
		Object.keys(drivers).forEach(key => {
			proxySources[key] = new Rx.Subject();
		});
		// pass the proxy to main().
		const sinks = main(proxySources);
		// we provide the read sources for main() here.
		Object.keys(drivers).forEach(key => {
			const source = drivers[key](sinks[key]);
			if (source) {
				// not all sources will provide a read effect.
				source.subscribe(x => proxySources[key].onNext(x));
			}
		});
	}


	const drivers = {
		DOM: DOMDriver,
		Log: ConsoleLogDriver
	};

	// now our run() has become much like Cycle.js run() that we can replace it with Cycle.js run(). 
	// run(main, drivers);
	Cycle.run(main, drivers);

	export default {};
