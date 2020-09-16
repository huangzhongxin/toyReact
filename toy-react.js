const ROOT = Symbol('root')

class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type)
    }

    setAttribute(name, value) {
        this.root.setAttribute(name, value)
    }

    appendChild(child) {
        this.root.appendChild(child.root)
    }
}

class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content)
    }
}

export class Component {
    constructor() {
        this.props = Object.create(null)
        this.children = []
        this[ROOT] = null
    }

    setAttribute(name, value) {
        this.props[name] = value
    }

    appendChild(child) {
        this.children.push(child)
    }

    get root() {
        if (!this[ROOT]) {
            this[ROOT] = this.render().root
        }
        return this[ROOT]
    }
}

export const createElement = (type, attributes, ...children) => {
    let e
    if (typeof type === 'string') {
        e = new ElementWrapper(type)
    } else {
        e = new type
    }
    for (const p in attributes) {
        e.setAttribute(p, attributes[p])
    }
    const insertChildren = children => {
        for (let child of children) {
            if (typeof child === 'string') {
                child = new TextWrapper(child)
            }
            if (typeof child === 'object' && child instanceof Array) {
                insertChildren(child)
            } else {
                e.appendChild(child)
            }
        }
    }
    insertChildren(children)
    return e
}

export const render = (component, parentComponent) => {
    parentComponent.appendChild(component.root)
}