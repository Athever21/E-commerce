declare module 'babel-plugin-require-context-hook/register' {
  export interface aa {
    name: string,
		visitor: {
			CallExpression: Function
		}
  }
}