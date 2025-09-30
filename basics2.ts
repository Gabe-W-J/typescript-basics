//* The any type: Built into typescript, and as the name suggests, accepts any value

let anyValue: any = 36;

anyValue = '36';
anyValue = false;
anyValue = {};
anyValue = [];

//* As this seems to suggest, the any type should be used only where needed, as it lowkey
//* just removes the point of typescript

//* Union types:
//* If types should be more than one type, but not all of them, then let it be both like so:

let unionValue: string | number = 36

unionValue = '36'
unionValue = false;
unionValue = {};    //! See? These ones don't work because we made it so that unionValue can only be of types string or number
unionValue = [];


//* Typed arrays

let inferredStringArray = ['string1', 'string2']
let typedStringArray: string[]

inferredStringArray.push(60) //! This won't work because 60 is not a string, same goes for the typedStringArray
typedStringArray.push('string1', 'string2') //! This should work, but because typedStringArray isn't actually anything yet, it won't work.

typedStringArray = [] //* Here, we're making typedStringArray just be an empty array
typedStringArray.push('string1', 'string2') //* See? It works now!

inferredStringArray.push(typedStringArray[0], typedStringArray[1]) //* Now inferredStringArray will be ['string1', 'string2', 'string1', 'string2']
typedStringArray.push(inferredStringArray[0], inferredStringArray[1]) //* Now typedStringArray will be ['string1', 'string2', 'string1', 'string2']

//* Union typed arrays

let unionArray: (string | number)[] = []; //* This is now an array that can contain either strings or numbers, but we're initialising it as blank
unionArray.push(anyValue) //? This shouldn't work, but does because an anyValue isn't just the type of the value you last set it to, but is just all values, may cause runtime error
unionArray.push(unionValue) //* because unionValue is either a string or a number, adding it to this unionArray is perfectly acceptable
unionArray.push('string0') //* It's a string, so no problem
unionArray.push(1) //* It's a number, no problemo
unionArray.push(typedStringArray[0], typedStringArray[1]) //* These are also string values from a string only array, so no problem here either
unionArray.push(false, {}, []) //! This won't work because boolean isn't a string or a number, but because {} and [] are empty, they are seen as fine when they are not

unionArray.push(inferredStringArray)
//! See? Giving it an entire array makes it complain, because this array is simply typed not to accept anything that isn't a string or a number

let object = { object: '' } 
unionArray.push(object) //! Even though the object only contains one string, it's still an object and not a string or a number

//* Alternative to define a union typed array
let unionArray2: Array<string | number>
//* Array is what's called a 'Generic Type', but this functions exactly the same way as the first unionArray


//* Tuples

let shouldOnlyBeTwoValues: number[]; //* This wouldn't work as intended, because if you only wanted [0, 1], any other numbers could be added

let canOnlyBeTwoValues: [number, number]; //* This limits the item to only be two numbers, cant be one less or one more.
canOnlyBeTwoValues = [0]; //! See, you can't just give it one value!
canOnlyBeTwoValues = [0, 1, 2]; //! Can't give it three either.
canOnlyBeTwoValues = [0, 1] //* Bingo. Butttt....
canOnlyBeTwoValues = [5, 10] //? If we only want 0 or 1, this is no good.

let binary: [0, 1]; //* This can ONLY be 0 and 1, and even though it technically hasn't been assigned a variable yet, because it can only be one thing it's value is inferred.
binary = [1, 0] //! 1 isn't assignable to 0 and 0 isn't assignable to 1
binary = canOnlyBeTwoValues //! See the difference here? Because it isn't set in stone what canOnlyBeTwoValues is, binary wont accept it
canOnlyBeTwoValues = binary //* But because binary is always two numbers, canOnlyBeTwoValues will accept it no problem.
binary = [0, 1] //* As intended, this works, because it's the only value it can be, even if we don't need to set it we can.

//* Of course, something like binary can also be achieved like so:
const constBinary = [0, 1]
constBinary = [1,2] //! Because it's a constant, we can't change it, so it'll always just be 0 or 1
//* But both concepts are nice to know.

