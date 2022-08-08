declare module "*.module.pcss" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.hbs" {
  const content: (props?: Record<string, unknown>) => string;
  export default content;
}

declare module "*.png";
declare module "*.svg";
declare module "*.jpg";
