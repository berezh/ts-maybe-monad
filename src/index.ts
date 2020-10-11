type ExtractEmtpy<T> = Extract<undefined | null, T>;

type Empty = undefined | null;

function isFunction(p: any): boolean {
    return typeof p === 'function';
}

export class MaybeInstance<TIn> {
    private instance: TIn | Empty;

    constructor(instance: TIn | Empty) {
        this.instance = instance;
    }

    public with = <TOut>(accessor: (p: TIn) => TOut | Empty): MaybeInstance<TOut> => {
        if (this.isNotEmpty(this.instance)) {
            const result = accessor(this.instance as any);
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
            accessor(this.instance as any);
        }
    }

    public return<TOut>(): TOut | undefined;
    public return(defaultValue: TIn): TIn;
    public return<TOut>(accessor: (p: TIn) => TOut): TOut | undefined;
    public return<TOut>(accessor: (p: TIn) => TOut | undefined, defaultValue: TOut): TOut;

    public return<TOut>(accessor?: ((p: any) => any) | any, defaultValue?: any): any {
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

export function maybe<T>(instance?: T): MaybeInstance<T>;
export function maybe<T>(instance: T | Empty, defaultValue: T | undefined): T | undefined;
export function maybe<TOut, TIn>(
    instance: TIn | Empty,
    accessor: (p: TIn) => TOut | Empty,
    defaultValue: TOut | undefined,
): TOut;
export function maybe<TOut, TIn2, TIn1>(
    instance: TIn1 | Empty,
    accessor1: (p: TIn1) => TIn2 | Empty,
    accessor2: (p: TIn2) => TOut | Empty,
    defaultValue: TOut | undefined,
): TOut;
export function maybe<TOut, TIn3, TIn2, TIn1>(
    instance: TIn1 | Empty,
    accessor1: (p: TIn1) => TIn2 | Empty,
    accessor2: (p: TIn2) => TIn3 | Empty,
    accessor3: (p: TIn3) => TOut | Empty,
    defaultValue: TOut | undefined,
): TOut;
export function maybe<TOut, TIn4, TIn3, TIn2, TIn1>(
    instance: TIn1 | Empty,
    accessor1: (p: TIn1) => TIn2 | Empty,
    accessor2: (p: TIn2) => TIn3 | Empty,
    accessor3: (p: TIn3) => TIn4 | Empty,
    accessor4: (p: TIn4) => TOut | Empty,
    defaultValue: TOut | undefined,
): TOut;
export function maybe<TOut, TIn5, TIn4, TIn3, TIn2, TIn1>(
    instance: TIn1 | Empty,
    accessor1: (p: TIn1) => TIn2 | Empty,
    accessor2: (p: TIn2) => TIn3 | Empty,
    accessor3: (p: TIn3) => TIn4 | Empty,
    accessor4: (p: TIn4) => TIn5 | Empty,
    accessor5: (p: TIn5) => TOut | Empty,
    defaultValue: TOut | undefined,
): TOut;
export function maybe<TOut, TIn6, TIn5, TIn4, TIn3, TIn2, TIn1>(
    instance: TIn1 | Empty,
    accessor1: (p: TIn1) => TIn2 | Empty,
    accessor2: (p: TIn2) => TIn3 | Empty,
    accessor3: (p: TIn3) => TIn4 | Empty,
    accessor4: (p: TIn4) => TIn5 | Empty,
    accessor5: (p: TIn6) => TIn6 | Empty,
    accessor6: (p: TIn6) => TOut | Empty,
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
