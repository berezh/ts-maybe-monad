type ExtractEmtpy<T> = Extract<undefined | null, T>;

type Empty = undefined | null;

function isFunction(p: any): boolean {
    return typeof p === 'function';
}

// function isObject(p: any): p is object {
//     return typeof p === 'object';
// }

class MaybeInstance<TIn> {
    private instance?: TIn;

    constructor(instance?: TIn) {
        this.instance = instance;
    }

    public with = <TOut>(accessor: (p: TIn) => TOut | undefined): MaybeInstance<TOut> => {
        if (this.isNotEmpty(this.instance)) {
            const result = accessor(this.instance);
            if (this.isNotEmpty(result)) {
                return new MaybeInstance<TOut>(result);
            } else {
                return new MaybeInstance<TOut>(undefined);
            }
        }

        return new MaybeInstance<TOut>(undefined);
    };

    public do(accessor: (p: TIn) => void): void {
        if (this.isNotEmpty(this.instance)) {
            accessor(this.instance);
        }
    }

    public return(defaultValue?: TIn): TIn;
    public return<TOut>(accessor: (p: TIn) => TOut): TOut | undefined;
    public return<TOut>(accessor: (p: TIn) => TOut, defaultValue: TOut): TOut;

    public return<TOut>(accessor?: ((p: TIn) => TOut) | TIn, defaultValue?: TIn): TIn | TOut | undefined {
        if (isFunction(accessor)) {
            return this.with(accessor as any).return(defaultValue) as any;
        } else {
            const newDefaultValue = accessor;
            const result = this.isNotEmpty(this.instance) ? this.instance : newDefaultValue;
            return result as any;
        }
    }

    private isNotEmpty = <T>(instance?: T): instance is ExtractEmtpy<T> => {
        return instance !== undefined && instance != null;
    };
}

// type FieldType = string | object | number;

export function maybe<TIn>(instance?: TIn): MaybeInstance<TIn>;
export function maybe<TIn>(instance: TIn | undefined, defaultValue: TIn | undefined): MaybeInstance<TIn>;
export function maybe<TIn, TOut>(
    instance: TIn | undefined,
    accessor: (p: TIn) => TOut | undefined,
    defaultValue: TOut | undefined,
): TOut;
export function maybe<TIn1, TIn2, TOut>(
    instance: TIn1 | undefined,
    accessor1: (p: TIn1) => TIn2 | undefined,
    accessor2: (p: TIn2) => TOut,
    defaultValue: TOut | undefined,
): TOut;
export function maybe<TIn1, TIn2, TIn3, TOut>(
    instance: TIn1 | undefined,
    accessor1: (p: TIn1) => TIn2 | undefined,
    accessor2: (p: TIn2) => TIn3 | undefined,
    accessor3: (p: TIn3) => TOut,
    defaultValue: TOut | undefined,
): TOut;
export function maybe<TIn1, TIn2, TIn3, TIn4, TOut>(
    instance: TIn1 | undefined,
    accessor1: (p: TIn1) => TIn2 | undefined,
    accessor2: (p: TIn2) => TIn3 | undefined,
    accessor3: (p: TIn3) => TIn4 | undefined,
    accessor4: (p: TIn4) => TOut,
    defaultValue: TOut | undefined,
): TOut;
export function maybe<TIn1, TIn2, TIn3, TIn4, TIn5, TOut>(
    instance: TIn1 | undefined,
    accessor1: (p: TIn1) => TIn2 | undefined,
    accessor2: (p: TIn2) => TIn3 | undefined,
    accessor3: (p: TIn3) => TIn4 | undefined,
    accessor4: (p: TIn4) => TIn5 | undefined,
    accessor5: (p: TIn5) => TOut,
    defaultValue: TOut | undefined,
): TOut;

export function maybe(): any {
    const rootInstance = new MaybeInstance(arguments[0]);
    if (arguments.length > 1) {
        let currentInstance = rootInstance;
        for (let i = 1; i < arguments.length; i++) {
            const currentArg = arguments[i];
            if (isFunction(currentArg)) {
                currentInstance = currentInstance.with(currentArg as any);
            } else {
                return currentInstance.return(currentArg);
            }
        }

        return currentInstance.return(undefined);
    }

    return rootInstance;
}
