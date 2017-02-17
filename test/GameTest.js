import { expect } from 'chai';
import { describe, it } from 'mocha';

import { shuffle, toKeys, useKey } from '../src/Game';

describe('GameTest', () => {
  it('keys', () => {
    let v;
    let e;
    let r;

    v = 'pizza';
    e = [{ id: 0, ch: 'p', used: false },
         { id: 1, ch: 'i', used: false },
         { id: 2, ch: 'z', used: false },
         { id: 3, ch: 'z', used: false },
         { id: 4, ch: 'a', used: false }];
    r = toKeys(v);
    expect(r).to.be.eql(e);

    v = '';
    e = [];
    r = toKeys(v);
    expect(r).to.be.eql(e);
  });

  it('shuffles', () => {
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

    v = [{ id: 0, ch: 'p', used: false },
         { id: 1, ch: 'i', used: false },
         { id: 2, ch: 'z', used: false },
         { id: 3, ch: 'z', used: false },
         { id: 4, ch: 'a', used: false }];
    e = [{ id: 0, ch: 'p', used: false },
         { id: 1, ch: 'i', used: true },
         { id: 2, ch: 'z', used: false },
         { id: 3, ch: 'z', used: false },
         { id: 4, ch: 'a', used: false }];
    r = useKey(v, 'i');
    expect(r).to.be.eql(e);

    v = [{ id: 0, ch: 'p', used: false },
         { id: 1, ch: 'i', used: false },
         { id: 2, ch: 'z', used: false },
         { id: 3, ch: 'z', used: false },
         { id: 4, ch: 'a', used: false }];
    e = [{ id: 0, ch: 'p', used: false },
         { id: 1, ch: 'i', used: false },
         { id: 2, ch: 'z', used: false },
         { id: 3, ch: 'z', used: false },
         { id: 4, ch: 'a', used: false }];
    r = useKey(v, 'q');
    expect(r).to.be.eql(e);

    v = [];
    e = [];
    r = useKey(v, 'q');
    expect(r).to.be.eql(e);
  });
});

/* vim: set foldmethod=marker foldmarker=it\(,\}\)\; foldenable: */
