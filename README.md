# assume-sinon

[![Version npm][version]](http://browsenpm.org/package/assume-sinon)[![Build Status][build]](https://travis-ci.org/terinjokes/assume-sinon)[![Dependencies][david]](https://david-dm.org/terinjokes/assume-sinon)[![Coverage Status][cover]](https://coveralls.io/r/terinjokes/assume-sinon?branch=master)

[version]: http://img.shields.io/npm/v/assume-sinon.svg?style=flat-square
[build]: http://img.shields.io/travis/terinjokes/assume-sinon/master.svg?style=flat-square
[david]: https://img.shields.io/david/terinjokes/assume-sinon.svg?style=flat-square
[cover]: http://img.shields.io/coveralls/terinjokes/assume-sinon/master.svg?style=flat-square

Extends assume with assertions against the Sinon.JS unit-test mocking framework.

The following flags are added:

- `always`

The following new methods are introduced:

#### spylike

Assert if the value is spy.

```js
assume(spy).is.spylike();
```

#### called

Assert that the function called x amount of times.

```js
assume(spy).is.called(20);
```

#### calledWithNew

Assert that the function called with `new`.

```js
assume(spy).is.calledWithNew();
assume(spy).is.always.calledWithNew();
```

#### calledBefore

Assert that the function called before a given sinon spy.

```js
assume(spy).is.calledBefore(otherspy);
```

#### calledAfter

Assert that the function called after a given sinon spy.

```js
assume(spy).is.calledAfter(otherspy);
```

#### calledOn

Assert that the function called on a given object.

```js
assume(spy).is.calledOn(thisvalue);
```

#### calledWith

Assert that the function called with the given arguments.

```js
assume(spy).is.calledWith('foo', 'bar');
```

#### calledMatch

Assert that the function called with matching arguments.

```js
assume(spy).is.calledMatch('foo', 'bar');
```

#### calledWithExactly

Assert that the function called with matching arguments.

```js
assume(spy).is.calledWithExactly('foo', 'bar');
```

#### returned

Assert that the function has returned a given value.

```js
assume(spy).has.returned(true);
```

#### thrown

Assert that the function has thrown.

```js
assume(spy).thrown(new Error('and error'));
```

## License

MIT
