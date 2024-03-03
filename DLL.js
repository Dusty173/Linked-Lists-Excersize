class Node {
    constructor(value) {
        this.value = value;  
        this.prev = null; 
        this.next = null;
    }
}

class DoublyLinkedList {
    constructor(vals = []){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(val) {
        const newNode = new Node(val)
        if(this.length === 0){
            this.head = newNode;
            this.tail = this.head;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length += 1;
    }

    unshift(val){
        let newNode = new Node(val)

        if(!this.length){
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.length += 1;
    }

    pop() {
        if (!this.length) {
          return null;
        } else {
          const removeNode = this.tail;
    
          if (this.length === 1) {
            this.head = null;
            this.tail = null;
          } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
            removeNode.prev = null;
          }
          this.length -= 1;
          return removeNode;
        }
      }

    shift(){
        if(!this.length) {
            throw new Error('List is empty, cannot shift empty list!')
        }
        const removeNode = this.head;

        if (this.length === 1){
            this.head = null;
            this.tail = null;
        } else {
            this.head = removeNode.next;
            this.head.prev = null;
            removeNode.next = null;
        }
        this.length -= 1;
        return removeNode;
    }

    getAt(idx){
        if(idx < 0 || idx >= this.length) {
            throw new Error('Invalid index.')
        }
        if(idx <= this.length / 2){
            let count = 0;
            let curNode = this.head;
            while(count !== idx){
                curNode = curNode.next;
                count += 1;
            }
            return curNode;
        } else {
            let count = this.length - 1;
            let curNode = this.tail;
            while(count !== idx){
                curNode = curNode.prev;
                count -= 1;
            }
            return curNode;
        }
    }

    setAt(idx, val){
        let nodeIdx = this.getAt(idx);
        if(!nodeIdx) {
            throw new Error('Invalid Index')
        } else {
            nodeIdx.value = val;
        }
    }   

    insertAt(idx, val){
        if(idx < 0 || idx > this.length){
            throw new Error("Invalid index.")
        }
        if(idx === 0){
            this.unshift(val);
        }
        if(idx === this.length) {
            this.push(val);
        }
        let newNode = new Node(val);
        let prevNode = this.getAt(idx - 1);
        let nextNode = prevNode.next;

        prevNode.next = newNode;
        newNode.prev = prevNode;
        newNode.next = nextNode;
        nextNode.prev = newNode;

        this.length += 1;
    }

    removeAt(idx){
        if(idx < 0 || idx > this.length){
            throw new Error("Invalid index.")
        }
        if(idx === 0){
            this.shift();
        }
        if(idx === this.length - 1){
            this.pop();
        }
        let removeNode = this.getAt(idx);
        let prevNode = removeNode.prev;
        let nextNode = removeNode.next;
        prevNode.next = nextNode;
        nextNode.prev = prevNode;

        removeNode.next = null;
        removeNode.prev = null;

        this.length -= 1;
    }

    average() {
        if (this.length === 0) return 0;
    
        let total = 0;
        let current = this.head;
    
        while (current) {
          total += current.val;
          current = current.next;
        }
        return total / this.length;
      }
}