'use strict';

module.exports = function (assume, util) {
  assume.flags.consistently = 'always';

  function isSpy(maybeSpy) {
    return util.type(maybeSpy) === 'function' &&
      util.type(maybeSpy.getCall) === 'function' &&
      util.type(maybeSpy.calledWithExactly) === 'function';
  }

  function isSpylike(maybeSpylike) {
    return maybeSpylike && (isSpy((maybeSpylike)) || isSpy(maybeSpylike.proxy));
  }

  function maybeSpyName(maybeSpy) {
    if (util.type(maybeSpy) === 'function') {
      return util.name(maybeSpy);
    }

    return util.string(maybeSpy);
  }

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

  function toArray(of) {
    var type = util.type(of);

    if (type === 'string' || type === 'number') {
      return [of];
    }

    if (type === 'domtokenlist') {
      return String.prototype.split.call(of, /\s/);
    }

    if (Object(of) === of && typeof of.length === 'number') {
      return of.toArray ? of.toArray() : [].slice.call(of);
    }

    return [];
  }

  assume.add('spylike', function (msg) {
    var value = this.value;
    var name = maybeSpyName(value);

    var expect = util.format('`%s` to @ be a Sinon.JS spy', name);

    this.test(isSpylike(value), msg, expect);
  });

  assume.add('called', function (count, msg) {
    var expect;
    if (util.type(count) === 'string') {
      msg = count;
      count = null;
    }

    assume(this.value, {
      slice: this.sliceStack + 1
    }).to.be.spylike();

    if (count) {
      expect = util.format('spy to @ be called %s, called %s', timesInWords(count), timesInWords(this.value.callCount));
      return this.test(this.value.callCount === count, msg, expect);
    }

    expect = util.format('spy to @ be called at least once');

    return this.test(this.value.called, msg, expect);
  });

  assume.add('calledWithNew', function (msg) {
    assume(this.value, {
      slice: this.sliceStack + 1
    }).to.be.spylike();

    var methodName = 'calledWithNew';
    var expect = util.format('spy to @ been called with new');

    if (this.consistently) {
      methodName = 'alwaysCalledWithNew';
    }

    this.test(this.value[methodName](), msg, expect);
  });

  assume.add('calledBefore', function (spy2, msg) {
    assume(this.value, {
      slice: this.sliceStack + 1
    }).to.be.spylike();

    var methodName = 'calledBefore';
    var expect = util.format('spy to @ been called before %s', maybeSpyName(spy2));

    if (this.consistently) {
      methodName = 'alwaysCalledBefore';
    }

    this.test(this.value[methodName](spy2), msg, expect);
  });

  assume.add('calledAfter', function (spy2, msg) {
    assume(this.value, {
      slice: this.sliceStack + 1
    }).to.be.spylike();

    var methodName = 'calledAfter';
    var expect = util.format('spy to @ been called after %s', maybeSpyName(spy2));

    if (this.consistently) {
      methodName = 'alwaysCalledAfter';
    }

    this.test(this.value[methodName](spy2), msg, expect);
  });

  assume.add('calledOn', function (obj, msg) {
    assume(this.value, {
      slice: this.sliceStack + 1
    }).to.be.spylike();

    var methodName = 'calledOn';
    var expect = util.format('spy to @ been called with %s as this', util.string(obj));

    if (this.consistently) {
      methodName = 'alwaysCalledOn';
    }

    this.test(this.value[methodName](obj), msg, expect);
  });

  assume.add('calledWith', function (args, msg) {
    assume(this.value, {
      slice: this.sliceStack + 1
    }).to.be.spylike();

    var methodName = 'calledWith';

    var expect = util.format('spy to @ been called with arguments %s, called with %s', util.string(args), util.string(this.value.args));

    if (this.consistently) {
      methodName = 'alwaysCalledWith';
    }

    return this.test(this.value[methodName].apply(this.value, args), msg, expect);
  });

  assume.add('calledWithMatch', function (args, msg) {
    args = toArray(args);
    assume(this.value, {
      slice: this.sliceStack + 1
    }).to.be.spylike();

    var methodName = 'calledWithMatch';
    var expect = util.format('spy to @ been called with arguments matching %s, called with %s', util.string(args), util.string(this.value.args));

    if (this.consistently) {
      methodName = 'alwaysCalledWithMatch';
    }

    this.test(this.value[methodName].apply(this.value, args), msg, expect);
  });

  assume.add('calledWithExactly', function (args, msg) {
    args = toArray(args);
    assume(this.value, {
      slice: this.sliceStack + 1
    }).to.be.spylike();

    var methodName = 'calledWithExactly';
    var expect = util.format('spy to @ been called with exact arguments %s, called with %s', util.string(args), util.string(this.value.args));

    if (this.consistently) {
      methodName = 'alwaysCalledWithExactly';
    }

    this.test(this.value[methodName].apply(this.value, args), msg, expect);
  });

  assume.add('returned', function (returnee, msg) {
    assume(this.value, {
      slice: this.sliceStack + 1
    }).to.be.spylike();

    var methodName = 'returned';

    var expect = util.format('spy to have @ retured %s, returns %s', util.string(returnee), util.string(this.value.returnValues));

    if (this.consistently) {
      methodName = 'alwaysReturned';
    }

    this.test(this.value[methodName](returnee), msg, expect);
  });

  assume.add('thrown', function (err, msg) {
    var expect;
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

    if (this.consistently) {
      methodName = 'alwaysThrew';
    }

    if (err) {
      expect = util.format('spy to have @ threw %s, thrown %s', util.string(err), util.string(this.value.exceptions));
      return this.test(this.value[methodName](err), msg, expect);
    }

    expect = util.format('spy to have @ threw');

    this.test(this.value[methodName](), msg, expect);
  });
};
