import * as parserBabel from 'prettier/plugins/babel';
import * as parserEstree from 'prettier/plugins/estree';
import * as parserGraphQl from 'prettier/plugins/graphql';
import { Options } from 'prettier';

export const prettierGraphqlConfig: Options = {
  parser: 'graphql',
  plugins: [parserGraphQl]
};

export const prettierJsonConfig: Options = {
  parser: 'json',
  plugins: [parserBabel, parserEstree]
};
