import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DataObjectIcon from '@mui/icons-material/DataObject';
import {
  Divider,
  Drawer,
  Fab,
  IconButton,
  styled,
  useTheme
} from '@mui/material';
import * as prettier from 'prettier/standalone';
import { Resizable } from 're-resizable';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as ST from 'stjs';
import styles from './TransformationEditor.module.scss';
import CodeEditor from '../../shared/components/CodeEditor';
import { debounced } from '../../shared/utils/timing';
import { prettierJsonConfig } from '../../shared/utils/prettier-configs';
// import * as parserBabel from 'prettier/parser-babel';

const drawerWidth = '45vw';
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start'
}));

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
  result: '{}'
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
const TransformationEditor: React.FC = () => {
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

  const onTemplateChange = debounced(
    async (val: string | undefined): Promise<void> => {
      if (!val) {
        return;
      }
      try {
        const parsedData = JSON.parse(transformProperties.data);
        const parsedVal = JSON.parse(val);
        const transformResult: Record<string, unknown> = ST.select(parsedData)
          .transformWith(parsedVal)
          .root() as Record<string, unknown>;

        const prettifiedTransformedResult = await prettier.format(
          JSON.stringify(transformResult),
          prettierJsonConfig
        );
        setTransformProperties((prev) => ({
          data: prev.data,
          template: val,
          stringifyTemplate: generateTemplateString(JSON.stringify(val)),
          result: prettifiedTransformedResult
        }));
      } catch (error: unknown) {
        if (error instanceof Error) {
          // mostly syntax error since user has not finished typing so safe to ignore
        }
      }
    },
    1000
  );

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

    const transformResult: unknown = ST.select(transformProperties.data)
      .transformWith(template, null, true)
      .root();

    setTransformProperties((prev) => ({
      stringifyTemplate: val,
      template: JSON.stringify(template),
      data: prev.data,
      result: JSON.stringify(transformResult)
    }));
  };

  const onDataChange = async (val: string | undefined): Promise<void> => {
    if (!val) {
      return;
    }

    const parsedData = JSON.parse(val);
    const parsedTemplate = JSON.parse(transformProperties.template);
    const transformResult: Record<string, unknown> = ST.select(parsedData)
      .transformWith(parsedTemplate)
      .root() as Record<string, unknown>;
    const prettifiedTransformedResult = await prettier.format(
      JSON.stringify(transformResult),
      prettierJsonConfig
    );
    setTransformProperties((prev) => ({
      ...prev,
      data: val,
      result: prettifiedTransformedResult
    }));
  };

  return (
    <div className={styles['container']}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth
          }
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
        <CodeEditor
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
            width: '47vw'
          }}
          className={styles['codeEditorContainer']}
        >
          <CodeEditor
            initialValue={transformProperties.template}
            language="json"
            prettierConfigOverride={prettierJsonConfig}
            onChange={onTemplateChange}
          />
        </Resizable>
        <Resizable
          defaultSize={{
            height: '60vh',
            width: '47vw'
          }}
        >
          <CodeEditor
            initialValue={transformProperties.result}
            prettierConfigOverride={prettierJsonConfig}
            language="json"
            readonly={true}
          />
        </Resizable>
        <Resizable
          defaultSize={{
            height: '25vh',
            width: '95vw'
          }}
        >
          <CodeEditor
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
export default TransformationEditor;
