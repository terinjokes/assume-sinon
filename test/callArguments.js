'use strict';
var expect = require('assume');
var assumeSinon = require('../');
expect.use(assumeSinon);

var sinon = require('sinon');

describe('Call arguments', function() {
  var spy;
  var arg1;
  var arg2;
  var notArg;
  var any;

  beforeEach(function() {
    spy = sinon.spy();
    arg1 = 'A';
    arg2 = 'B';
    notArg = 'C';
    any = sinon.match.any;
  });

  describe('calledWith', function() {
    it('should throw an assertion error when the spy is not called', function() {
      expect(function() {
        expect(spy).to.have.been.calledWith([arg1, arg2]);
      }).to.throw('Unknown assertation failure occured');
    });

    it('should not throw when the spy is called with the correct arguments', function() {
      spy(arg1, arg2);

      expect(function() {
        expect(spy).to.have.been.calledWith(arg1, arg2);
      }).to.not.throw();
      expect(function() {
        expect(spy.getCall(0)).to.have.been.calledWith(arg1, arg2);
      }).to.not.throw();
    });

    it('should not throw when the spy is called with the correct arguments and more', function() {
      spy(arg1, arg2, notArg);
      expect(function() {
        expect(spy).to.have.been.calledWith(arg1, arg2);
      }).to.not.throw();
      expect(function() {
        expect(spy.getCall(0)).to.have.been.calledWith(arg1, arg2);
      }).to.not.throw();
    });

    it('should throw an assertion error when the spy is called with incorrect arguments', function() {
      spy(notArg, arg1);
      expect(function() {
        expect(spy).to.have.been.calledWith(arg1, arg2);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy.getCall(0)).to.have.been.calledWith(arg1, arg2);
      }).to.throw('Unknown assertation failure occured');
    });

    it('should not throw when the spy is called with incorrect arguments but then correct ones', function() {
      spy(notArg, arg1);
      spy(arg1, arg2);
      expect(function() {
        expect(spy).to.have.been.calledWith(arg1, arg2);
      }).to.not.throw();
      expect(function() {
        expect(spy.getCall(1)).to.have.been.calledWith(arg1, arg2);
      }).to.not.throw();
    });
  });

  describe('always calledWith', function() {
    it('should throw an assertion error when the spy is not called', function() {
      expect(function() {
        expect(spy).to.always.have.been.calledWith(arg1, arg2);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy).to.have.always.been.calledWith(arg1, arg2);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy).to.have.been.always.calledWith(arg1, arg2);
      }).to.throw('Unknown assertation failure occured');
    });
    it('should not throw when the spy is called with the correct arguments', function() {
      spy(arg1, arg2);
      expect(function() {
        expect(spy).to.always.have.been.calledWith(arg1, arg2);
      }).to.not.throw();
      expect(function() {
        expect(spy).to.have.always.been.calledWith(arg1, arg2);
      }).to.not.throw();
      expect(function() {
        expect(spy).to.have.been.always.calledWith(arg1, arg2);
      }).to.not.throw();
    });
    it('should not throw when the spy is called with the correct arguments and more', function() {
      spy(arg1, arg2, notArg);
      expect(function() {
        expect(spy).to.always.have.been.calledWith(arg1, arg2);
      }).to.not.throw();
      expect(function() {
        expect(spy).to.have.always.been.calledWith(arg1, arg2);
      }).to.not.throw();
      expect(function() {
        expect(spy).to.have.been.always.calledWith(arg1, arg2);
      }).to.not.throw();
    });
    it('should throw an assertion error when the spy is called with incorrect arguments', function() {
      spy(notArg, arg1);
      expect(function() {
        expect(spy).to.always.have.been.calledWith(arg1, arg2);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy).to.have.always.been.calledWith(arg1, arg2);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy).to.have.been.always.calledWith(arg1, arg2);
      }).to.throw('Unknown assertation failure occured');
    });
    it('should throw an assertion error when the spy is called with incorrect arguments but then correct ones', function() {
      spy(notArg, arg1);
      spy(arg1, arg2);
      expect(function() {
        expect(spy).to.always.have.been.calledWith(arg1, arg2);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy).to.have.always.been.calledWith(arg1, arg2);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy).to.have.been.always.calledWith(arg1, arg2);
      }).to.throw('Unknown assertation failure occured');
    });
  });

  describe('calledWithExactly', function() {
    it('should throw an assertion error when the spy is not called', function() {
      expect(function() {
        expect(spy).to.have.been.calledWithExactly(arg1, arg2);
      }).to.throw('Unknown assertation failure occured');
    });
    it('should not throw when the spy is called with the correct arguments', function() {
      spy(arg1, arg2);
      expect(function() {
        expect(spy).to.have.been.calledWithExactly(arg1, arg2);
      }).to.not.throw();
      expect(function() {
        expect(spy.getCall(0)).to.have.been.calledWithExactly(arg1, arg2);
      }).to.not.throw();
    });
    it('should throw an assertion error when the spy is called with the correct arguments and more', function() {
      spy(arg1, arg2, notArg);
      expect(function() {
        expect(spy).to.have.been.calledWithExactly(arg1, arg2);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy.getCall(0)).to.have.been.calledWithExactly(arg1, arg2);
      }).to.throw('Unknown assertation failure occured');
    });
    it('should throw an assertion error when the spy is called with incorrect arguments', function() {
      spy(notArg, arg1);
      expect(function() {
        expect(spy).to.have.been.calledWithExactly(arg1, arg2);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy.getCall(0)).to.have.been.calledWithExactly(arg1, arg2);
      }).to.throw('Unknown assertation failure occured');
    });
    it('should not throw when the spy is called with incorrect arguments but then correct ones', function() {
      spy(notArg, arg1);
      spy(arg1, arg2);
      expect(function() {
        expect(spy).to.have.been.calledWithExactly(arg1, arg2);
      }).to.not.throw();
      expect(function() {
        expect(spy.getCall(1)).to.have.been.calledWithExactly(arg1, arg2);
      }).to.not.throw();
    });
  });

  describe('always calledWithExactly', function() {
    it('should throw an assertion error when the spy is not called', function() {
      expect(function() {
        expect(spy).to.always.have.been.calledWithExactly(arg1, arg2);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy).to.have.always.been.calledWithExactly(arg1, arg2);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy).to.have.been.always.calledWithExactly(arg1, arg2);
      }).to.throw('Unknown assertation failure occured');
    });
    it('should not throw when the spy is called with the correct arguments', function() {
      spy(arg1, arg2);
      expect(function() {
        expect(spy).to.always.have.been.calledWithExactly(arg1, arg2);
      }).to.not.throw();
      expect(function() {
        expect(spy).to.have.always.been.calledWithExactly(arg1, arg2);
      }).to.not.throw();
      expect(function() {
        expect(spy).to.have.been.always.calledWithExactly(arg1, arg2);
      }).to.not.throw();
    });
    it('should throw an assertion error when the spy is called with the correct arguments and more', function() {
      spy(arg1, arg2, notArg);
      expect(function() {
        expect(spy).to.always.have.been.calledWithExactly(arg1, arg2);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy).to.have.always.been.calledWithExactly(arg1, arg2);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy).to.have.been.always.calledWithExactly(arg1, arg2);
      }).to.throw('Unknown assertation failure occured');
    });
    it('should throw an assertion error when the spy is called with incorrect arguments', function() {
      spy(notArg, arg1);
      expect(function() {
        expect(spy).to.always.have.been.calledWithExactly(arg1, arg2);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy).to.have.always.been.calledWithExactly(arg1, arg2);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy).to.have.been.always.calledWithExactly(arg1, arg2);
      }).to.throw('Unknown assertation failure occured');
    });
    it('should throw an assertion error when the spy is called with incorrect arguments but then correct ones', function() {
      spy(notArg, arg1);
      spy(arg1, arg2);
      expect(function() {
        expect(spy).to.always.have.been.calledWithExactly(arg1, arg2);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy).to.have.always.been.calledWithExactly(arg1, arg2);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy).to.have.been.always.calledWithExactly(arg1, arg2);
      }).to.throw('Unknown assertation failure occured');
    });
  });

  describe('calledWithMatch', function() {
    it('should throw an assertion error when the spy is not called', function() {
      expect(function() {
        expect(spy).to.have.been.calledWithMatch(any, any);
      }).to.throw('Unknown assertation failure occured');
    });
    it('should not throw when the spy is called with the correct arguments', function() {
      spy(arg1, arg2);
      expect(function() {
        expect(spy).to.have.been.calledWithMatch(any, any);
      }).to.not.throw();
      expect(function() {
        expect(spy.getCall(0)).to.have.been.calledWithMatch(any, any);
      }).to.not.throw();
    });
    it('should not throw when the spy is called with the correct arguments and more', function() {
      spy(arg1, arg2, notArg);
      expect(function() {
        expect(spy).to.have.been.calledWithMatch(any, any);
      }).to.not.throw();
      expect(function() {
        expect(spy.getCall(0)).to.have.been.calledWithMatch(any, any);
      }).to.not.throw();
    });
    it('should throw an assertion error when the spy is called with incorrect arguments', function() {
      spy(notArg, arg1);
      expect(function() {
        expect(spy).to.have.been.calledWithMatch(any, arg2);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy.getCall(0)).to.have.been.calledWithMatch(arg1, any);
      }).to.throw('Unknown assertation failure occured');
    });
    it('should not throw when the spy is called with incorrect arguments but then correct ones', function() {
      spy(notArg, arg1);
      spy(arg1, arg2);
      expect(function() {
        expect(spy).to.have.been.calledWithMatch(arg1, arg2);
      }).to.not.throw();
      expect(function() {
        expect(spy.getCall(1)).to.have.been.calledWithMatch(arg1, arg2);
      }).to.not.throw();
    });
  });

  describe('always calledWithMatch', function() {
    it('should throw an assertion error when the spy is not called', function() {
      expect(function() {
        expect(spy).to.always.have.been.calledWithMatch(any, any);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy).to.have.always.been.calledWithMatch(arg1, any);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy).to.have.been.always.calledWithMatch(any, arg2);
      }).to.throw('Unknown assertation failure occured');
    });
    it('should not throw when the spy is called with the correct arguments', function() {
      spy(arg1, arg2);
      expect(function() {
        expect(spy).to.always.have.been.calledWithMatch(any, any);
      }).to.not.throw();
      expect(function() {
        expect(spy).to.have.always.been.calledWithMatch(any, arg2);
      }).to.not.throw();
      expect(function() {
        expect(spy).to.have.been.always.calledWithMatch(arg1, any);
      }).to.not.throw();
    });
    it('should not throw when the spy is called with the correct arguments and more', function() {
      spy(arg1, arg2, notArg);
      expect(function() {
        expect(spy).to.always.have.been.calledWithMatch(any, any);
      }).to.not.throw();
      expect(function() {
        expect(spy).to.have.always.been.calledWithMatch(any, arg2);
      }).to.not.throw();
      expect(function() {
        expect(spy).to.have.been.always.calledWithMatch(arg1, any);
      }).to.not.throw();
    });
    it('should throw an assertion error when the spy is called with incorrect arguments', function() {
      spy(notArg, arg1);
      expect(function() {
        expect(spy).to.always.have.been.calledWithMatch(any, arg2);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy).to.have.always.been.calledWithMatch(arg1, any);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy).to.have.been.always.calledWithMatch(arg1, arg2);
      }).to.throw('Unknown assertation failure occured');
    });
    it('should throw an assertion error when the spy is called with incorrect arguments but then correct ones', function() {
      spy(notArg, arg1);
      spy(arg1, arg2);
      expect(function() {
        expect(spy).to.always.have.been.calledWithMatch(arg1, arg2);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy).to.have.always.been.calledWithMatch(arg1, arg2);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy).to.have.been.always.calledWithMatch(arg1, arg2);
      }).to.throw('Unknown assertation failure occured');
    });
  });
});
