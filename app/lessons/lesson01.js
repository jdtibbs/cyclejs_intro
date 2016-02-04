import Rx from 'rx';

// principle of Cycle.js is to separate logic from effects.

// logic = Observables:
// made up of events.
// does not change the external world.
// (functional) what the developer creates.

// effects = .subscribe 
// changes the external world / DOM, HTTP request, etc.
// live in subscribes.
// (imperitive) to be contained within the Cycle.js framework.

Rx.Observable.timer(0, 1000)
	.map(ii => `Seconds elapsed ${ii}`)

.subscribe(text => {
	document.querySelector('#lesson01').textContent = text;
});

export default {};
