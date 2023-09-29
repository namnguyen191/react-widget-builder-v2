import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DataObjectIcon from '@mui/icons-material/DataObject';
import {
  Container,
  Dialog,
  Divider,
  Drawer,
  Fab,
  IconButton,
  styled,
  useTheme
} from '@mui/material';
import type monaco from 'monaco-editor';
import * as prettier from 'prettier/standalone';
import { Resizable } from 're-resizable';
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import * as ST from 'stjs';
import CodeEditor, {
  CodeEditorProps
} from '../../shared/components/CodeEditor';
import {
  JSCodesToString,
  StringToJSCodes,
  trimAllExcessWhiteSpaces,
  trimAllLineBreaks,
  trimAllTabs
} from '../../shared/utils/format';
import {
  prettierJSConfig,
  prettierJsonConfig
} from '../../shared/utils/prettier-configs';
import { debounced } from '../../shared/utils/timing';
import styles from './TransformationEditor.module.scss';

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

const TransformationEditor: React.FC = () => {
  // drawer properties
  const theme = useTheme();
  const [dataDrawerOpen, setDataDrawerOpen] = React.useState(false);
  const [jsEditorDialogOpen, setJsEditorDialogOpen] = React.useState(false);
  const [highlightedJs, setHighlightedJs] = React.useState<string>('');
  const editedJs = React.useRef<string>('');
  const transformTemplateEditorRef =
    useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
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
    setDataDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDataDrawerOpen(false);
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

  const onDataChange = debounced(
    async (val: string | undefined): Promise<void> => {
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
    },
    2000
  );

  const generateJSAutoComplete = () => {
    const parsedData = JSON.parse(transformProperties.data);
    let generatedJS = '';
    for (const [key, val] of Object.entries(parsedData)) {
      generatedJS += `this.${key} = ${JSON.stringify(val)};`;
    }

    return {
      language: 'javascript',
      data: generatedJS
    };
  };

  const onJSEditDialogClose = () => {
    setJsEditorDialogOpen(false);
    if (!transformTemplateEditorRef.current) {
      // Handle when the dialog somehow opened before we can get the editor ref
      return;
    }

    const stringifyJSCodes = JSCodesToString(editedJs.current);
    const selection = transformTemplateEditorRef.current.getSelection();
    const operation: monaco.editor.IIdentifiedSingleEditOperation = {
      range: selection!,
      text: stringifyJSCodes,
      forceMoveMarkers: true
    };
    transformTemplateEditorRef.current.executeEdits('JsEditorDialog', [
      operation
    ]);
  };

  const editJSAction: CodeEditorProps['actionOnHighlightedText'] = {
    name: 'Edit JS',
    callBack: async (highlightedText, editor) => {
      let prettifyJsCodes = '';
      try {
        prettifyJsCodes = await prettier.format(
          StringToJSCodes(highlightedText),
          prettierJSConfig
        );
      } catch (_err) {
        console.warn('JS syntax error detected');
        prettifyJsCodes = StringToJSCodes(highlightedText);
      }
      editedJs.current = highlightedText;
      setHighlightedJs(prettifyJsCodes);
      setJsEditorDialogOpen(true);
      transformTemplateEditorRef.current = editor;
    }
  };

  const onJSEdit = (val: string | undefined) => {
    if (!val) {
      return;
    }

    editedJs.current = val;
  };

  return (
    <div className={styles['container']}>
      <Dialog
        open={jsEditorDialogOpen}
        onClose={onJSEditDialogClose}
        fullScreen={true}
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '5rem'
        }}
      >
        <Container style={{ height: '100%', width: '50vw', padding: 0 }}>
          <CodeEditor
            initialValue={highlightedJs}
            prettierConfigOverride={prettierJSConfig}
            onChange={onJSEdit}
            addToAutoComplete={generateJSAutoComplete()}
          />
        </Container>
      </Dialog>
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
        open={dataDrawerOpen}
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
            actionOnHighlightedText={editJSAction}
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
