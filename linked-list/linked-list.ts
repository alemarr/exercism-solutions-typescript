type NullableNode = Node<any> | undefined | null;

class Node<T> {
  private previousNode: NullableNode;
  private nextNode: NullableNode;

  constructor(private readonly _value: T) { }

  setNext(node: NullableNode): Node<T> {
    this.nextNode = node;

    return this;
  }

  next(): NullableNode {
    return this.nextNode;
  }

  setPrevious(node: NullableNode): Node<T> {
    this.previousNode = node;

    return this;
  }

  previous(): NullableNode {
    return this.previousNode;
  }

  value(): T {
    return this._value;
  }
}

export class LinkedList<T> {
  private _lastNode: NullableNode;

  push(element: T): void {
    const node = new Node(element);

    if (this._lastNode) {
      node.setPrevious(this._lastNode);
      this._lastNode.setNext(node);
    }

    this.setLastNode(node);
  }

  pop(): T {
    const lastNode = this._lastNode;

    this._lastNode = lastNode?.previous();
    this._lastNode?.setNext(null);

    return lastNode?.value();
  }

  setLastNode(node: NullableNode) {
    this._lastNode = node;
  }

  count() {
    let lastNode = this._lastNode;
    let count = this._lastNode ? 1 : 0;

    while (lastNode && lastNode.previous()) {
      count++;
      lastNode = lastNode.previous();
    }

    return count;
  }

  shift() {
    let firstNode = this._lastNode;

    while (firstNode && firstNode.previous()) {
      firstNode = firstNode.previous();
    }

    const newFirstNode = firstNode ? firstNode.next() : null;

    if (newFirstNode) {
      newFirstNode.setPrevious(null);
    } else {
      this.setLastNode(null);
    }

    return firstNode?.value();
  }

  unshift(element: T) {
    const node = new Node(element);

    let firstNode = this._lastNode;

    while (firstNode?.previous()) {
      firstNode = firstNode.previous();
    }

    if (firstNode) {
      firstNode.setPrevious(node);
    } else {
      this._lastNode = node;
    }

    node.setNext(firstNode);
  }

  delete(element: T) {
    let foundNode: NullableNode;

    if (this._lastNode) {
      foundNode = this._lastNode.value() === element ? this._lastNode : null;
    }

    let current = this._lastNode;
    while(!foundNode && (current?.previous())) {
      if (current.value() == element) {
        foundNode = current;
        break;
      }
      foundNode = current.previous();
    }

    if (foundNode) {
      this.removeNode(foundNode);
    }
  }

  private removeNode(node: Node<T>): void {
    if (node.value() == this._lastNode?.value()) {
      this.setLastNode(node.previous());
    }
    let next = node.next();
    let previous = node.previous();

    node.setNext(null);
    node.setPrevious(null);

    if (next) {
      next.setPrevious(previous);
    }

    if (previous) {
      previous.setNext(next);
    }
  }
}