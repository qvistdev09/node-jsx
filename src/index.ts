type Child = Element | string | null | undefined | number | Array<Child>;

export default function ServerJSX(
  element: string | ((props: any) => Element),
  attributes: Record<string, string> | null,
  ...children: Array<Child>
) {
  if (typeof element === "function") {
    return children.length > 0 ? element({ ...attributes, children }) : element(attributes);
  }
  const instance = new Element(element);
  if (attributes) {
    instance.setAttributes(attributes);
  }
  instance.contains(children);
  return instance;
}

export class Element {
  tag: string;
  children: Array<Child>;
  attributes: Map<string, string>;

  constructor(tag: string) {
    this.tag = tag;
    this.children = [];
    this.attributes = new Map();
  }

  resolveChild(child: Child): string {
    if (!Array.isArray(child)) {
      if (!child) {
        return "";
      }
      if (typeof child === "string") {
        return child;
      }
      if (typeof child === "number") {
        return child.toString();
      }
      return child.render();
    }
    return child.map((subChild) => this.resolveChild(subChild)).join("");
  }

  renderAttributes() {
    if (this.attributes.size === 0) {
      return "";
    }
    return ` ${[...this.attributes]
      .map(([key, value]) => {
        if (typeof value === "boolean" && value) {
          return key;
        }
        if (typeof value === "boolean" && !value) {
          return "";
        }
        return `${key}="${value}"`;
      })
      .join(" ")}`;
  }

  setAttributes(attributes: Record<string, string>) {
    Object.keys(attributes).forEach((key) => {
      const value = attributes[key];
      if (value) {
        this.attributes.set(key, value);
      }
    });
    return this;
  }

  contains(children: Array<Child>) {
    this.children = children;
    return this;
  }

  render(): string {
    return `<${this.tag}${this.renderAttributes()}>${this.children
      .map((child) => this.resolveChild(child))
      .join("")}</${this.tag}>`;
  }
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
      tag: string;
      children: Array<Child>;
      attributes: Map<string, string>;
      resolveChild: (child: Child) => string;
      renderAttributes: () => string;
      setAttributes: (attributes: Record<string, string>) => Element;
      contains: (children: Array<Child>) => Element;
      render: () => string;
    }
  }
}

export type PropsWithChildren<p = unknown> = p & { children: Child };
