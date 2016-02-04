	import Cycle from '@cycle/core';
	import CycleDOM from '@cycle/dom';
	import Rx from 'rx';

	// the entry point for the whole application.
	function main() {
		// return an Observable to the DOM driver.
		return {
			DOM: Rx.Observable.interval(1000)
				.map(ii => CycleDOM.p(`${ii} seconds elapsed`))
		};
	}

	// an object of driver functions.
	const drivers = {
		DOM: CycleDOM.makeDOMDriver('#lesson01')
	};

	// start app, passing entry poiunt and drivers.
	Cycle.run(main, drivers);

	export default {};
