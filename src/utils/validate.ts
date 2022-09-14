type TOptions = {
  regexp?: RegExp,
  maxLength?: number,
  minLength?: number,
};

type TResult = {
  value: string,
  error?: string
};

export type TForm = {
  [key: string]: {
    value: string,
    error?: string
    validate: TOptions
  }
};

export function validate(value: string, validateOptions: TOptions): TResult {
  const { regexp, maxLength, minLength } = validateOptions;
  let error;

  if (regexp) {
    const rTest = regexp.test(value);

    if (!rTest) {
      error = "Ошибка";
    }
  }

  if (maxLength && value.length > maxLength) {
    error = `Максимальное количество симоволов - ${maxLength}`;
  }

  if (minLength && value.length < minLength) {
    error = `Минимальное количество символов - ${minLength}`;
  }

  return { value, error };
}
