	import Cycle from '@cycle/core';
	import CycleDOM from '@cycle/dom';
	import Rx from 'rx';

	function main() {
		return {
			DOM: Rx.Observable.interval(1000)
				.map(ii => CycleDOM.p(`${ii} seconds elapsed`))
		};
	}

	const drivers = {
		DOM: CycleDOM.makeDOMDriver('#lesson')
	};

	// Cycle.run(main, drivers);

	// export default {};
