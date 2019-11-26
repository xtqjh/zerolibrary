import { TemplateRef, Type } from '@angular/core';

/**
 * 检查是否为空
 * @param value 值
 */
export function isNotNil(value: any): boolean {
  return (typeof (value) !== 'undefined') && value !== null;
}

/**
 * 检查是否数值
 * @param value 值
 */
export function isInteger(value: string | number): boolean {
  return typeof value === 'number' &&
    isFinite(value) &&
    Math.floor(value) === value;
}

/**
 * 检查是否为空
 * @param element HTMLElement
 */
export function isEmpty(element: HTMLElement): boolean {
  const nodes = element.childNodes;
  for (let i = 0; i < nodes.length; i++) {
    if (filterNotEmptyNode(nodes.item(i))) {
      return false;
    }
  }
  return true;
}

export function filterNotEmptyNode(node: Node): Node {
  if (node) {
    if ((node.nodeType === 1) && ((node as HTMLElement).outerHTML.toString().trim().length !== 0)) {
      // ELEMENT_NODE
      return node;
    } else if ((node.nodeType === 3) && (node.textContent.toString().trim().length !== 0)) {
      // TEXT_NODE
      return node;
    }
    return null;
  }
  return null;
}


export function isNonEmptyString(value: any): boolean {
  return typeof value === 'string' && value !== '';
}

export function isTemplateRef(value: any): boolean {
  return value instanceof TemplateRef;
}

export function isComponent(value: any): boolean {
  return value instanceof Type;
}

