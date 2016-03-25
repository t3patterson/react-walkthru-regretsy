/**
 * PART 0
 *
 * Write a function that calculates the sum of all the numbers in an array
 */
​
​function sumOfArray(numsArr){

  var theTotal = 0

  for (var i = 0; i < numsArr.length ; i++){
    console.log('------------')
    console.log('Iteration: ' + i )
    console.log('Starting theTotal: ' + theTotal)

    console.log('current element value: ' + numsArr[i])
    theTotal += numsArr[i]
    
    console.log('Ending theTotal: ' + theTotal)
    console.log('-------------')
  }

  return theTotal
}

console.log(sumOfArray([1, 10, 4, 8, 2]) === 25);
console.log(sumOfArray([]) === 0);
console.log(sumOfArray([1, 2, 3]) === 6);
console.log(sumOfArray([10, 9, 8]) === 27);
​
​
console.assert(sumOfArray([1, 2]) === 3);
console.assert(sumOfArray([]) === 0);
console.assert(sumOfArray([1, 2, 3]) === 6);
console.assert(sumOfArray([10, 9, 8]) === 27);
​
// PART 1
​
// Write a function maxOfArray() that takes an array of
// numbers as an argument and finds the highest number.
​
function maxOfArray(numsArr){

  var maxNum = numsArr[0]

  for (var i = 0; i < numsArr.length; i++){
    console.log("===========================")
    console.log("iteration-index---"+ i )
    console.log('Currrent MaxNum: ' + maxNum)

    console.log("current element value: " + numsArr[i])
    if( numsArr[i] > maxNum ){
      maxNum = numsArr[i]
    }

    console.log('Ending MaxNum: ' + maxNum)
  }

  return maxNum
}
console.assert(maxOfArray([2,4,33,22,23,3]) === 33)
console.assert(maxOfArray([10,9,8,100,7,6]) === 100)
console.assert(isNaN(maxOfArray([1,2,'bucklemyshoe'])))
​
/**
 * PART 2
 *
 * Write a function isVowel() that takes a character (i.e. a string of length 1)
 * and returns true if it is a vowel, false otherwise.
 */
​
function isVowel(character){
  var charIsVowel = false 

  if ( character === "a" || 
       character === "A" || 
       character === "e" || 
       character === "E" || 
       character === "i" || 
       character === "o" || 
       character === "O" || 
       character === "u" || 
       character === "u" ) {

    charIsVowel = true
  } 

  return charIsVowel
}
// console.assert(isVowel(0) === false);
console.log(isVowel("B") === false);
console.log(isVowel("b") === false);
console.log(isVowel("a") === true);
console.log(isVowel("E") === true);
​
/**
 * Part 3
 *
 * Define a function reverse() that computes
 * the reversal of a string. For example,
 * reverse("skoob") should return the
 * string "books".
 */
​
function reverse(inputStr){

  var reversedStr = '';

  for (var i = inputStr.length - 1 ; i >= 0 ; i--){
    reversedStr += inputStr[i]
    console.log(i,'-', reversedStr)
  }

  return reversedStr
}

console.assert(reverse("books") === "skoob")
console.assert(reverse("we don't want no trouble") === "elbuort on tnaw t'nod ew")
​
​
/**
 * Part 4
 *
 * write a function the returns a FizzBuzz string for some number N (counting up from 1).
 * - for every number that isn't a multiple of 3 or 5, return a period "."
 * - for every number that is a multiple of 3 (but not 5), return "fizz"
 * - for every number that is a multiple of 5 (but not 3), return "buzz"
 * - for every number that is a multiple of 3 and 5, return "fizzbuzz"
 */
​
​
​
console.assert(fizzbuzz(1) === ".")
console.assert(fizzbuzz(2) === "..")
console.assert(fizzbuzz(3) === "..fizz")
console.assert(fizzbuzz(5) === "..fizz.buzz")
console.assert(fizzbuzz(10) === "..fizz.buzzfizz..fizzbuzz")
​
/**
 * Part 5
 *
 * Write a function findLongestWord() that takes a string of 
 words and returns the longest word.
 * i.e. findLongestWord("a book full of dogs") should return "book"
 */
​
function findLongestWord(sentence){
    // YOUR CODE HERE
}
​
console.assert(findLongestWord("a book full of dogs") === "book")
console.assert(findLongestWord("don't mess with Texas") === "Texas")
​
​
​
/**
 * PART 6
 *
 * write a function that returns the Greatest Common Denominator of two numbers
 * - if no GCD exists, return 1
 */
​
​
​
console.assert(GCD(5,1) === 1);
console.assert(GCD(15,3) === 3);
console.assert(GCD(15,5) === 5);
console.assert(GCD(50,20) === 10);