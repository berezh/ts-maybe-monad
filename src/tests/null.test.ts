import { maybe } from '..';

it('simple variable: null', () => {
    const variable: number | null = null;
    expect(maybe(variable, 0)).toEqual(0);
});

it('depth 1: null', () => {
    const instance = {
        numberField: 1,
        undefinedField: null,
    };
    expect(maybe(instance, x => x.numberField, 0)).toEqual(1);
    expect(maybe(instance, x => x.undefinedField, 0)).toEqual(0);
});

it('depth 2: null', () => {
    const instance = {
        child: {
            numberField: 1,
            undefinedField: null,
        },
    };
    expect(maybe(instance, x => x.child, x => x.numberField, 0)).toEqual(1);
    expect(maybe(instance, x => x.child, x => x.undefinedField, 0)).toEqual(0);
});
