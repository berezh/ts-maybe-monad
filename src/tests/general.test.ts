import { maybe } from '..';
import { ComplicatedObject, Cyfra0, Cyfra1, Cyfra2, DefaultCyfra } from './test-object';

it('maybe: return with accessor', () => {
    expect(maybe(ComplicatedObject).return(x => x.cyfraUndefined, DefaultCyfra)).toEqual(DefaultCyfra);
});

it('maybe: default value - undefined ', () => {
    expect(
        maybe(ComplicatedObject)
            .with(x => x.cyfraUndefined)
            .return(DefaultCyfra),
    ).toEqual(DefaultCyfra);
    expect(
        maybe(ComplicatedObject)
            .with(x => x.cyfraNull)
            .return(DefaultCyfra),
    ).toEqual(DefaultCyfra);
});

it('maybe: deep level', () => {
    expect(
        maybe(ComplicatedObject)
            .with(x => x.cyfra)
            .return(),
    ).toEqual(Cyfra0);

    expect(
        maybe(ComplicatedObject)
            .with(x => x.child)
            .with(x => x.cyfra)
            .return(),
    ).toEqual(Cyfra1);

    expect(
        maybe(ComplicatedObject)
            .with(x => x.child)
            .with(x => x.child)
            .with(x => x.cyfra)
            .return(),
    ).toEqual(Cyfra2);

    expect(
        maybe(ComplicatedObject)
            .with(x => x.child)
            .with(x => x.child)
            // undefined
            .with(x => x.child)
            .with(x => x.cyfra)
            .return(DefaultCyfra),
    ).toEqual(DefaultCyfra);

    expect(
        maybe(ComplicatedObject)
            .with(x => x.child)
            .with(x => x.child)
            // undefined
            .with(x => x.child)
            .with(x => x.child)
            .with(x => x.child)
            .with(x => x.child)
            .with(x => x.child)
            .with(x => x.child)
            .with(x => x.cyfra)
            .return(DefaultCyfra),
    ).toEqual(DefaultCyfra);
});

it('maybe: deep level - one method', () => {
    expect(maybe(ComplicatedObject, x => x.cyfra, 0)).toEqual(Cyfra0);
    expect(maybe(ComplicatedObject, x => x.child, x => x.cyfra, 0)).toEqual(Cyfra1);
    expect(maybe(ComplicatedObject, x => x.child, x => x.cyfra, 0)).toEqual(Cyfra1);
    expect(maybe(ComplicatedObject, x => x.child, x => x.child, x => x.cyfra, 0)).toEqual(Cyfra2);
    expect(maybe(ComplicatedObject, x => x.child, x => x.child, x => x.child, x => x.cyfra, DefaultCyfra)).toEqual(
        DefaultCyfra,
    );

    expect(
        maybe(ComplicatedObject, x => x.child, x => x.child, x => x.child, x => x.child, x => x.cyfra, DefaultCyfra),
    ).toEqual(DefaultCyfra);
});
