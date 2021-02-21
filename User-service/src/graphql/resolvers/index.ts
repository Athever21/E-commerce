interface WebpackRequire extends NodeRequire {
  context: (path: string, recursive: boolean, pattern: RegExp) => any;
}

const importAll = (r: __WebpackModuleApi.RequireContext,obj: any) => {
  r.keys().forEach((file: string): void => {
    const queryName = file.replace(/\.\//, "").replace(/\.[jt]s/, "");
    const queryFunc = r(file).default;
    obj[queryName] = queryFunc;
  });
}

const re = (require as WebpackRequire);

const exportedFunctions: {
  Query: {
    [key: string]: Function;
  };
  Mutation: {
    [key: string]: Function;
  };
} = {
  Query: {},
  Mutation: {},
};

importAll(re.context('./queries', false, /\.ts$/),exportedFunctions.Query);
importAll(re.context('./mutations', false, /\.ts$/),exportedFunctions.Mutation);

export default exportedFunctions;
