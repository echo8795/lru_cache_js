var assert = chai.assert;
var expect  = chai.expect;

const MAX_SIZE = 1000;
const ADDITIONS = 1500;
const DUMMY_DATA = {'hi': 'this is to test'};
const DIFF_KEYS = 100;
const BOOLS = false;
function FUNC() {
	console.log('test');
}

describe('LRU', function() {
	it('It should start empty', function() {
		let lru = new LRU(10);

		assert.equal(lru.getCurrentLength(), 0);
	});

	it('It should not exceed max size', 
			notExceedMaxSize.bind(null, MAX_SIZE, ADDITIONS, DUMMY_DATA));

	it('Its length should always be equal to number of elements',
			lengthAlwaysEqualNumberOfElements.bind(null ,MAX_SIZE, ADDITIONS, DUMMY_DATA));

	it('It should not add new Elements if they exist',
			shouldNotAddNewElementsIfTheyExist.bind(null, MAX_SIZE, DIFF_KEYS, DUMMY_DATA));

	it('It should always get same value as put',
			getExactValueForKey.bind(null, MAX_SIZE, ADDITIONS));

	it('It should get null if key doesn\'t exist',
			checkForNullValueAgainstNoKey.bind(null, MAX_SIZE));

	it('It should throw error on undefined or null key during Put', 
			cannotPutKeyAsNull.bind(null, MAX_SIZE, DIFF_KEYS, 'put'));

	it('It should throw error on undefined or null key during Get', 
			cannotPutKeyAsNull.bind(null, MAX_SIZE, DIFF_KEYS, 'get'));

	it('It should be able to use a function as key',
			putAndGetFunctionAsKey.bind(null, FUNC));

	it('It should be able to use a object as key',
			putAndGetFunctionAsKey.bind(null, DUMMY_DATA));

	it('It should be able to use a boolean as key',
			putAndGetBooleanAsKey.bind(null, BOOLS));
});

function notExceedMaxSize(maxSize, noOfAdditions, dummyData) {
	let lru = new LRU(maxSize);

	for(let i=0; i<noOfAdditions; i++) {
		lru.put('key'+i, dummyData);

		expect(lru.getCurrentLength()).to.be.below(maxSize+1);
	}
}

function lengthAlwaysEqualNumberOfElements(maxSize, noOfAdditions, dummyData) {
	let lru = new LRU(maxSize);
	let elementsAdded = 0;

	for(let i=0; i<noOfAdditions; i++) {
		lru.put('key' + i, dummyData);
		elementsAdded == maxSize ? null : elementsAdded++;
		expect(lru.getCurrentLength()).to.be.equal(elementsAdded); 
	}
}

function shouldNotAddNewElementsIfTheyExist(maxSize, noOfDiffKeys, dummyData) {
	let lru = new LRU(maxSize);
	let noOfEachKind = maxSize/noOfDiffKeys;
	for(let i=0; i<noOfEachKind; i++) {
		for(let j=0; j<noOfDiffKeys; j++) {
			lru.put('key'+j, dummyData);
		}
	}
	expect(lru.getCurrentLength()).to.be.equal(noOfDiffKeys);
}

function getExactValueForKey(maxSize, noOfAdditions) {
	let lru = new LRU(maxSize);
	for(let i=0; i<noOfAdditions; i++) 
		lru.put('key'+i, 'value'+i);

	for(let i=0; i<noOfAdditions; i++) {
		expect(lru.get('key'+i)).to.be.equal('value'+i);
	}
}

function checkForNullValueAgainstNoKey(maxSize) {
	let lru = new LRU(maxSize);
	for(let i=0; i<maxSize/10; i++) {
		lru.put('key'+i, 'val'+i);
	}
	for(let i=0;i<maxSize/10; i++) {
		expect(lru.get(i+'key')).to.be.equal(null);
	}
}

function cannotPutKeyAsNull(maxSize, additions, functionName) {
	let lru = new LRU(maxSize);
	for(let i=0; i<additions; i++) {
		expect(lru[functionName].bind(null, null, 'value')).to.throw('Cannot have Key as undefined or null');
	}
} 

function putAndGetFunctionAsKey(func) {
	let lru = new LRU(1);
	lru.put(func, 'this is a Function');

	expect(lru.get(func)).to.be.equal('this is a Function');
}

function putAndGetObjectAsKey(obj) {
	let lru = new LRU(1);
	lru.put(obj, 'this is a Object');

	expect(lru.get(obj)).to.be.equal('this is a Object');
}

function putAndGetBooleanAsKey(bool) {
	console.log(bool);
	let lru = new LRU(1);
	lru.put(bool, 'this is a Boolean');

	expect(lru.get(bool)).to.be.equal('this is a Boolean');
}