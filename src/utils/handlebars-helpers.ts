import Handlebars from "handlebars";

export const registerHelpers = () => {
  Handlebars.registerHelper("ifEquals", function ifEquals(arg1, arg2, options) {
    // eslint-disable-next-line eqeqeq
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
  });

  Handlebars.registerHelper("convertTime", function convertTime(context) {
    let time = this.last_message?.time;

    if (time) {
      const date = new Date(time);
      time = date.toLocaleTimeString();
    }

    return context.fn({
      ...this,
      last_message: {
        ...this.last_message,
        time
      }
    });
  });
};
