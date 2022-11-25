import Handlebars from "handlebars";
import { deepClone } from "./deep-clone";

// много ts игнора, но это типизоровать нет времени :(

export const registerHelpers = () => {
  Handlebars.registerHelper("ifEquals", function ifEquals(arg1, arg2, options) {
    // eslint-disable-next-line eqeqeq
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
  });

  Handlebars.registerHelper("convertTime", function convertTime(path: string = "", context) {
    const self = deepClone(this);
    const splitedPath = path.split(".");

    const convert = (time: string) => {
      const date = new Date(time);
      return date.toLocaleTimeString();
    };

    if (splitedPath.length === 1) {
      self[path] = convert(self[path]);
    }

    const lastPath = splitedPath[splitedPath.length - 1];
    const result = splitedPath.slice(0, splitedPath.length - 1)
      .reduce((acc, key) => {
        if (self[key]) {
          // eslint-disable-next-line no-param-reassign
          acc = self[key];
        }

        // @ts-ignore
        if (acc[key]) {
          // @ts-ignore
          acc[key] = acc;
        }
        return acc;
      }, {});

    // @ts-ignore
    result[lastPath] = convert(result[lastPath]);

    return context.fn({ ...self });
  });
};
