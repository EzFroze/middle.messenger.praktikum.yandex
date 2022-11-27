export enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE"
}

export type Options = {
  method: METHOD,
  data?: any,
  headers?: { key: string, value: string }[]
};

export type OptionsWithoutMethod = Omit<Options, "method">;
