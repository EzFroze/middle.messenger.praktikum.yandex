type TLength = {
  length: number,
  errorMessage?: string;
};

type TRegexp = {
  pattern: RegExp;
  errorMessage?: string;
};

type TOptions = {
  regexp?: TRegexp;
  maxLength?: TLength;
  minLength?: TLength;
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
  const {
    regexp,
    maxLength,
    minLength
  } = validateOptions;

  let error;

  if (regexp) {
    const rTest = regexp.pattern.test(value);

    if (!rTest) {
      error = regexp.errorMessage || "Ошибка при вводе данных";
    }
  }

  if (minLength && (value.length < minLength.length)) {
    error = minLength.errorMessage || `Минимальное количество симоволов - ${minLength.length}`;
  }

  if (maxLength && (value.length > maxLength.length)) {
    error = maxLength.errorMessage || `Максимальное количество симоволов - ${maxLength.length}`;
  }

  return {
    value,
    error
  };
}
