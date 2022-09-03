"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Element = void 0;
function ServerJSX(element, attributes, ...children) {
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
exports.default = ServerJSX;
ServerJSX.Fragment = function ({ children }) {
    const instance = new Element(null);
    instance.contains(children);
    return instance;
};
class Element {
    tag;
    children;
    attributes;
    static voidElements = [
        "area",
        "base",
        "br",
        "col",
        "command",
        "embed",
        "hr",
        "img",
        "input",
        "keygen",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr",
        "!doctype"
    ];
    constructor(tag) {
        this.tag = tag;
        this.children = [];
        this.attributes = new Map();
    }
    resolveChild(child) {
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
    setAttributes(attributes) {
        Object.keys(attributes).forEach((key) => {
            const value = attributes[key];
            if (value) {
                this.attributes.set(key, value);
            }
        });
        return this;
    }
    contains(children) {
        this.children = children;
        return this;
    }
    render() {
        if (!this.tag) {
            return this.children.map((child) => this.resolveChild(child)).join("");
        }
        if (Element.voidElements.includes(this.tag)) {
            return `<${this.tag}${this.renderAttributes()}>`;
        }
        return `<${this.tag}${this.renderAttributes()}>${this.children
            .map((child) => this.resolveChild(child))
            .join("")}</${this.tag}>`;
    }
}
exports.Element = Element;
//# sourceMappingURL=index.js.map