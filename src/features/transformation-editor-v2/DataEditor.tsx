import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Divider, Drawer, IconButton, styled, useTheme } from '@mui/material';
import { ReactElement } from 'react';
import CodeEditor from '../../shared/components/CodeEditor';
import { prettierJsonConfig } from '../../shared/utils/prettier-configs';
import { debounced } from '../../shared/utils/timing';
import { useAppDispatch, useAppSelector } from '../../storeHooks';
import { editData, selectData } from './transformationSlice';

const drawerWidth = '45vw';
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start'
}));

export type DataEditorProps = {
  isOpen: boolean;
  onCloseClick: () => void;
};
export const DataEditor = (props: DataEditorProps): ReactElement => {
  const { isOpen, onCloseClick } = props;
  const data = useAppSelector(selectData);
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const onDataChange = debounced((val: string | undefined): void => {
    if (!val) {
      return;
    }
    dispatch(editData(val));
  }, 1000);

  return (
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
      open={isOpen}
    >
      <DrawerHeader>
        <IconButton onClick={onCloseClick}>
          {theme.direction === 'rtl' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <CodeEditor
        initialValue={data}
        onChange={onDataChange}
        language="json"
        prettierConfigOverride={prettierJsonConfig}
      />
    </Drawer>
  );
};
