配置文件 `${rootFolder}/cypress.json`

## 别名

```js
cy
  .get('.my-selector')
  .as('myElement') // sets the alias
  .click()

/* many more actions */

cy
  .get('@myElement') // re-queries the DOM as before (only if necessary)
  .click()
`

## 钩子

```js
describe('Hooks', function() {
  before(function() {
    // runs once before all tests in the block
  })

  after(function() {
    // runs once after all tests in the block
  })

  beforeEach(function() {
    // runs before each test in the block
  })

  afterEach(function() {
    // runs after each test in the block
  })
})
```

## test structure

`context()` 与 `describe()` 相等，`specify()` 与 `it()` 相等。