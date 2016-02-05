	import Cycle from '@cycle/core';
	import Rx from 'rx';

	// Our previous toy DOM Driver is still primitive. 
	// We are only able to sends strings as the textContent of the container element. 
	// We cannot yet create headers and inputs and all sorts of fancy DOM elements. 
	// In this lesson we will see how to send objects that describe what elements should exist, 
	// instead of strings as the DOM sink.

	// source: is input (read) effects.
	// sink: is output (write) effects.

	document.querySelector('#lesson').textContent = 'Lesson 7 - Making our toy DOM driver more flexible.';

	//  we change main to return an object describing the desired DOM element we wish to display.
	// logic:
	function main(sources) {
		//  returns sinks.
		const click$ = sources.DOM;
		return {
			DOM: click$
				.startWith(null)
				.flatMapLatest(() =>
					Rx.Observable.timer(0, 1000)
					.map(ii => {
						return {
							tagName: 'H1',
							children: [{
								tagName: 'SPAN',
								children: [
									`Seconds elapsed ${ii}`
								]
							}]
						};
					})),
			Log: Rx.Observable.timer(0, 2000)
				.map(ii => ii * 2)
		};
	}

	// we change the DOMDriver to create the object described by the sinks returned object.

	// effect:
	function DOMDriver(object$) {
		// a 'write' effect.
		function createElement(obj) {
			const element = document.createElement(obj.tagName);
			obj.children
				.filter(c => typeof c === 'object')
				.map(createElement)
				.forEach(c => element.appendChild(c));
			obj.children
				.filter(c => typeof c === 'string')
				.forEach(c => element.innerHTML += c);
			return element;
		}
		object$.subscribe(obj => {
			const container = document.querySelector('#app');
			container.innerHTML = '';
			const element = createElement(obj);
			container.appendChild(element);
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


	const drivers = {
		DOM: DOMDriver,
		Log: ConsoleLogDriver
	};

	Cycle.run(main, drivers);

	export default {};
