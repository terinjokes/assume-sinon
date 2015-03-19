'use strict';
var expect = require('assume');
var assumeSinon = require('../');
expect.use(assumeSinon);

var sinon = require('sinon');

describe('Call context', function() {
  var spy;
  var target;
  var notTheTarget;

  beforeEach(function() {
    spy = sinon.spy();
    target = {};
    notTheTarget = {};
  });

  describe('calledOn', function() {
    it('should throw an assertion error if the spy is never called', function() {
      expect(function() {
        expect(spy).to.have.been.calledOn(target);
      }).to.throw('Unknown assertation failure occured');
    });
    it('should throw an assertion error if the spy is called without a context', function() {
      spy();
      expect(function() {
        expect(spy).to.have.been.calledOn(target);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy.getCall(0)).to.have.been.calledOn(target);
      }).to.throw('Unknown assertation failure occured');
    });
    it('should throw an assertion error if the spy is called on the wrong context', function() {
      spy.call(notTheTarget);
      expect(function() {
        expect(spy).to.have.been.calledOn(target);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy.getCall(0)).to.have.been.calledOn(target);
      }).to.throw('Unknown assertation failure occured');
    });
    it('should not throw if the spy is called on the specified context', function() {
      spy.call(target);
      expect(function() {
        expect(spy).to.have.been.calledOn(target);
      }).to.not.throw();
      expect(function() {
        expect(spy.getCall(0)).to.have.been.calledOn(target);
      }).to.not.throw();
    });
    it('should not throw if the spy is called on another context and also the specified context', function() {
      spy.call(notTheTarget);
      spy.call(target);
      expect(function() {
        expect(spy).to.have.been.calledOn(target);
      }).to.not.throw();
      expect(function() {
        expect(spy.getCall(1)).to.have.been.calledOn(target);
      }).to.not.throw();
    });
  });

  describe('always calledOn', function() {
    it('should throw an assertion error if the spy is never called', function() {
      expect(function() {
        expect(spy).to.always.have.been.calledOn(target);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy).to.have.always.been.calledOn(target);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy).to.have.been.always.calledOn(target);
      }).to.throw('Unknown assertation failure occured');
    });
    it('should throw an assertion error if the spy is called without a context', function() {
      spy();
      expect(function() {
        expect(spy).to.always.have.been.calledOn(target);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy).to.have.always.been.calledOn(target);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy).to.have.been.always.calledOn(target);
      }).to.throw('Unknown assertation failure occured');
    });
    it('should throw an assertion error if the spy is called on the wrong context', function() {
      spy.call(notTheTarget);
      expect(function() {
        expect(spy).to.always.have.been.calledOn(target);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy).to.have.always.been.calledOn(target);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy).to.have.been.always.calledOn(target);
      }).to.throw('Unknown assertation failure occured');
    });
    it('should not throw if the spy is called on the specified context', function() {
      spy.call(target);
      expect(function() {
        expect(spy).to.always.have.been.calledOn(target);
      }).to.not.throw();
      expect(function() {
        expect(spy).to.have.always.been.calledOn(target);
      }).to.not.throw();
      expect(function() {
        expect(spy).to.have.been.always.calledOn(target);
      }).to.not.throw();
    });
    it('should throw an assertion error if the spy is called on another context and also the specified context', function() {
      spy.call(notTheTarget);
      spy.call(target);
      expect(function() {
        expect(spy).to.always.have.been.calledOn(target);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy).to.have.always.been.calledOn(target);
      }).to.throw('Unknown assertation failure occured');
      expect(function() {
        expect(spy).to.have.been.always.calledOn(target);
      }).to.throw('Unknown assertation failure occured');
    });
  });
});