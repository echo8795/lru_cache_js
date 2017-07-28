# lru_cache_js

### Description
This is an implementation of LRU in JS and works as an in-memory cache mechanism for client side.
This LRU can be used to store any value against any key, whether a function or an object or any primitive type.

### Installation
After cloning the repo run command(Requires Node/npm to install the Testing framework)
```cli
$ npm install
```
in the folder.

### Getting Started
After cloning and npm installation is done simply open the ```index.html``` in any modern browser to see the results of the test cases.

### Instructions
You can use the LRU class after importing the script 'index.js' in your code via
```html
<script src="/path/to/script/lruTest.js"></script>
```

The cache can be used by initializing as follows
```js
var cache = new LRU();
```

You can use the following methods

1. put(key, value) - To put a key value pair in the cache. This can be used as following
```js
cache.put('key', {foo: 'bar'});
```
Any type can be used for a key including function, object, string, number, boolean except null or undefined.
A ```null``` or ```undefined``` key will throw an error.

2. get(key) - To get the corresponding value against the key used to store the value.
```js
cache.get('key')
```
Again any type can be used to retrieve the value against as mentioned above.
If a certain key is not present in the cache a ```null``` will be returned. 

### Testing
Testing for the LRU class is done through the Mocha/Chai framework and all he test cases can be found in the file ```lruTest.js```
