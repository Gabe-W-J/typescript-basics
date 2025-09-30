//* Objects

let inferredObject = {
    //* Has an inferred type of an object with properties stringProperty of type string and
    //* numberProperty of type number

    stringProperty: 'value', //* Has an inferred type of string
    numberProperty: 0, //* Has an inferred type of number
}

let typedObject: {
    stringProperty: string,
    numberProperty: number
    unionProperty: string | number
    subObject: {
        stringProperty: string,
        numberProperty: number
        unionProperty: string | number
        arrayProperty: (string | number)[]
    }
}
//* This is explicitly typed, doesn't actually have an initial value, but these are type clamped appropriately

//* Giving a value to these would look like this:
typedObject = {
    stringProperty: 'value',
    numberProperty: 0,
    unionProperty: 0,
    subObject: {
        stringProperty: 'value',
        numberProperty: 0,
        unionProperty: 0,
        arrayProperty: ['value', '0', 0] 
    }
}
//* Trying to deviate from the preset types in any of these properties will return errors no matter what

//* The must not be null type:

let mustNotBeNull: {} = 'some text';
//? This seems strange, because 'some text' isnt an object.
//? This is because the {} type just means any value that's not undefined or null

//* Like so:
let mustNotBeNull2: {} = null //! null is not assignable to {}
let mustNotBeUndefined: {} = undefined //! undefined is also not assignable to {}


//* Flexible objects with the Record Type
let flexObject: {}
//? We can't do this to make a record variable with no entries, because as we've just seen,
//? {} means anything thats not undefined or null
//* Thats why typescript has the Record type instead
let actualFlexObject: Record<number, string>;

//* The first type is for what type the keys should be
//* The second type is for what type the values should be

actualFlexObject = {
    0: '',
    1: '',
    2: ''
}

//* Slightly confusingly, you could totally use this with the {} type:

let mustNotBeNullFlexObject: Record<string | number | symbol, {}>

//* So this record has a union typed keyset of strings, numbers and symbols
//* And values CANNOT be set to undefined

mustNotBeNullFlexObject = {
    string: null, //! See? This can't be assigned because it's of type {}
    1: undefined, //! Same goes for here.
    $: 0 //* 0 might not mean much, but it's still an actual value, so here it works :D
}

//* A proper way to make this object would be like so:

mustNotBeNullFlexObject = {
    'string': '', //* Note that even though the key is in quotes, it still works as intended
    1: 0,
    $: 1
}

//* And then you could nest objects into arrays, that should be fun :)

let recordArray: (Record<string | number | symbol, {}>)[]
//* Or:
let recordArray2: Array<Record<string | number | symbol, {}>>

//* Both of these would have values like so:
recordArray = [mustNotBeNullFlexObject, actualFlexObject]