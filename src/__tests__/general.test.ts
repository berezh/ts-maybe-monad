import { maybe } from '../.';

interface ISimple {
    cyfra: number;
    cyfraUndefined: number | undefined;
    cyfraNull: number | null;

    text: string;
    textUndefined: string | undefined;
    textNull: string | null;
}

interface IComplicated extends ISimple {
    child: IComplicated | undefined;
}

const Cyfra0 = 0;
const Cyfra1 = 1;
const Cyfra2 = 2;

const DefaultCyfra = 12345;

const Text0 = 'text 0';
const Text1 = 'text 1';
const Text2 = 'text 2';

const ComplicatedObject: IComplicated = {
    cyfra: Cyfra0,
    cyfraUndefined: undefined,
    cyfraNull: null,
    text: Text0,
    textUndefined: undefined,
    textNull: null,
    child: {
        cyfra: Cyfra1,
        cyfraUndefined: undefined,
        cyfraNull: null,
        text: Text1,
        textUndefined: undefined,
        textNull: null,
        child: {
            cyfra: Cyfra2,
            cyfraUndefined: undefined,
            cyfraNull: null,
            text: Text2,
            textUndefined: undefined,
            textNull: null,
            child: undefined,
        },
    },
};

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
