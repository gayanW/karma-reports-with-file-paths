# karma-reports-with-file-paths

> Karma preprocessor that wraps test files with their file path as the suite name

This preprocessor automatically wraps each test file in a `describe` block using the file path as the suite name. This is useful when you want to track which file each test belongs to in your test reports.

## Installation

```bash
npm install karma-reports-with-file-paths --save-dev
```

## Configuration

Add `reports-with-file-paths` to your preprocessors in `karma.conf.js`:

```javascript
module.exports = function(config) {
  config.set({
    preprocessors: {
      '**/*.spec.js': ['reports-with-file-paths']
    },

    plugins: [
      require('karma-reports-with-file-paths'),
      // ... other plugins
    ]
  });
};
```

## Example

**Input file:** `test/example.spec.js`
```javascript
describe('Example', function() {
  it('should pass', function() {
    expect(true).toBe(true);
  });
});
```

**After preprocessing:**
```javascript
describe('test/example.spec.js', function() {
  describe('Example', function() {
    it('should pass', function() {
      expect(true).toBe(true);
    });
  });
});
```

After preprocessing, the file path becomes the outermost suite name. In Karma's test result object (used by reporters), `result.suite[0]` will now contain the file path `'test/example.spec.js'` instead of just the suite name `'Example'`.

## Use Cases

### 1. JSON Reporter ([karma-json-reporter](https://www.npmjs.com/package/karma-json-reporter))

Generate JSON test results with file paths in the suite hierarchy.

**Output format:**
```json
{
  "result": {
    "fullName": "test/example.spec.js Example should pass",
    "description": "should pass",
    "suite": ["test/example.spec.js", "Example"],
    "success": true,
    "time": 1
  }
}
```

The `suite` array's first element is now the file path.

### 2. JUnit Reporter ([karma-junit-reporter](https://www.npmjs.com/package/karma-junit-reporter))

The `classname` attribute in JUnit XML will now include the file path.

**Output format:**
```xml
<testcase name="test/example1.spec.js Example1 should add numbers"
          time="0"
          classname="test/example1.spec.js Example1"/>
```

### 3. Other Use Cases

- **Debugging:** Easily identify the source file of failing tests

## License

MIT
