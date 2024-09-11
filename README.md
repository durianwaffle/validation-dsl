# Validation min example-dsl

## How to start

The Validation min example-dsl Example is a minimal DSL example inspired by [arithmetics](https://langium.org/showcase/arithmetics/) which has assignment and function calls but added binary maxium call stack exceed issue by membercall and namedelement.

* Ensure the complete project was properly built, otherwise run `npm install` and `npm run build` from the root of the Langium project.
* And ensure that you have installed `yarn`.
* Then you can install dependencies by running `npm install` then generate AST types using `npm run langium:generate` and finally run `npm run build` at examples\maxiumcallstacksizeexceed directory.
* Go back to the root of the Langium project, run extension `maxiumcallstacksizeexceed`.

## VSCode Extension

Please use the VSCode run configuration "Run Arithmetics Extension" to launch a new VSCode instance including the extension for this language.
Use the run configuration "Attach" to attach the debugger.
