	import Rx from 'rx';

	// The last lesson the last part of the code we wrote is neither logic nor effects. 
	// It is code which ties together logic (main) with effects.
	// We can encapsulate that in a run() function. 
	// This lesson shows how we can structure these pieces together, and generalize effect handling with "drivers".

	// logic:
	function main() {
		return {
			DOM: Rx.Observable.timer(0, 1000)
				.map(ii => `Seconds elapsed ${ii}`),
			Log: Rx.Observable.timer(0, 2000)
				.map(ii => ii * 2)
		};
	}

	// effect:
	function DOMDriver(text$) {
		text$.subscribe(text => {
			document.querySelector('#lesson04').textContent = text;
		});
	}

	// another effect:
	function ConsoleLogDriver(text$) {
		text$.subscribe(text => {
			console.log(text);
		});
	}

	function run(main, drivers) {
		const sinks = main();
		Object.keys(drivers).forEach(key => {
			drivers[key](sinks[key]);
		});
	}

	const drivers = {
		DOM: DOMDriver,
		Log: ConsoleLogDriver
	};

	// now run is very generic, we can add and remove drivers from the 'drivers' object.
	run(main, drivers);

	export default {};
