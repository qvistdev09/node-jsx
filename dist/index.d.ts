declare type Child = Element | string | null | undefined | number | Array<Child>;
export default function ServerJSX(element: string | ((props: any) => Element), attributes: Record<string, string> | null, ...children: Array<Child>): Element;
export declare class Element {
    tag: string;
    children: Array<Child>;
    attributes: Map<string, string>;
    constructor(tag: string);
    resolveChild(child: Child): string;
    renderAttributes(): string;
    setAttributes(attributes: Record<string, string>): this;
    contains(children: Array<Child>): this;
    render(): string;
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
export declare type PropsWithChildren<p = unknown> = p & {
    children: Child;
};
export {};
