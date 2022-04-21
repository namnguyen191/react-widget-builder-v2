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
import { debounced } from '@uihub/shared/utils';
import prettier from 'prettier';
import graphQLParser from 'prettier/parser-babel';
import { Resizable } from 're-resizable';
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

const debounceToast = debounced(toast.error, 1000);

const trimAllExcessWhiteSpaces = (val: string): string => {
  return val.replace(/\s+/g, ' ').trim();
};

const trimAllLineBreaks = (val: string): string => {
  return val.replace(/\\n/g, '');
};

const trimAllTabs = (val: string): string => {
  return val.replace(/\\t/g, '');
};

export const FeaturesStjsEditor: React.FC = () => {
  // drawer properties
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  // stjs properties
  const [transformProperties, setTransformProperties] =
    useState<StjsTransformProperties>(INITIAL_STJS_PROPERTIES);

  const generateTemplateString = (val: string): string => {
    let result: string = trimAllLineBreaks(val);
    result = trimAllTabs(result);
    result = trimAllExcessWhiteSpaces(result);

    return result;
  };

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

    const parsedData = JSON.parse(transformProperties.data);
    const parsedVal = JSON.parse(val);
    const transformResult: Record<string, unknown> = ST.select(parsedData)
      .transformWith(parsedVal)
      .root();

    setTransformProperties((prev) => ({
      data: prev.data,
      template: val,
      stringifyTemplate: generateTemplateString(JSON.stringify(val)),
      result: prettier.format(
        JSON.stringify(transformResult),
        prettierJsonConfig
      ),
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
        debounceToast(err.message);
      }

      if (typeof err === 'string') {
        toast.error(err);
      }
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

    const parsedData = JSON.parse(val);
    const parsedTemplate = JSON.parse(transformProperties.template);
    const transformResult: Record<string, unknown> = ST.select(parsedData)
      .transformWith(parsedTemplate)
      .root();

    console.log(`Nam data is: `, typeof transformResult);

    setTransformProperties((prev) => ({
      ...prev,
      data: val,
      result: prettier.format(
        JSON.stringify(transformResult),
        prettierJsonConfig
      ),
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
        <Resizable
          defaultSize={{
            height: '60vh',
            width: '47vw',
          }}
          className={styles['codeEditorContainer']}
        >
          <SharedComponentsCodeEditor
            initialValue={transformProperties.template}
            language="json"
            prettierConfigOverride={prettierJsonConfig}
            onChange={onTemplateChange}
          />
        </Resizable>
        <Resizable
          defaultSize={{
            height: '60vh',
            width: '47vw',
          }}
        >
          <SharedComponentsCodeEditor
            initialValue={transformProperties.result}
            prettierConfigOverride={prettierJsonConfig}
            language="json"
            readonly={true}
          />
        </Resizable>
        <Resizable
          defaultSize={{
            height: '25vh',
            width: '95vw',
          }}
        >
          <SharedComponentsCodeEditor
            enableFormat={false}
            language="text"
            initialValue={transformProperties.stringifyTemplate}
            onChange={onStringifyTemplateChange}
          />
        </Resizable>
      </div>
    </div>
  );
};
