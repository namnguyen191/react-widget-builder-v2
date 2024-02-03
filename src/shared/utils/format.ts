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
  input = input.replace(/\\"/g, '"');
  input = input.replace(/\\n/g, '\n');

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

export const StringToJSCodes = (input: string) => {
  input = input.replace(/\\"/g, '"').replace(/\\n/g, '\n');
  return input;
};

export const StringToJSCodesV2 = (input: string) => {
  input = input.slice(0, -1);
  input = input.slice(1);
  input = input.replace(/\\"/g, '"').replace(/\\n/g, '\n');
  return input;
};

export const JSCodesToString = (input: string) => {
  input = input.trim();

  // STJS doesn't like semi colon at the end
  if (input[input.length - 1] === ';') {
    input = input.substring(0, input.length - 1);
  }

  input = input.replace(/"/g, '\\"');

  return input;
};

export const JSCodesToStringV2 = (input: string) => {
  input = input.trim();

  input = input.replace(/"/g, '\\"');

  return `"${input}"`;
};

export const trimAllExcessWhiteSpaces = (val: string): string => {
  return val.replace(/\s+/g, ' ').trim();
};

export const trimAllLineBreaks = (val: string): string => {
  return val.replace(/\\n/g, '');
};

export const trimAllTabs = (val: string): string => {
  return val.replace(/\\t/g, '');
};
