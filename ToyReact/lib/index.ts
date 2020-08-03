
interface KVObject {
  [key: string]: any;
}

interface PropsType {
  [key: string]: any;
}

type VNodeType = any;
interface VNode {
  type: VNodeType;
  props: PropsType;
  children?: VNode[];
}


interface ComponentRender {
  render?: () => any;
}
export class Component implements ComponentRender {

}

function createElement(
  type: VNodeType,
  props?: PropsType,
  ...children: (VNode | string)[]
) {
  return {
    type,
    props,
    children
  };;
}


function render(vnode: VNode, container: HTMLElement) {
  container.innerHTML = '';
  _render(vnode, container);
}

function _render(vnode: VNode, container: HTMLElement) {
  if (typeof vnode === 'string') {
    const textNode = document.createTextNode(vnode);
    return container.appendChild(textNode);
  }

  let element: HTMLElement;
  if (typeof vnode.type === 'function') {
    let cnode: ComponentRender = new vnode.type();
    _render(cnode.render(), container);
    return;
  } else {
    element = document.createElement(vnode.type);
  }

  for (const name in vnode.props) {
    setAttribute(element, name, vnode.props[name])
  }

  vnode.children.forEach(child => _render(child, element))


  return container.appendChild(element);
}

function setAttribute(dom: HTMLElement, name: string, value: any) {
  if (name === 'className') name = 'class';
  if (name.match(/^on([\s\S]+)$/)) {
    // 处理事件 handle event
    let eventName = RegExp.$1.replace(/^[\s\S]/, (s) => s.toLowerCase());
    dom.addEventListener(eventName, value);
  } else if (name === 'style') {
    // 处理样式 handle stylesheet
    if (!value || typeof value === 'string') {
      dom.style.cssText = value || '';
    } else if (value && typeof value === 'object') {
      for (let name in value) {
        (<KVObject>dom.style)[name] = value[name];
      }
    }
  } else {
    if (value) {
      dom.setAttribute(name, value);
    } else {
      dom.removeAttribute(name);
    }
  }
}

export const ToyReact = {
  createElement,
  render
};
