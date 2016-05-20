'use strict';

module.exports = function(assume, util) {
  assume.flags.consistently = 'always';

  var format = util.format;

  function isSpy(maybeSpy) {
    return util.type(maybeSpy) === 'function'
      && util.type(maybeSpy.getCall) === 'function'
      && util.type(maybeSpy.calledWithExactly) === 'function';
  }

  function isSpylike(maybeSpylike) {
    return maybeSpylike && (isSpy((maybeSpylike)) || isSpy(maybeSpylike.proxy));
  }

  function maybeSpyName(maybeSpy) {
    if (util.type(maybeSpy) === 'function') {
      return util.name(maybeSpy);
    } else {
      return util.string(maybeSpy);
    }
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

  assume.add('spylike', function(msg) {
    var value = this.value;
    var name = maybeSpyName(value);

    var expect = format('`%s` to @ be a Sinon.JS spy', name);

    this.test(isSpylike(value), msg, expect);
  });

  assume.add('called', function(count, msg) {
    if (util.type(count) === 'string') {
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

  assume.add('calledWithNew', function(msg) {
    assume(this.value, {
      slice: this.sliceStack + 1
    }).to.be.spylike();

    var methodName = 'calledWithNew';
    var expect = 'spy to @ been called with new';

    if (this.consistently) {
      methodName = 'alwaysCalledWithNew';
    }

    this.test(this.value[methodName](), msg, format(expect));
  });

  assume.add('calledBefore', function(spy2, msg) {
    assume(this.value, {
      slice: this.sliceStack + 1
    }).to.be.spylike();

    var methodName = 'calledBefore';
    var expect = 'spy to @ been called before %s';

    if (this.consistently) {
      methodName = 'alwaysCalledBefore';
    }

    this.test(this.value[methodName](spy2), msg, format(expect, maybeSpyName(spy2)));
  });

  assume.add('calledAfter', function(spy2, msg) {
    assume(this.value, {
      slice: this.sliceStack + 1
    }).to.be.spylike();

    var methodName = 'calledAfter';
    var expect = 'spy to @ been called after %s';

    if (this.consistently) {
      methodName = 'alwaysCalledAfter';
    }

    this.test(this.value[methodName](spy2), msg, format(expect, maybeSpyName(spy2)));
  });

  assume.add('calledOn', function(obj, msg) {
    assume(this.value, {
      slice: this.sliceStack + 1
    }).to.be.spylike();

    var methodName = 'calledOn';
    var expect = 'spy to @ been called with %j as this';

    if (this.consistently) {
      methodName = 'alwaysCalledOn';
    }

    this.test(this.value[methodName](obj), msg, format(expect, obj));
  });

  assume.add('calledWith', function() {
    var args = Array.prototype.slice.call(arguments);
    assume(this.value, {
      slice: this.sliceStack + 1
    }).to.be.spylike();

    var methodName = 'calledWith';

    var expect = 'spy to @ been called with arguments %j, called with %j';

    if (this.consistently) {
      methodName = 'alwaysCalledWith';
    }

    this.test(this.value[methodName].apply(this.value, args), null, format(expect, args, this.value.args));
  });

  assume.add('calledWithMatch', function() {
    var args = Array.prototype.slice.call(arguments);
    assume(this.value, {
      slice: this.sliceStack + 1
    }).to.be.spylike();

    var methodName = 'calledWithMatch';

    var expect = 'spy to @ been called with arguments matching %j, called with %j';

    if (this.consistently) {
      methodName = 'alwaysCalledWithMatch';
    }

    this.test(this.value[methodName].apply(this.value, args), null, format(expect, args, this.value.args));
  });

  assume.add('calledWithExactly', function() {
    var args = Array.prototype.slice.call(arguments);
    assume(this.value, {
      slice: this.sliceStack + 1
    }).to.be.spylike();

    var methodName = 'calledWithExactly';

    var expect = 'spy to @ been called with exact arguments %j, called with %j';

    if (this.consistently) {
      methodName = 'alwaysCalledWithExactly';
    }

    this.test(this.value[methodName].apply(this.value, args), null, format(expect, args, this.value.args));
  });

  assume.add('returned', function(returnee, msg) {
    assume(this.value, {
      slice: this.sliceStack + 1
    }).to.be.spylike();

    var methodName = 'returned';

    var expect = 'spy to have @ retured %j, returns %j';

    if (this.consistently) {
      methodName = 'alwaysReturned';
    }

    this.test(this.value[methodName](returnee), msg, format(expect, returnee, this.value.returnValues));
  });


  assume.add('thrown', function(err, msg) {
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

    this.test(this.value[methodName](), msg, format(expect, err, this.value.exceptions));
  });
};
