// Custom Karma preprocessor to wrap tests with file path as suite name

const path = require('path');

const createFilePathPreprocessor = function(config, emitter, logger) {
  const log = logger.create('preprocessor.reports-with-file-paths');

  return function(content, file, done) {
    // Get relative path from current working directory
    const relativePath = path.relative(process.cwd(), file.path);

    // Wrap the entire file content in a describe block with the file path
    const wrappedContent = `describe('${relativePath}', function() {\n${content}\n});`;

    log.debug('Wrapping %s with file path suite', relativePath);
    done(null, wrappedContent);
  };
};

createFilePathPreprocessor.$inject = ['config', 'emitter', 'logger'];

module.exports = {
  'preprocessor:reports-with-file-paths': ['factory', createFilePathPreprocessor]
};
