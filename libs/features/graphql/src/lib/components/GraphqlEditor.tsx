import { SharedComponentsCodeEditor } from '@uihub/shared/components/code-editor';
import graphQLParser from 'prettier/parser-graphql';
import styles from './GraphqlEditor.module.scss';

export const GraphqlEditor: React.FC = () => {
  const prettierGraphqlConfig = {
    parser: 'graphql',
    plugins: [graphQLParser],
  };

  return (
    <div className={styles['container']}>
      <SharedComponentsCodeEditor
        language="graphql"
        prettierConfigOverride={prettierGraphqlConfig}
      />
    </div>
  );
};
