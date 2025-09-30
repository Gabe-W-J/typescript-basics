//* Optional Parameters

function notOptionalParam(input: string) {
    console.log(input)
}

notOptionalParam() //! Notice how this doesn't work because we didnt give it anything?
notOptionalParam('input') //* Of course, this works as usual

function optionalParam(input?: string) { //? Adding the ? after the parameter name and before the : makes it an optional parameter
    console.log(input ?? 'no input') //* Now, if we didnt give the function an input, we just log 'no input' instead!
}

//* Meaning that now:
optionalParam() //* This works!
optionalParam('input') //* But this does too!

//* Optional Properties
//* Like with Optional Parameters, we can also add option properties to option types like so:

type optionalObjectParams = {
    optionalParam?: string
}

//* So if we were to make an object of type optionalObjectParams we can either:
const yesParam: optionalObjectParams = { optionalParam: "yes" } //* Give it a value
const noParam: optionalObjectParams = {} //* Or not!


//* Nullish coalescing operator
//? Again, I covered this earlier (my bad :<)
//* We can have something that changes, and can be null or undefined or a value,
//* but what can we do to mitigate the input's impact when it doesn't have a value?

//* Your first instinct may be to use the or operator like so:
let input = null
const didProvideInput = input || false //* This falls back to false because input is always null

//* But look what happens when you make input something else?
let input2 = 'string'
const didProvideInput2 = input2 || false //* Uh oh, it can be either a string or false!

//? So doing this would cause an error!
const didProvideInput3: boolean = input2 || false //! Input 2 isn't a boolean!

//* But if you were to make input falsey (null, undefined, 0 or '') then it would work as intended by JS
let falseyInput = ''
const didProvideFalseyInput = falseyInput || false //* No errors here!

//* And using the nullish coalescing operator would cause the same error from earlier, because it ONLY
//* checks for null or undefined, NOT falsey values like 0 or an empty string

const didProvideFalseyInput2: boolean = falseyInput ?? false //! Again, same error!

//* Even though that example gave an error, the ?? operator is still very useful for fallback values
//* for ONLY nulls and undefineds, instead of also returning false for falsey values

const FalseyOutput: string = falseyInput ?? 'falseyOutput' //* This will return '' instead of 'falseyOutput'!
