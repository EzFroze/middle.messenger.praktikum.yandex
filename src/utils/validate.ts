type TOptions = {
  regexp?: {
    pattern: RegExp;
    errorMessage?: string;
  };
  maxLength?: number;
  minLength?: number;
};

type TResult = {
  value: string;
  error?: string;
};

export type TForm = {
  [key: string]: {
    value: string;
    error?: string;
    validate: TOptions;
  };
};

export function validate(value: string, validateOptions: TOptions): TResult {
  const { regexp, maxLength, minLength } = validateOptions;

  let error;

  if (regexp) {
    const rTest = regexp.pattern.test(value);

    if (!rTest) {
      error = regexp.errorMessage || "Ошибка при вводе данных";
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
