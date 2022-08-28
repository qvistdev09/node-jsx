export default class Element {
  private tag: string;
  private children: Element[];

  constructor(tag: string, children?: Element[]) {
    this.tag = tag;
    this.children = children ?? [];
  }

  public render(): string {
    return `<${this.tag}>${this.children.map((child) => child.render())}</${this.tag}>`;
  }
}
