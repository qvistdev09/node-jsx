type Child = Element | string | null | undefined | number | Array<Child>;

export class Element {
  private tag: string;
  private children: Array<Child>;
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
      if (typeof child === "number") {
        return child.toString();
      }
      return child.render();
    }
    return child.map((subChild) => this.resolveChild(subChild)).join("");
  }

  private renderAttributes() {
    if (this.attributes.size === 0) {
      return "";
    }
    return ` ${[...this.attributes].map(([key, value]) => `${key}="${value}"`).join(" ")}`;
  }

  public setAttributes(attributes: Record<string, string>) {
    Object.keys(attributes).forEach((key) => {
      const value = attributes[key];
      if (value) {
        this.attributes.set(key, value);
      }
    });
    return this;
  }

  public contains(children: Array<Element | string | null>) {
    this.children = children;
    return this;
  }

  public render(): string {
    return `<${this.tag}${this.renderAttributes()}>${this.children
      .map((child) => this.resolveChild(child))
      .join("")}</${this.tag}>`;
  }
}
