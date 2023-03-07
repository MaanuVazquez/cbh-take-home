# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

The first thing I noticed was the amount of if/else that made the code confused, to solve this we should check the code for the routes that could lead the function to do an early return:
 - Not having an event should result in a return of `0`.
 - Not having a partition key leads to stringify the whole event and encode it using `SHA3-512` which always result in a `256` length string so we can avoid checking for the length.
 - Check whether the event is already an string to avoid unnecessary operations.
 - Check first if the candidate match the acceptance critearia to early return it.
 - Otherwise we encrypt it using `SHA3-512` and return.

 Some minors changes:
 - Moving the encrypt and encrypt event logic to their own functions for DRY and readability.
 - Move contants out of the function to avoid creating them every time the function is called.
 - During testing found that it breaks with Symbols, so when we receive a Symbol as the event or the partitionKey we return `0` because Symbols cannot be stringified.