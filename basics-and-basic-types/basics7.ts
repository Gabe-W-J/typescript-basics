//* Forced not null and optional chaining

const mayBeNullButIsForcedNotToBe = document.getElementById("")!;
//* You can add an exclamation mark after code that may produce a null value
//* This is a typescript feature that tells typescript that it is guaranteed not to produce null
//! Of course this is a dangerous operator to use, on the off chance that you're wrong, it can break things.
//* Be cautious when using this operator :)

//* Here, Max begins to explain Optional Chaining, which is part of JavaScript and TypeScript
//* I already wrote about this in basics6.ts, but it's just a simple inline check that i'll cover again

const mayBeNull = document.getElementById("");
console.log(mayBeNull?.className);

//* Only issue with this is that there's no fallback code, so if it's null, you won't have anything
//* The simple fix for this is using the or operator to provide a fallback value like so:

console.log(mayBeNull?.className || "mayBeNull was null :(");

//* Type casting
const doesntHaveAValueProperty = document.getElementById("");
//* This can return HTMLElement or null, but there's no specific HTML type, so it doesn't know it's an input

console.log(doesntHaveAValueProperty?.value || ""); //! value doesnt exist on all HTML elements, so we get an error here.

//* Here, we're assuming that the element we're looking for is guaranteed to be an input html value, so we
//* Need to tell typescript as such, type casting is basically a conversion method.

//* We can do so via the 'as' operator:
const nowHasAValueProperty = doesntHaveAValueProperty as HTMLInputElement;
console.log(nowHasAValueProperty.value); //* See? It has the value property now! But what if it's null?

//* Another way we could type cast this, just to check for nulls properly again:
const nowHasAValuePropertyButMayBeNull =
  doesntHaveAValueProperty as HTMLInputElement | null;
console.log(nowHasAValuePropertyButMayBeNull?.value || "");

//! Note that type casting can be incorrect and lead to bad results, if the type casting is
//! done forcefully on values that shouldn't be the type you're casting it to.
//! TypeScript will catch some bad type casts, but not all of them.
//! Worst of all, don't type cast to null, undefined, any or unknown

//* The unknown type
function mayReturnUnknown(anyVal: any, unknownVal: unknown): Function | void {
  //* You could always make a union type, but what if you don't know what the function will give you?
  //* You could use the any type, but it wouldn't be restrictive enough to understand what you're getting
  //* And you could use things you get incorrectly

  anyVal.function(); //! What if anyVal doesn't have a function?
  unknownVal.function();
  //! See how this one errors out? It's being cautious because we havent checked if unknownVal has a function yet

  //* How about we check if unknownVal is an object then? See if it contains a function?
  if (
    typeof unknownVal === "object" &&
    !!unknownVal &&
    "function" in unknownVal &&
    typeof unknownVal.function === "function"
  ) {
    //* Here, we're checking if unknownVal is an object, if it's truthy (i.e not not null)
    //* and if there's a property 'function' in unknownVal, and if that property is actually a function
    //* Look what happens when we put unknownVal here now!
    unknownVal; //* See? It's an object with a record of 'function'

    //* So if we were to call function now...
    unknownVal.function();
    //* No problemo!
    return unknownVal.function();
  }
}

const unknownValFunction = mayReturnUnknown(mayBeNull, mayReturnUnknown)
//? Of course, this will just make unknownValFunction = mayReturnUnknown(), but it's still a useful method set.