/* eslint-disable @typescript-eslint/no-unused-vars */
export class BaseApi {
  create(..._args: unknown[]): Promise<XMLHttpRequest> {
    throw new Error("Not implemented");
  }

  request(..._args: unknown[]): Promise<XMLHttpRequest> {
    throw new Error("Not implemented");
  }

  update(..._args: unknown[]): Promise<XMLHttpRequest> {
    throw new Error("Not implemented");
  }

  delete(..._args: unknown[]): Promise<XMLHttpRequest> {
    throw new Error("Not implemented");
  }
}
