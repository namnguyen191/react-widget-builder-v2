import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DataObjectIcon from '@mui/icons-material/DataObject';
import {
  Button,
  Divider,
  Drawer,
  IconButton,
  styled,
  useTheme,
} from '@mui/material';
import { SharedComponentsCodeEditor } from '@uihub/shared/components/code-editor';
import prettier from 'prettier';
import graphQLParser from 'prettier/parser-babel';
import React, { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as ST from 'stjs';
import styles from './FeaturesStjsEditor.module.scss';

const drawerWidth = '45vw';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

const TRANSFORMATION_PLACEHOLDER = 'const transformation = {};';
const DATA_PLACEHOLDER = '{}';

const prettierJsonConfig: prettier.Options = {
  parser: 'json',
  plugins: [graphQLParser],
};

export const FeaturesStjsEditor: React.FC = () => {
  // drawer properties
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  // stjs properties
  const [stjsData, setStjsData] = useState<string>(DATA_PLACEHOLDER);
  const [stjsTransformationCode, setStjsTransformationCode] = useState<string>(
    TRANSFORMATION_PLACEHOLDER
  );
  const [stjsTransformationText, setStjsTransformationText] =
    useState<string>('');
  const [stjsTransformationResult, setStjsTransformationResult] =
    useState<string>('{}');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onStjsCodeChange = (val: string | undefined): void => {
    if (!val) {
      setStjsTransformationCode('');
      return;
    }

    setStjsTransformationCode(val);

    const template = val.split('const transformation = ')[1];
    let transformResult: string = ST.select(JSON.parse(stjsData))
      .transformWith(template, null, true)
      .root();

    // trim ; at the end if exist
    if (transformResult.endsWith(';')) {
      transformResult = transformResult.slice(0, -1);
    }

    setStjsTransformationResult(transformResult);
  };

  const onStjsDataChange = (val: string | undefined): void => {
    if (!val) {
      setStjsData('');
      return;
    }

    setStjsData(val);
  };

  return (
    <div className={styles['container']}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <SharedComponentsCodeEditor
          initialValue={stjsData}
          onChange={onStjsDataChange}
          language="json"
          prettierConfigOverride={prettierJsonConfig}
        />
      </Drawer>
      <Button
        id="customized-button"
        aria-controls={open ? 'customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleDrawerOpen}
        endIcon={<DataObjectIcon />}
        className={styles['dataButton']}
      >
        Data
      </Button>
      <div className={styles['editorsContainer']}>
        <div className={styles['codeEditorContainer']}>
          <SharedComponentsCodeEditor
            initialValue={stjsTransformationCode}
            onChange={onStjsCodeChange}
          />
        </div>
        <div
          className={`${styles['codeEditorContainer']} ${styles['transformResult']}`}
        >
          <SharedComponentsCodeEditor
            initialValue={stjsTransformationResult}
            language="json"
            readonly={true}
          />
        </div>
      </div>
    </div>
  );
};
