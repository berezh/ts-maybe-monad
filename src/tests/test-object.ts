export interface ISimple {
    cyfra: number;
    cyfraUndefined: number | undefined;
    cyfraNull: number | null;

    text: string;
    textUndefined: string | undefined;
    textNull: string | null;
}

export interface IComplicated extends ISimple {
    child: IComplicated | undefined | null;
}

export const Cyfra0 = 0;
export const Cyfra1 = 1;
export const Cyfra2 = 2;

export const DefaultCyfra = 12345;

export const Text0 = 'text 0';
export const Text1 = 'text 1';
export const Text2 = 'text 2';

export const ComplicatedObject: IComplicated = {
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
