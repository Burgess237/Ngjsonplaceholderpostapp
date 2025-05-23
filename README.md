# NgJSONPlaceholderPostApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.2.

## Before Running

To install dependancies use pnpm (it's faster ;))

```bash
pnpm i
```

If you don't have pnpm installed you can install it with npm

```bash
npm i -g pnpm
```

You don't have to use `pnpm` you can just use normal npm.

## Development server

To start a local development server, run:

```bash
ng serve --o
```

`--o` automtically opens your browser, it is optional.

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Project explination

This is a coding test set out by ~~redacted~~ to demostrate `Angular`, `ngrx` and Angular best practice knowledge.

On load the project will fetch 100 posts from [jsonplaceholder.com](http://jsonplaceholder.com) and display them in a 10x10 grid which is the array of posts. On clicking on each square the text in the post will change to the next key in the `post` object

- Only 1 post may be active at a time
- On clicking on a different post the previous post will reset to it initial state
- The active post ID is displayed at the top of the screen.

## Notes about the project

### 1. Posts

Initially I struggled wrapping my head around this one, and thinking of a reliable way of looping through the keys in the object. I wanted to avoid actually listing them out and hard coding them: You don't want to have to change a whole bunch of code all over the place whenever the object changes in the API. I had to settle on a `KEYS` constant in the models folder. This isn't ideal but it is at least generated by a typed `Post`. This way should you modify the `Post` type in any way the `KEYS` constant will throw an error as it's input doesn't match the type.

### 2. NgRx

While I'm not overly familiar with `NgRx` itself I did find some similarities with the end product of other state management products I've used. There is a good case in this project to not use state management libraries at all, instead using the `replay/subject` pattern. Once I got the boilerplate code down and had a proof of concept in place that started working it was just a case of "rinse and repeat as needed".

### 3. Signals

I'm aware that signals are all the rage in angular these days, especially with NgRx signal store and signal store in general. I'm not fully comfortable with signals in general as most posts and information I've seen is focused on replacing ngrx with signals instead of a balanced approach of using signals where they would be strongest and observables where they would be strongest. The best case is this very app. You _could_ translate everything to signals but there is no need to. It would be an extra step in a lot of places there is isn't needed.

### 4. Tests

I dreaded this part the most: The infamous tests. The first thing that gets left out when deadlines are closing in. In my experience no developer is excited by tests. True to form neither am I. It's my weakest and took me a long time to figure out how to get all the tests to work.

The biggest challenge here for me was figuring out _what_ to test not just how.

The HTTP client was tested and that seems to work.

### 5. AI

I used copilot for code completions. I tried to work on this without any assistance before turning to AI to see what it thought. It did help with tests and I think that's where it can stay.

Most of it's suggestions were just plain wrong though and it needed a few attempts to even get right.
