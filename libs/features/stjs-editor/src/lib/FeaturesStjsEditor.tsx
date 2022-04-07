import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DataObjectIcon from '@mui/icons-material/DataObject';
import {
  Divider,
  Drawer,
  Fab,
  IconButton,
  styled,
  useTheme,
} from '@mui/material';
import { SharedComponentsCodeEditor } from '@uihub/shared/components/code-editor';
import prettier from 'prettier';
import graphQLParser from 'prettier/parser-babel';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore nx react compiler can't seems to understand that this exist
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

const prettierJsonConfig: prettier.Options = {
  parser: 'json',
  plugins: [graphQLParser],
};

type StjsTransformProperties = {
  template: string;
  stringifyTemplate: string;
  data: string;
  result: string;
};

const INITIAL_STJS_PROPERTIES: StjsTransformProperties = {
  template: '{}',
  stringifyTemplate: '"{}"',
  data: '{}',
  result: '{}',
};

export const FeaturesStjsEditor: React.FC = () => {
  // drawer properties
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  // stjs properties
  const [transformProperties, setTransformProperties] =
    useState<StjsTransformProperties>(INITIAL_STJS_PROPERTIES);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onTemplateChange = (val: string | undefined): void => {
    if (!val) {
      return;
    }

    let template: string = val.split(' = ')[1];
    // trim ; at the end if exist
    if (template.endsWith(';')) {
      template = template.slice(0, -1);
    }

    const transformResult: string = ST.select(
      JSON.parse(transformProperties.data)
    )
      .transformWith(template, null, true)
      .root();

    let objFromTemplate: Record<string, any> | string | null = null;
    try {
      objFromTemplate = JSON.parse(
        prettier.format(template, prettierJsonConfig)
      );
    } catch (err) {
      objFromTemplate = template;
    }

    setTransformProperties((prev) => ({
      data: prev.data,
      template,
      stringifyTemplate: `"${JSON.stringify(objFromTemplate).replace(
        /"/g,
        '\\"'
      )}"`,
      result: transformResult,
    }));
  };

  const onStringifyTemplateChange = (val: string | undefined): void => {
    if (!val) {
      return;
    }

    let template = {};
    try {
      template = JSON.parse(JSON.parse(val));
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      }

      if (typeof err === 'string') {
        toast.error(err);
      }

      console.log(err);
    }

    const transformResult: any = ST.select(transformProperties.data)
      .transformWith(template, null, true)
      .root();

    setTransformProperties((prev) => ({
      stringifyTemplate: val,
      template: JSON.stringify(template),
      data: prev.data,
      result: JSON.stringify(transformResult),
    }));
  };

  const onDataChange = (val: string | undefined): void => {
    if (!val) {
      return;
    }

    const transformResult: string = ST.select(val, null, true)
      .transformWith(transformProperties.template, null, true)
      .root();

    setTransformProperties((prev) => ({
      ...prev,
      data: val,
      result: transformResult,
    }));
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
          initialValue={transformProperties.data}
          onChange={onDataChange}
          language="json"
          prettierConfigOverride={prettierJsonConfig}
        />
      </Drawer>
      <Fab
        variant="extended"
        className={styles['dataButton']}
        onClick={handleDrawerOpen}
      >
        <DataObjectIcon sx={{ mr: 1 }} />
        Data
      </Fab>
      <div className={styles['editorsContainer']}>
        <div className={styles['codeEditorContainer']}>
          <SharedComponentsCodeEditor
            initialValue={`const template = ${transformProperties.template};`}
            onChange={onTemplateChange}
          />
        </div>
        <div
          className={`${styles['codeEditorContainer']} ${styles['transformResult']}`}
        >
          <SharedComponentsCodeEditor
            initialValue={transformProperties.result}
            language="json"
            readonly={true}
          />
        </div>
        <div
          className={`${styles['codeEditorContainer']} ${styles['transformTemplateText']}`}
        >
          <SharedComponentsCodeEditor
            enableFormat={false}
            language="text"
            initialValue={transformProperties.stringifyTemplate}
            onChange={onStringifyTemplateChange}
          />
        </div>
      </div>
    </div>
  );
};
