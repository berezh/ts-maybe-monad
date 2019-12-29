import { maybe } from '..';

it('simple variable', () => {
    const variable: number = 1;
    expect(maybe(variable, 0)).toEqual(1);
});

it('simple variable: undefined', () => {
    const variable: number | undefined = undefined;
    expect(maybe(variable, 0)).toEqual(0);
});

it('depth 1', () => {
    const instance = {
        numberField: 1,
        undefinedField: undefined,
    };
    expect(maybe(instance, x => x.numberField, 0)).toEqual(1);
    expect(maybe(instance, x => x.undefinedField, 0)).toEqual(0);
});

it('depth 2', () => {
    const instance = {
        child: {
            numberField: 1,
            undefinedField: undefined,
        },
    };
    expect(maybe(instance, x => x.child, x => x.numberField, 0)).toEqual(1);
    expect(maybe(instance, x => x.child, x => x.undefinedField, 0)).toEqual(0);
});
