import sinon, { MatchArguments } from 'sinon';
import Assume from 'assume';

export = AssumeSinonPlugin;

declare module 'assume-sinon'
declare function AssumeSinonPlugin(assume: Assume, util: Object): void

export module 'assume' {
  export function Assume(value: any, flags?: Flags): Assumption;
  export interface Flags {
    consistently?: string
  }

  export interface Assumption {
    readonly always: Assumption,
    spylike(msg?: string): void,
    called(count?: number, msg?: string): void,
    calledWithNew(msg?: string): void,
    calledBefore(spy2: sinon.SinonSpy, msg?: string): void,
    calledAfter(spy2: sinon.SinonSpy, msg?: string): void,
    calledOn(obj: Object, msg?: string): void,
    calledWith<TArgs extends any[] = any[]>(...args: Partial<MatchArguments<TArgs>>): void,
    calledWithMatch<TArgs extends any[] = any[]>(...args: TArgs): void,
    calledWithExactly<TArgs extends any[] = any[]>(...args: MatchArguments<TArgs>): void,
    returned<TReturnValue = any>(returnee: TReturnValue|sinon.SinonMatcher, msg?: string): void,
    thrown(err?: Object|String|Error, msg?: string): void
  }
};
