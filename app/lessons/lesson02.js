	import Rx from 'rx';

	// We need to give structure to our application with logic and effects. 
	// This lessons shows how we can organize our code into two parts: 
	// main() function for logic, 
	// and effects functions for effects.

	document.querySelector('#lesson').textContent = 'Lesson 2 - Main function and effects functions.';

	// logic:
	function main() {
		return Rx.Observable.timer(0, 1000)
			.map(ii => `Seconds elapsed ${ii}`);
	}

	//  in general place each effect in a function.

	// effect:
	function DOMEffect(text$) {
		//  naming convention: $ indicates this is a 'stream'.
		text$.subscribe(text => {
			document.querySelector('#app').textContent = text;
		});
	}

	// another effect:
	function ConsoleLogEffect(text$) {
		text$.subscribe(text => {
			console.log(text);
		});
	}

	// how do we get multiple effects into place?
	// via a sink.
	// events go into main and drain out into the 'sink'.
	const sink = main();


	DOMEffect(sink);
	ConsoleLogEffect(sink);

	export default {};
