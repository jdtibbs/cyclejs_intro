	import Rx from 'rx';

	// So far we only had effects that write something to the external world, 
	// we are not yet reading anything from the external world into our app. 
	// This lesson shows how we can change the DOM Driver to return a "DOM Source" representing read effects, 
	// such as click events. We will leverage that to create an interactive application.

	// source: is input (read) effects.
	// sink: is output (write) effects.

	document.querySelector('#lesson').textContent = 'Lesson 5 - Read effects from the DOM: click events.';

	// logic:
	function main(DOMSource) {
		//  returns sinks.
		const click$ = DOMSource;
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
		text$.subscribe(text => {
			document.querySelector('#app').textContent = text;
		});
		const DOMSource = Rx.Observable.fromEvent(document, 'click');
		return DOMSource;
	}

	// another effect:
	function ConsoleLogDriver(text$) {
		text$.subscribe(text => {
			console.log(text);
		});
	}

	function run(main, drivers) {
		const proxyDOMSource = new Rx.Subject();
		const sinks = main(proxyDOMSource);
		const DOMSource = drivers.DOM(sinks.DOM);
		DOMSource.subscribe(click => proxyDOMSource.onNext(click));
		// Object.keys(drivers).forEach(key => {
		// drivers[key](sinks[key]);
		// });
	}

	const drivers = {
		DOM: DOMDriver,
		Log: ConsoleLogDriver
	};

	run(main, drivers);

	export default {};
