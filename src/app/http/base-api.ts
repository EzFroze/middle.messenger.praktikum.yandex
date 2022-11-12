import { Anfrage } from "./anfrage";

export abstract class BaseAPI {
  protected http: Anfrage;

  protected constructor(baseUrl: string) {
    this.http = new Anfrage(baseUrl);
  }

  abstract create?(..._args: unknown[]): Promise<XMLHttpRequest>;

  abstract request?(..._args: unknown[]): Promise<XMLHttpRequest>;

  abstract update?(..._args: unknown[]): Promise<XMLHttpRequest>;

  abstract delete?(..._args: unknown[]): Promise<XMLHttpRequest>;
}
