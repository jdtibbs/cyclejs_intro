	import Cycle from '@cycle/core';
	import Rx from 'rx';

	// Usually we use template languages like Handlebars, JSX, and Jade to create. 
	// One simple way we can create our own template language is to write a function 
	// that returns these objects for us. 
	// This lessons shows how we can use these functions as a DSL to create our DOM description objects.

	// source: is input (read) effects.
	// sink: is output (write) effects.

	document.querySelector('#lesson').textContent = 'Lesson 9 - Hyperscript as our alternative to template languages.';

	// we introduce a function h() to create the object describing the element we wish to create.

	function h(tagName, children) {
		return {
			tagName: tagName,
			children: children
		};
	}

	//  we can replace function h() with functions to create a specific elements h1() and span().

	function h1(children) {
		return {
			tagName: 'H1',
			children: children
		};
	}

	function span(children) {
		return {
			tagName: 'SPAN',
			children: children
		};
	}

	// logic:
	function main(sources) {
		//  returns sinks.
		const event$ = sources.DOM.selectEvents('span', 'mouseover');
		return {
			DOM: event$
				.startWith(null)
				.flatMapLatest(() =>
					Rx.Observable.timer(0, 1000)
					.map(ii => h1([
						span([
							`Seconds elapsed ${ii}`
						])
					]))
				),
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
