import { cloneDeep } from 'lodash';

interface IStack {
  push: (value: unknown) => void;
  pop: () => void;
  getElements: () => unknown;
}

export default class Stack implements IStack {
  private maxSize: number;
  private container: unknown[];

  constructor(maxSize = 10) {
    this.maxSize = maxSize;
    this.container = [];
  }

  push(element: unknown) {
    if (this.isFull()) {
      console.log('Stack overflow');
      return;
    }
    this.container.push(element);
  }

  pop() {
    if (this.isEmpty()) {
      console.log('Stack underflow');
      return;
    }
    this.container.pop();
  }

  getElements() {
    return cloneDeep(this.container);
  }

  isFull() {
    return this.container.length === this.maxSize;
  }

  isEmpty() {
    return this.container.length === 0;
  }
}

/**
 * Difference between shallow clone and deep clone
 * shallow clone for array of primitives
 * deep clone for array of non-primitives
 */

const a = [1, 2, 3, 4];
const c = [{ a: 1 }, {b: 1}, [1, 2, 3, ['abs']], true];

// shallow clone
const b = [...a];

// deep clone
const d = cloneDeep(c);

// hacky and "cheap" deep clone (only works for simple values)
const e = JSON.parse(JSON.stringify(c));
