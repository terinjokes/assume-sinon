'use strict';

module.exports = function(assume, util) {
  assume.flags.consistently = 'always';

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

    var expect = '`' + name + '` to @ be a Sinon.JS spy';

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
      return this.test(this.value.callCount === count, msg, expect);
    }

    return this.test(this.value.called, msg, expect + 'at least once');
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

    this.test(this.value[methodName](), msg, expect);
  });

  assume.add('calledBefore', function(spy2, msg) {
    assume(this.value, {
      slice: this.sliceStack + 1
    }).to.be.spylike();

    var methodName = 'calledBefore';
    var expect = 'spy to @ been called before ' + maybeSpyName(spy2);

    if (this.consistently) {
      methodName = 'alwaysCalledBefore';
    }

    this.test(this.value[methodName](spy2), msg, expect);
  });

  assume.add('calledAfter', function(spy2, msg) {
    assume(this.value, {
      slice: this.sliceStack + 1
    }).to.be.spylike();

    var methodName = 'calledAfter';
    var expect = 'spy to @ been called after ' + maybeSpyName(spy2);

    if (this.consistently) {
      methodName = 'alwaysCalledAfter';
    }

    this.test(this.value[methodName](spy2), msg, expect);
  });

  assume.add('calledOn', function(obj, msg) {
    assume(this.value, {
      slice: this.sliceStack + 1
    }).to.be.spylike();

    var methodName = 'calledOn';
    var expect = 'spy to @ been called with ' + util.string(obj) + ' as this';

    if (this.consistently) {
      methodName = 'alwaysCalledOn';
    }

    this.test(this.value[methodName](obj), msg, expect);
  });

  assume.add('calledWith', function(args, msg) {
    assume(this.value, {
      slice: this.sliceStack + 1
    }).to.be.spylike();

    var methodName = 'calledWith';

    var expect = 'spy to @ been called with arguments ' + util.string(args) + ', called with ' + util.string(this.value.args);

    if (this.consistently) {
      methodName = 'alwaysCalledWith';
    }

    this.test(this.value[methodName].call(this.value, args), msg, expect);
  });

  assume.add('calledWithMatch', function(args, msg) {
    assume(this.value, {
      slice: this.sliceStack + 1
    }).to.be.spylike();

    var methodName = 'calledWithMatch';

    var expect = 'spy to @ been called with arguments matching ' + util.string(args) + ', called with ' + util.string(this.value.args);

    if (this.consistently) {
      methodName = 'alwaysCalledWithMath';
    }

    this.test(this.value[methodName].call(this.value, args), msg, expect);
  });

  assume.add('calledWithExactly', function(args, msg) {
    assume(this.value, {
      slice: this.sliceStack + 1
    }).to.be.spylike();

    var methodName = 'calledWithExactly';

    var expect = 'spy to @ been called with exact arguments ' + util.string(args) + ', called with ' + util.string(this.value.args);

    if (this.consistently) {
      methodName = 'alwaysCalledWithExactly';
    }

    this.test(this.value[methodName].call(this.value, args), msg, expect);
  });

  assume.add('returned', function(returnee, msg) {
    assume(this.value, {
      slice: this.sliceStack + 1
    }).to.be.spylike();

    var methodName = 'returned';

    var expect = 'spy to have @ retured ' + util.string(returnee) + ', returns ' + util.string(this.value.returnValues);

    if (this.consistently) {
      methodName = 'alwaysReturned';
    }

    this.test(this.value[methodName](returnee), msg, expect);
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
      expect += util.string(err) + ', thrown ' + util.string(this.value.exceptions);
      return this.test(this.value[methodName](err), msg, expect);
    }

    this.test(this.value[methodName](), msg, expect);
  });
};
