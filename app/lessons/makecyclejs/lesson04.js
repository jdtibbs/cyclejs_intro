	import Rx from 'rx';

	// In the last lesson the last section of code we wrote is neither logic nor effects. 
	// It is code which ties together logic (main) with effects.
	// We can encapsulate that in a run() function. 
	// This lesson shows how we can structure these pieces together, and generalize effect handling with "drivers".
	// Also we can make the 'main' function more generic by introducing a 'drivers' object.

	document.querySelector('#lesson').textContent = 'Lesson 4 - Introducing run() and drivers().';

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
	// we rename the effects functions to better represent the role they play.
	function DOMDriver(text$) {
		text$.subscribe(text => {
			document.querySelector('#app').textContent = text;
		});
	}

	// another effect:
	function ConsoleLogDriver(text$) {
		text$.subscribe(text => {
			console.log(text);
		});
	}

	// run is now very generic, we can now add and remove drivers from the 'drivers' object to initiate the effects we wish.
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

	run(main, drivers);

	export default {};
