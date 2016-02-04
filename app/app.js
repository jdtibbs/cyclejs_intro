	import * as service from './services/array.service';

	let arr = [1, 2, 3];

	console.log('Double each element of the array [' + arr.toString() + ']: ' + service.doubleArray(arr));

	console.log('Sum each element of the array [' + arr.toString() + ']: ' + service.sum(arr));
