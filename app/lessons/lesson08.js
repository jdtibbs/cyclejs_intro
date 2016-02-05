	import Cycle from '@cycle/core';
	import Rx from 'rx';

	// What if wanted to change the behavior of our app reset the timer every time the mouse hovers over it? 
	// Currently we only support clicks, and they are hard coded in the DOM Driver. 
	// This lesson will introduce DOMSource.selectEvents(), 
	// a way of making the DOM Source rich and allowing the main() function 
	// to determine which read effects it needs.

	// source: is input (read) effects.
	// sink: is output (write) effects.

	document.querySelector('#lesson').textContent = 'Lesson 8 - Fine grained control over the DOM source.';

	// we change sources to contain an object describing the events we wish to trigger the change.

	// logic:
	function main(sources) {
		//  returns sinks.
		const event$ = sources.DOM.selectEvents('span', 'mouseover');
		return {
			DOM: event$
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

		// we change DOMSource to return an object with a function that determines if the event
		// that occured is the event we desired.
		const DOMSource = {
			selectEvents: function(tagName, eventType) {
				return Rx.Observable.fromEvent(document, eventType)
					.filter(ev => ev.target.tagName === tagName.toUpperCase());
			}
		};
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
