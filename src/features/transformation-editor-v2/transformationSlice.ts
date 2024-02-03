import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as prettier from 'prettier/standalone';
import { toast } from 'react-toastify';
import { minify } from 'terser';
import {
  JSCodesToStringV2,
  StringToJSCodesV2
} from '../../shared/utils/format';
import { prettierJSConfig } from '../../shared/utils/prettier-configs';
import { debounced } from '../../shared/utils/timing';
import { RootState } from '../../store';
import { TRANSFORMATION_STATE_KEY } from '../../storeHooks';

const debounceToast = debounced(toast.error, 1000);

export interface TransformationState {
  js: string;
  stringifiedJs: string;
  data: string;
}

const defaultJs = 'return {}';
const defaultstringifiedJs = '"return{};"';
const defaultData = '{}';

const initialState: TransformationState = {
  js: defaultJs,
  stringifiedJs: defaultstringifiedJs,
  data: defaultData
};

const transform = (jsCode: string, data: string): string => {
  try {
    const parsedData = JSON.parse(data);
    const transformFunction = Function(jsCode).bind(parsedData);
    const transformResult: unknown = transformFunction();
    const stringifyTransformResult = (res: unknown): string => {
      if (typeof transformResult === 'object') {
        return JSON.stringify(transformResult);
      }

      return String(res);
    };

    return stringifyTransformResult(transformResult);
  } catch (error) {
    if (error instanceof Error) {
      // mostly syntax error since user has not finished typing so safe to ignore
      debounceToast(`You have an error in your syntax: ${error.message}`);
    }
    return 'Error in transformation';
  }
};

export const editJs = createAsyncThunk(
  'transformation/editJs',
  async (val: string) => {
    const { code: minifiedJs } = await minify(val, {
      sourceMap: false,
      mangle: false,
      compress: false,
      parse: {
        bare_returns: true
      }
    });
    const stringifiedJs = JSCodesToStringV2(minifiedJs ?? '');
    return {
      stringifiedJs,
      js: val
    };
  }
);

export const editstringifiedJs = createAsyncThunk(
  'transformation/editstringifiedJs',
  async (val: string) => {
    const js = StringToJSCodesV2(val);
    const prettifiedJs = await prettier.format(js, prettierJSConfig);
    return {
      stringifiedJs: val,
      prettifiedJs
    };
  }
);

const transformationSlice = createSlice({
  name: TRANSFORMATION_STATE_KEY,
  initialState,
  reducers: {
    editData: (state, action: PayloadAction<string>) => {
      const newData = action.payload;
      state.data = newData;
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(editstringifiedJs.fulfilled, (state, { payload }) => {
        const { stringifiedJs, prettifiedJs } = payload;
        state.stringifiedJs = stringifiedJs;
        state.js = prettifiedJs;
      })
      .addCase(editstringifiedJs.rejected, (_state, { payload }) => {
        console.warn(
          'Something went wrong converting stringify Js to actual Js: ',
          payload
        );
      })
      .addCase(editJs.fulfilled, (state, { payload }) => {
        const { stringifiedJs, js } = payload;
        state.stringifiedJs = stringifiedJs;
        state.js = js;
      })
      .addCase(editJs.rejected, (_state, { payload }) => {
        console.warn('Invalid Js syntax:', payload);
      })
});

export const transformationReducer = transformationSlice.reducer;

export const { editData } = transformationSlice.actions;

export const selectJs = (state: RootState): string =>
  state[TRANSFORMATION_STATE_KEY].js;
export const selectData = (state: RootState): string =>
  state[TRANSFORMATION_STATE_KEY].data;
export const selectstringifiedJs = (state: RootState): string =>
  state[TRANSFORMATION_STATE_KEY].stringifiedJs;
export const selectTransformationResult = (state: RootState): string =>
  transform(
    state[TRANSFORMATION_STATE_KEY].js,
    state[TRANSFORMATION_STATE_KEY].data
  );
