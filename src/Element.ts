type Child = Element | string | null | undefined | Array<Child>;

export default class Element {
  private tag: string;
  public children: Array<Child>;
  private attributes: Map<string, string>;

  constructor(tag: string) {
    this.tag = tag;
    this.children = [];
    this.attributes = new Map();
  }

  private resolveChild(child: Child): string {
    if (!Array.isArray(child)) {
      if (!child) {
        return "";
      }
      if (typeof child === "string") {
        return child;
      }
      return child.render();
    }
    return child.map((subChild) => this.resolveChild(subChild)).join("");
  }

  private getAttr() {
    if (this.attributes.size === 0) {
      return "";
    }
    return ` ${[...this.attributes].map(([key, value]) => `${key}="${value}"`).join(" ")}`;
  }

  public set(attributes: Record<string, string>): Element;
  public set(attribute: string, value: string): Element;
  public set(a: any, b?: any) {
    if (typeof a === "object") {
      Object.keys(a).forEach((key) => {
        this.attributes.set(key, a[key]);
      });
    } else if (typeof a === "string" && typeof b === "string") {
      this.attributes.set(a, b);
    }
    return this;
  }

  public with(children: Array<Element | string | null>) {
    this.children = children;
    return this;
  }

  public render(): string {
    return `<${this.tag}${this.getAttr()}>${this.children
      .map((child) => this.resolveChild(child))
      .join("")}</${this.tag}>`;
  }
}
