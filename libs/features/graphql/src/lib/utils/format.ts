import prettier from 'prettier';
import graphQLParser from 'prettier/parser-graphql';

export const stringToGraphQL = (input: string) => {
  input = input.trim();
  if (input[0] === '"') {
    input = input.substring(1);
  }
  if (input[input.length - 1] === '"') {
    input = input.substring(0, input.length - 1);
  }
  input = input.replace(/\\/g, '');
  try {
    input = prettier.format(input, {
      parser: 'graphql',
      plugins: [graphQLParser],
    });
  } catch (err) {
    console.log(
      'Fail to create Graphql code from raw string due to invalid fomart: ',
      err
    );
    input = '';
  }
  return input;
};

export const graphQLToString = (input: string) => {
  input = input
    .replace(/"/g, '\\"')
    .replace(/\r?\n|\r/g, ' ')
    .replace(/\s\s/g, '');

  return `"${input}"`;
};
