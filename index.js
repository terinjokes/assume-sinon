'use strict';

/**
 * @typedef {import('assume')} Assume
 * @typedef {import('sinon').SinonSpy} SinonSpy
 */
/**
 * Expose the Assume plugin interface
 *
 * @param {Assume} assume The Assume instance.
 * @param {Object} util Utilities provided by assume
 * @public
 */
module.exports = function plugin(assume, util) {
  var format = util.format;

  //
  // Introduce a new flag.
  //
  assume.flags.consistently = 'always';

  /**
   * Assert if the given function is a sinon spy.
   *
   * @param {SinonSpy} maybeSpy Thing to inspect
   * @returns {Boolean}
   * @private
   */
  function isSpy(maybeSpy) {
    return util.type(maybeSpy) === 'function'
      && util.type(maybeSpy.getCall) === 'function'
      && util.type(maybeSpy.calledWithExactly) === 'function';
  }

  /**
   * @typedef {{ proxy: SinonSpy }} SpyProxy
   */
  /**
   * Assert if the given function might be a spy.
   *
   * @param {SinonSpy|SpyProxy} maybeSpylike Thing that probably is a spy.
   * @returns {Boolean}
   * @private
   */
  function isSpylike(maybeSpylike) {
    // @ts-expect-error
    return maybeSpylike && (isSpy((maybeSpylike)) || isSpy(maybeSpylike.proxy));
  }

  /**
   * Extract the name of the spy.
   *
   * @param {SinonSpy} maybeSpy Possible sinon spy.
   * @returns {String} Name of the function
   */
  function maybeSpyName(maybeSpy) {
    return util.type(maybeSpy) === 'function'
    ? util.name(maybeSpy)
    : util.string(maybeSpy);
  }

  /**
   * Generates human readable times from a numeric value.
   *
   * @param {Number} count Value to make readable
   * @returns {String}
   * @private
   */
  function timesInWords(count) {
    if (count === 1) {
      return 'once';
    }

    if (count === 2) {
      return 'twice';
    }

    if (count === 3) {
      return 'thrice';
    }

    return (count || 0) + 'times';
  }

  /**
   * @typedef {import('assume').AddonAssumption<T>} AddonAssumption<T>
   * @template T
   */

  assume.add('spylike',
    /**
     * Assert if the value is spy.
     *
     * @type {AddonAssumption<SinonSpy>}
     * @param {String} [msg] Reason of assertion failure.
     * @public
     */
    function spylike(msg) {
      var value = this.value;
      var name = maybeSpyName(value);

      var expect = format('`%s` to @ be a Sinon.JS spy', name);

      return this.test(isSpylike(value), msg, expect);
    });

  assume.add('called',
    /**
     * Assert that the function called x amount of times
     *
     * @type {AddonAssumption<SinonSpy>}
     * @param {Number} [count] Amount of calls expected.
     * @param {String} [msg] Reason of assertion failure.
     * @public
     */
    function called(count, msg) {
      if (util.type(count) === 'string') {
        // @ts-expect-error
        msg = count;
        count = null;
      }

      assume(this.value, {
        slice: this.sliceStack + 1
      }).to.be.spylike();

      var expect = 'spy to @ be called ';

      if (count) {
        expect += timesInWords(count) + ', called ' + timesInWords(this.value.callCount);
        return this.test(this.value.callCount === count, msg, format(expect));
      }

      return this.test(this.value.called, msg, format(expect + 'at least once') );
    });

  assume.add('calledWithNew',
    /**
     * Assert that the function called with `new`
     *
     * @type {AddonAssumption<SinonSpy>}
     * @param {String} [msg] Reason of assertion failure.
     * @public
     */
    function calledWithNew(msg) {
      assume(this.value, {
        slice: this.sliceStack + 1
      }).to.be.spylike();

      var methodName = 'calledWithNew';
      var expect = 'spy to @ been called with new';

      if (this.consistently) {
        methodName = 'alwaysCalledWithNew';
      }

      return this.test(this.value[methodName](), msg, format(expect));
    });

  assume.add('calledBefore',
    /**
     * Assert that the function called before a given sinon spy.
     *
     * @type {AddonAssumption<SinonSpy>}
     * @param {SinonSpy} spy2 Function to be called before.
     * @param {String} [msg] Reason of assertion failure.
     * @public
     */
    function calledBefore(spy2, msg) {
      assume(this.value, {
        slice: this.sliceStack + 1
      }).to.be.spylike();

      var methodName = 'calledBefore';
      var expect = 'spy to @ been called before %s';

      if (this.consistently) {
        methodName = 'alwaysCalledBefore';
      }

      return this.test(this.value[methodName](spy2), msg, format(expect, maybeSpyName(spy2)));
    });

  assume.add('calledAfter',
    /**
     * Assert that the function called after a given sinon spy.
     *
     * @type {AddonAssumption<SinonSpy>}
     * @param {SinonSpy} spy2 Function to be called before.
     * @param {String} [msg] Reason of assertion failure.
     * @public
     */
    function calledAfter(spy2, msg) {
      assume(this.value, {
        slice: this.sliceStack + 1
      }).to.be.spylike();

      var methodName = 'calledAfter';
      var expect = 'spy to @ been called after %s';

      if (this.consistently) {
        methodName = 'alwaysCalledAfter';
      }

      return this.test(this.value[methodName](spy2), msg, format(expect, maybeSpyName(spy2)));
    });

  assume.add('calledOn',
    /**
     * Assert that the function called on a given object.
     *
     * @type {AddonAssumption<SinonSpy>}
     * @param {Object} obj Object to be called with.
     * @param {String} [msg] Reason of assertion failure.
     * @public
     */
    function calledOn(obj, msg) {
      assume(this.value, {
        slice: this.sliceStack + 1
      }).to.be.spylike();

      var methodName = 'calledOn';
      var expect = 'spy to @ been called with %j as this';

      if (this.consistently) {
        methodName = 'alwaysCalledOn';
      }

      return this.test(this.value[methodName](obj), msg, format(expect, obj));
    });

  assume.add('calledWith',
    /**
     * Assert that the function called with the given arguments.
     *
     * @type {AddonAssumption<SinonSpy>}
     * @param {...any} args
     * @public
     */
    function calledWith() {
      var args = Array.prototype.slice.call(arguments);

      assume(this.value, {
        slice: this.sliceStack + 1
      }).to.be.spylike();

      var methodName = 'calledWith';

      var expect = 'spy to @ been called with arguments %j, called with %j';

      if (this.consistently) {
        methodName = 'alwaysCalledWith';
      }

      return this.test(this.value[methodName].apply(this.value, args), null, format(expect, args, this.value.args));
    });

  assume.add('calledWithMatch',
    /**
     * Assert that the function called with matching arguments.
     *
     * @type {AddonAssumption<SinonSpy>}
     * @param {...any} args
     * @public
     */
    function calledWithMatch() {
      var args = Array.prototype.slice.call(arguments);

      assume(this.value, {
        slice: this.sliceStack + 1
      }).to.be.spylike();

      var methodName = 'calledWithMatch';
      var expect = 'spy to @ been called with arguments matching %j, called with %j';

      if (this.consistently) {
        methodName = 'alwaysCalledWithMatch';
      }

      return this.test(this.value[methodName].apply(this.value, args), null, format(expect, args, this.value.args));
    });

  assume.add('calledWithExactly',
    /**
     * Assert that the function called with exactly matching arguments.
     *
     * @type {AddonAssumption<SinonSpy>}
     * @param {...any} args
     * @public
     */
    function calledWithExactly() {
      var args = Array.prototype.slice.call(arguments);

      assume(this.value, {
        slice: this.sliceStack + 1
      }).to.be.spylike();

      var methodName = 'calledWithExactly';
      var expect = 'spy to @ been called with exact arguments %j, called with %j';

      if (this.consistently) {
        methodName = 'alwaysCalledWithExactly';
      }

      return this.test(this.value[methodName].apply(this.value, args), null, format(expect, args, this.value.args));
    });

  assume.add('returned',
    /**
     * Assert that the function has returned a given value.
     *
     * @type {AddonAssumption<SinonSpy>}
     * @param {any} returnee Value that the function should return.
     * @param {String} [msg] Reason of assertion failure.
     * @public
     */
    function returned(returnee, msg) {
      assume(this.value, {
        slice: this.sliceStack + 1
      }).to.be.spylike();

      var methodName = 'returned';
      var expect = 'spy to have @ retured %j, returns %j';

      if (this.consistently) {
        methodName = 'alwaysReturned';
      }

      return this.test(this.value[methodName](returnee), msg, format(expect, returnee, this.value.returnValues));
    });


  assume.add('thrown',
    /**
     * Assert that the function has thrown.
     *
     * @type {AddonAssumption<SinonSpy>}
     * @param {Object|String|Error} [err] Object/string to throw.
     * @param {String} [msg] Reason of assertion failure.
     * @public
     */
    function thrown(err, msg) {
      if (!msg && util.type(err) === 'string') {
        msg = err;
        err = null;
      }

      if (util.type(err) === 'error') {
        console.log('an error!');
      }

      assume(this.value, {
        slice: this.sliceStack + 1
      }).to.be.spylike();

      var methodName = 'threw';
      var expect = 'spy to have @ threw ';

      if (this.consistently) {
        methodName = 'alwaysThrew';
      }

      if (err) {
        expect += '%j, thrown %j';
        return this.test(this.value[methodName](err), msg, expect);
      }

      return this.test(this.value[methodName](), msg, format(expect, err, this.value.exceptions));
    });
};
