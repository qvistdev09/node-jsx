import Element from "./Element";

export default (
  tag: string,
  attributes: Record<string, string> | null,
  ...children: Array<Element | string | null>
) => {
  const created = new Element(tag);
  if (attributes) {
    created.set(attributes);
  }
  created.with(children);
  return created;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [key: string]: any;
    }
    interface Element {
      render: () => string;
    }
  }
}
