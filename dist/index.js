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
class Element {
    tag;
    children;
    attributes;
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
        return ` ${[...this.attributes].map(([key, value]) => `${key}="${value}"`).join(" ")}`;
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
        return `<${this.tag}${this.renderAttributes()}>${this.children
            .map((child) => this.resolveChild(child))
            .join("")}</${this.tag}>`;
    }
}
exports.Element = Element;
//# sourceMappingURL=index.js.map