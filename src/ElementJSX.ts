import Element from "./Element";

type JSXComponent = (props: any) => Element;

export default function createElement(
  element: string | JSXComponent,
  attributes: Record<string, string> | null,
  ...children: Array<Element | string | null>
) {
  if (typeof element === "function") {
    const output = element({ ...attributes, children });
    return output;
  }
  const created = new Element(element);
  if (attributes) {
    created.set(attributes);
  }
  created.with(children);
  return created;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [key: string]: any;
    }

    interface ElementChildrenAttribute {
      children: {};
    }

    type ElementAttributesProperty<p> = (props: p) => Element;

    interface Element {
      render: () => string;
    }
  }
}
