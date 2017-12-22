# atom-test-runner-jest

Use [Jest](https://facebook.github.io/jest/) to bring Delightful JavaScript Testing to your [Atom](https://atom.io/) packages.

## Installation

```
npm install atom-test-runner-jest --save-dev
```

## Usage

Add the following line to your `package.json`:

```json
{
  "name": "my-package",
  // ...
+  "atomTestRunner": "atom-test-runner-jest",
  // ...
}
```

Write your unit tests in `/spec/`:

```js
describe("My Delightful Package", () => {
  it("knows about all of Atom's loaded packages", () => {
    const packages = atom.packages.getLoadedPackages();
    expect(packages).toMatchSnapshot();
  })
})
```

To run your tests run the following in your shell:

```
atom --test .
```