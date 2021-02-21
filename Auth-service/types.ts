interface CustomError extends Error {
  code: number;

  getCode: Function,
  getMessage: Function
}