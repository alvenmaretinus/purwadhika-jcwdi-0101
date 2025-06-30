import { cloneDeep } from 'lodash';

interface IQueue {
  enqueue: (value: unknown) => void;
  dequeue: () => void;
  getElements: () => unknown;
}

export default class Queue implements IQueue {
  private container: unknown[];

  constructor() {
    this.container = [];
  }

  enqueue(element: unknown) {
    this.container.push(element);
  }

  dequeue() {
    return this.container.shift();
  }

  getElements() {
    return cloneDeep(this.container);
  }
}
