# ts-maybe-monad

TypeScript maybe monad for reaching child fields inside complicated objects.

<a href="https://www.npmjs.com/package/ts-maybe-monad">
    <img src="https://nodei.co/npm/ts-maybe-monad.png?mini=true">
</a>

## Glossary

-   [Usage](#usage)
-   [Documentation](#documantation)
    -   [maybe](#maybe-function) function
    -   [MaybeInstance](#maybeinstance-class) class

## Usage

### Installation:

```
npm install ts-maybe-monad
```

### Import

```js
import { maybe } from 'ts-maybe-monad';
```

### Simple variable

```js
const variable: number = 1;
maybe(variable, 0); //=> 1

const variable: number | undefined = undefined;
maybe(variable, 0); //=> 0
```

### Depth 1: get inner field

```js
const instance = {
    numberField: 1,
    undefinedField: undefined,
};

maybe(instance, x => x.numberField, 0); //=> 1
maybe(instance, x => x.undefinedField, 0); //=> 0
```

### Depth 2: get inner field

```js
const instance = {
    child: {
        numberField: 1,
        undefinedField: undefined,
    },
};

maybe(instance, x => x.child, x => x.numberField, 0); //=> 1
maybe(instance, x => x.child, x => x.undefinedField, 0); //=> 0
```

## Documantation

### maybe function

Overwrites:

#### `maybe(instance): MaybeInstance`

-   `instance`: instance to dive in

Returns [MaybeInstance](#maybeinstance-class) object

#### `maybe(instance, defaultValue)`

-   `instance`: instance to dive in
-   `defaultValue`: default value returns if instance is `null` or `undefined`

Returns existed value or default one

#### `maybe(instance, ...accessors[], defaultValue)`

-   `instance`: instance to dive in
-   `accessors`: array of accessors to dive into child field of parent instance
-   `defaultValue`: default value returns if last accessor returns `null` or `undefined`

Returns existed value or default one

### MaybeInstance class

Wrapper over instance in order to return it's value or child fild's value through accessor.

Methods:

#### `with(accessor): MaybeInstance`

Dives in child field

-   `accessor`: array of accessor to dive into child field of parent instance

Returns [MaybeInstance](#maybeinstance-class) object

#### `return(defaultValue)`

-   `defaultValue`: default value returns if instance is `null` or `undefined`

Returns existed value or default one

#### `return(accessor)`

-   `accessors`: an accessors to dive into child field from wrapped instance

Returns existed value or undefined

#### `return(accessor, defaultValue)`

-   `accessor`: an accessor to dive into child field from wrapped instance
-   `defaultValue`: default value returns if instance is `null` or `undefined`

Returns existed value or default one

#### `do(accessor)`

Do anything with child item if it's reachable

-   `accessor`: an accessor to dive into child field from wrapped instance

Returns none
