module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(^..+\\.tests?\\.(j|t)sx?$)|(^.+/__(tests?|specs?)__/.+\\.(j|t)sx?$)',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
