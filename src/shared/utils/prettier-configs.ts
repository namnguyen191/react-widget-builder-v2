import { Options } from 'prettier';
import * as parserBabel from 'prettier/plugins/babel';
import * as parserEstree from 'prettier/plugins/estree';
import * as parserGraphQl from 'prettier/plugins/graphql';

export const prettierGraphqlConfig: Options = {
  parser: 'graphql',
  plugins: [parserGraphQl]
};

export const prettierJsonConfig: Options = {
  parser: 'json',
  plugins: [parserBabel, parserEstree]
};

export const prettierJSConfig: Options = {
  parser: 'babel-flow',
  plugins: [parserBabel, parserEstree],
  semi: true,
  singleQuote: true,
  trailingComma: 'none'
};
