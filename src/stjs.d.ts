declare module 'stjs' {
  function select(input: unknown): {
    transformWith: (
      input: unknow,
      ...args: unknown[]
    ) => {
      root: () => unknown;
    };
  };
}
