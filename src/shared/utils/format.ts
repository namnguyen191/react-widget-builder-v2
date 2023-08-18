import * as prettier from 'prettier/standalone';
import { prettierGraphqlConfig } from './prettier-configs';

export const stringToGraphQL = async (input: string) => {
  input = input.trim();
  if (input[0] === '"') {
    input = input.substring(1);
  }
  if (input[input.length - 1] === '"') {
    input = input.substring(0, input.length - 1);
  }
  input = input.replace(/\\n/g, '');
  input = input.replace(/\\/g, '');
  input = await prettier.format(input, prettierGraphqlConfig);

  return input;
};

export const graphQLToString = (input: string) => {
  input = input
    .replace(/"/g, '\\"')
    .replace(/\r?\n|\r/g, ' ')
    .replace(/\s\s/g, '');

  return `"${input}"`;
};
