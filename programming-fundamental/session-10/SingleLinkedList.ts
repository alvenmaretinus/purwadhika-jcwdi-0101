export {};

class Node {
  element: unknown;
  next: Node | null;

  constructor(element: unknown, next: Node | null = null) {
    this.element = element;
    this.next = next;
  }
}

export default class SingleLinkedList {
  head: Node | null;
  size: number;

  constructor() {
    this.head = null;
    this.size = 0;
  }

  add(element: unknown) {
    const newNode = new Node(element);
    let curr: Node;

    if (this.head === null) {
      this.head = newNode;
    } else {
      curr = this.head;

      while (curr.next !== null) {
        curr = curr.next;
      }

      curr.next = newNode;
    }

    this.size = this.size + 1;
  }

  printList() {
    let curr: Node | null = this.head;

    while (curr !== null) {
      console.log(curr?.element);
      curr = curr?.next ?? null;
    }
  }

  insertAt(element: unknown, index: number) {
    if (index < 0 || index > this.size) {
      console.log('Please enter a valid index');
      return;
    }

    const node = new Node(element);
    let curr = this.head;

    if (index === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      curr = this.head;
      let prev;

      for (let i = 0; i < index; i++) {
        prev = curr;
        curr = curr?.next ?? null;
      }

      if (prev) {
        prev.next = node;
        node.next = curr;
      }

      this.size += 1;
    }
  }

  removeAt(index: number) {
    if (index < 0 || index > this.size - 1) {
      console.log('Please enter a valid index');
      return;
    }

    let curr = this.head;
    let prev = curr;

    if (index === 0) {
      this.head = curr?.next ?? null;
    } else {
      for (let i = 0; i < index; i++) {
        prev = curr;
        curr = curr?.next ?? null;
      }

      if (prev !== null) {
        prev.next = curr?.next ?? null;
      }
    }

    this.size -= 1;

    return curr?.element;
  }

  removeElement(element: unknown) {
    let curr = this.head;
    let prev: any = null;

    while (curr !== null) {
      if (element === curr.element) {
        if (prev === null) {
          this.head = curr.next;
        } else {
          if (prev) {
            prev.next = curr.next;
          }
        }

        this.size -= 1;

        return curr.element;
      }

      prev = curr;
      curr = curr.next;
    }
  }

  indexOf(element: unknown) {
    let count = 0;
    let curr = this.head;

    while (curr !== null) {
      if (curr.element === element) {
        return count;
      }

      count++;
      curr = curr.next;
    }

    return -1;
  }
}
