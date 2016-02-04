	import Rx from 'rx';

	// How can we show one string on the DOM, and a completely different string on Console log? 
	// This lesson shows how we can make our main function return multiple Observables, 
	// each one targeted at a different type of effect.

	// Main will now return an object containing 2 different Observables, one for each sink. 

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
	function DOMEffect(text$) {
		text$.subscribe(text => {
			document.querySelector('#lesson03').textContent = text;
		});
	}

	// another effect:
	function ConsoleLogEffect(text$) {
		text$.subscribe(text => {
			console.log(text);
		});
	}

	const sinks = main();

	DOMEffect(sinks.DOM);
	ConsoleLogEffect(sinks.Log);

	export default {};
