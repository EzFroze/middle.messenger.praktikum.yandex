declare module "*.module.pcss" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.hbs" {
  const content: <T>(props?: T) => string;
  export default content;
}

declare module "*.png";
declare module "*.svg";
declare module "*.jpg";
