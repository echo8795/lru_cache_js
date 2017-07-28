
class ListNode {
	constructor(data, prev, next) {
		this._data = data;
		this._previous = prev;
		this._next = next;
	}

	nullifyThis() {
		this._previous = null;
		this._next = null;
	}
}

class DoubleLinkedList {
	constructor() {
		this._length = 0;
		this._head = null;
		this._tail = null;
	}

	add(data) {
		let node = new ListNode(data, null, null);
		if(this._length == 0) {
			this._head = node;
			this._tail = node;
		} else {
			this._tail._next = node;
			node._previous = this._tail;
			this._tail = node;
		}
		this._length++;
	}

	deleteNode(node) {
		if(node._previous === null) {
			if(node._next != null) {
				node._next._previous = null;
				this._head = node._next;
			}
			node.nullifyThis();
			node = null;
		} else if(node._next === null) {
			node._previous._next = null;
			this._tail = node._previous;
			node.nullifyThis();
			node = null;
		} else {
			node._previous._next = node._next;
			node._next._previous = node._previous;
			node.nullifyThis();
			node = null;
		}

		this._length--;
	}
}

class LRU {

	constructor(size) {
		this.list = new DoubleLinkedList();
		this.maxSize = size;
		this.map = {};
	}

	put(key, value) {
		if(key || key == false) {
			let keyName = returnStringOf(key);
			if(this.map.hasOwnProperty(keyName)) {
				if(this.map[keyName]._next != null) {
					let data = this.map[keyName]._data;
					this.list.deleteNode(this.map[keyName]);
					this.list.add(data);
					this.map[keyName] = this.list._tail;
				}
			} else {
				if(this.maxSize == this.list._length)
					this.list.deleteNode(this.list._head);
				this.list.add(value);
				this.map[keyName] = this.list._tail;
			}
		} else {
			throw new Error('Cannot have Key as undefined or null');
		}

	}

	get(key) {
		if(key || key == false) {
			let keyName = returnStringOf(key);
			if(this.map.hasOwnProperty(keyName)) {
				let correspondingNode = this.map[keyName];
				this.list.deleteNode(correspondingNode);
				this.list.add(correspondingNode._data);

				return this.list._tail._data;
			}

			return null;
		} else {
			throw new Error('Cannot have Key as undefined or null');
			// return null;
		}
	}

	getMaxLength() {
		return this.maxSize;
	}

	getCurrentLength() {
		return this.list._length;
	}
}

// Private Functions
function returnStringOf(thing) {
	if(thing === null) return "null";

	switch(typeof thing) {
		case "object":
			return JSON.stringify(thing);
		case "undefined":
			return typeof thing;
		case "string":
			return thing;
		case "boolean":
		case "function": 
		case "number":
			return thing.toString();
	}
}
