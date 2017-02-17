import { expect } from 'chai';
import { describe, it } from 'mocha';

import { isUnused, shuffle, toKeys, useKey, updateKeys } from '../src/Game';

const PIZZA = [{ id: 0, ch: 'p', used: false },
               { id: 1, ch: 'i', used: false },
               { id: 2, ch: 'z', used: false },
               { id: 3, ch: 'z', used: false },
               { id: 4, ch: 'a', used: false }];

describe('GameTest', () => {
  it('keys', () => {
    let v;
    let e;
    let r;

    v = 'pizza';
    e = PIZZA.slice(0);
    r = toKeys(v);
    expect(r).to.be.eql(e);

    v = '';
    e = [];
    r = toKeys(v);
    expect(r).to.be.eql(e);
  });

  it('shuffle', () => {
    let v;
    let e;
    let r;

    v = 'pizza';
    e = null;
    r = shuffle(v);
    expect(r.length).to.be.eql(v.length);

    v = '';
    e = '';
    r = shuffle(v);
    expect(r).to.be.eql(e);
  });

  it('useKey', () => {
    let v;
    let e;
    let r;

    v = PIZZA.slice(0);
    e = [{ id: 0, ch: 'p', used: false },
         { id: 1, ch: 'i', used: true },
         { id: 2, ch: 'z', used: false },
         { id: 3, ch: 'z', used: false },
         { id: 4, ch: 'a', used: false }];
    r = useKey(v, 'i');
    expect(r).to.be.eql(e);

    v = [{ id: 0, ch: 'p', used: false },
         { id: 1, ch: 'i', used: true },
         { id: 2, ch: 'z', used: false },
         { id: 3, ch: 'z', used: false },
         { id: 4, ch: 'a', used: false }];
    e = PIZZA.slice(0);
    r = useKey(v, 'i', false);
    expect(r).to.be.eql(e);

    v = PIZZA.slice(0);
    e = PIZZA.slice(0);
    r = useKey(v, 'q');
    expect(r).to.be.eql(e);

    v = [];
    e = [];
    r = useKey(v, 'q');
    expect(r).to.be.eql(e);
  });

  it('isUnused', () => {
    let v;
    let e;
    let r;

    v = PIZZA.slice(0);
    e = true;
    r = isUnused(v, 'p');
    expect(r).to.be.eql(e);

    v = PIZZA.slice(0);
    e = false;
    r = isUnused(v, 'q');
    expect(r).to.be.eql(e);

    v = [];
    e = false;
    r = isUnused(v, 'p');
    expect(r).to.be.eql(e);
  });

  it('updateKeys', () => {
    let v;
    let e;
    let r;

    v = PIZZA.slice(0);
    e = [[{ id: 0, ch: 'p', used: false },
         { id: 1, ch: 'i', used: true },
         { id: 2, ch: 'z', used: false },
         { id: 3, ch: 'z', used: false },
         { id: 4, ch: 'a', used: false }], 'i'];
    r = updateKeys(v, '', 'i');
    expect(r).to.be.eql(e);

    v = [{ id: 0, ch: 'p', used: true },
         { id: 1, ch: 'i', used: true },
         { id: 2, ch: 'z', used: false },
         { id: 3, ch: 'z', used: false },
         { id: 4, ch: 'a', used: false }];
    e = [[{ id: 0, ch: 'p', used: true },
         { id: 1, ch: 'i', used: true },
         { id: 2, ch: 'z', used: true },
         { id: 3, ch: 'z', used: false },
         { id: 4, ch: 'a', used: false }], 'piz'];
    r = updateKeys(v, 'pi', 'z');
    expect(r).to.be.eql(e);
  });
});

/* vim: set foldmethod=marker foldmarker=it\(,\}\)\; foldenable: */
