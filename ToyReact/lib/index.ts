interface PropsType {
  [key: string]: any;
}

type VNodeType = any;
interface VNode {
  type: VNodeType;
  props: PropsType;
  children?: VNode[];
}

export const ToyReact = {
  createElement(
    type: VNodeType,
    props?: PropsType,
    ...children: VNode[]
  ) {
    let normalizedProps: PropsType = {},
      i;
    for (i in props) {
      if (i !== 'key' && i !== 'ref') normalizedProps[i] = props[i];
    }

    return {
      type,
      props,
      children
    };;
  },

  render(vnode: VNode, root: HTMLElement) {

    let element: HTMLElement;
    if (typeof vnode.type === 'string') {
      element = document.createElement(vnode.type)
    }
    for (const name in vnode.props) {
      element.setAttribute(name, vnode.props[name]);
    }

    for (const child of vnode.children) {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else {
        this.render(child, element);
      }
    }

    root.appendChild(element);
  },
};
