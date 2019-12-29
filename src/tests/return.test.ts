import { maybe } from '..';
import { ComplicatedObject } from './test-object';

it('return: default', () => {
    let variable: number | null = 0;
    if (5 > 4) {
        variable = null;
    }
    expect(maybe(variable).return(0)).toEqual(0);
});

it('return: accessor', () => {
    expect(maybe(ComplicatedObject).return(x => x.cyfraNull, 0)).toEqual(0);
    expect(maybe(ComplicatedObject).return(x => x.cyfraUndefined)).toEqual(undefined);
    expect(maybe(ComplicatedObject).return(x => x.cyfraUndefined, 0)).toEqual(0);
});
