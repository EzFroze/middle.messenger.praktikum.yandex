function queryStringify(data = {}): string {
  const result = Object.entries(data)
    .reduce((acc, [key, value]) => {
      // eslint-disable-next-line no-param-reassign
      acc += `${key}=${String(value)}&`;
      return acc;
    }, "?");

  return result.slice(0, -1);
}

enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE"
}

type Options = {
  method: METHOD,
  data?: any
};

type OptionsWithoutMethod = Omit<Options, "method">;

// Я подумал почему у Axios есть название Axios а у моей обертки ее нет
// Если кратко запрос (русский) -> anfrage (немецкий)
// Привет ревьюеру и счастья и здоровья и любви
// PS Пишу это в 2 часа ночи
class AnfrageBase {
  get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    const query = queryStringify(options.data);
    return this._request(url + query, {
      ...options,
      method: METHOD.GET
    });
  }

  post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this._request(url, {
      ...options,
      method: METHOD.POST
    });
  }

  put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this._request(url, {
      ...options,
      method: METHOD.PUT
    });
  }

  delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this._request(url, {
      ...options,
      method: METHOD.DELETE
    });
  }

  patch(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this._request(url, {
      ...options,
      method: METHOD.PATCH
    });
  }

  private _request(
    url: string,
    options: Options = { method: METHOD.GET }
  ): Promise<XMLHttpRequest> {
    const {
      data,
      method
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === "GET" || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

export class Anfrage extends AnfrageBase {
  private readonly baseUrl: string;

  constructor(baseUrl: string = "/") {
    super();
    this.baseUrl = `https://ya-praktikum.tech${baseUrl}`;
  }

  get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return super.get(this.baseUrl + url, options);
  }

  post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return super.post(this.baseUrl + url, options);
  }

  put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return super.put(this.baseUrl + url, options);
  }

  delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return super.delete(this.baseUrl + url, options);
  }

  patch(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return super.patch(this.baseUrl + url, options);
  }
}