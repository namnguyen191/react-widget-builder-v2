import DataObjectIcon from '@mui/icons-material/DataObject';

import { Fab } from '@mui/material';
import { Resizable } from 're-resizable';
import { ReactElement, useState } from 'react';
import { DataEditor } from './DataEditor';
import { JavaScriptEditor } from './JavaScriptEditor';
import { StringifiedJsEditor } from './StringifiedJsEditor';
import { TransformResultView } from './TransformResultView';
import styles from './TransformationEditorV2.module.scss';

export const TransformationEditorV2 = (): ReactElement => {
  const [isDataDrawerOpen, setIsDataDrawerOpen] = useState<boolean>(false);

  return (
    <div className={styles['container']}>
      <Fab
        variant="extended"
        className={styles['dataButton']}
        onClick={() => setIsDataDrawerOpen(true)}
      >
        <DataObjectIcon sx={{ mr: 1 }} />
        Data
      </Fab>
      <DataEditor
        isOpen={isDataDrawerOpen}
        onCloseClick={() => setIsDataDrawerOpen(false)}
      />
      <div className={styles['editorsContainer']}>
        <Resizable
          defaultSize={{
            height: '80vh',
            width: '47vw'
          }}
          className={styles['codeEditorContainer']}
        >
          <JavaScriptEditor />
        </Resizable>
        <Resizable
          defaultSize={{
            height: '80vh',
            width: '47vw'
          }}
        >
          <TransformResultView />
        </Resizable>
        <Resizable
          defaultSize={{
            height: '10vh',
            width: '95vw'
          }}
        >
          <StringifiedJsEditor />
        </Resizable>
      </div>
    </div>
  );
};
