class Item {
  id: string;
  name: string;
  expirationDate: Date;
  quantity: number;

  constructor(name: string, expirationDate: Date, quantity?: number) {
    this.id = String((new Date()).getTime() + Math.floor(Math.random() * 10000));
    this.name = name;
    this.expirationDate = expirationDate;

    if (quantity == null) this.quantity = 1;
    else if (quantity < 1) throw "Quantity must be greater than 1.";
    else this.quantity = quantity;
  }
}

class ItemsCollection {
  private collection: Item[];
  private _size: number = 0;

  constructor() {
    this.collection = [];
  }

  add(item: Item) {
    this._size++;
    this.collection.push(item);
  }

  removeById(id: string) {
    for (var i = 0; i < this._size; i++) {
      if (this.collection[i]["id"] == id) {
        this.collection.splice(i, 1);
        this._size--;

    console.log(this.collection[0])
    console.log(this.collection[1])
        return;
      }
    }
  }

  remove(item: Item) {
    for (var i = 0; i < this._size; i++) {
      if (this.collection[i]["id"] == item["id"]) {
        this.collection.splice(i, 1);
        this._size--;
        return;
      }
    }
  }

  size(): number {
    return this._size;
  }

  getNth(n: number): Item {
    if (n >= this.size()) throw "Array out of bounds.";
    return this.collection[n];
  }

  get(id: string): Item {
    for (var i = 0; i < this._size; i++) {
      if (this.collection[i]["id"] == id) {
        return this.collection[i];
      }
    }

    throw "Item not found";
  }
}

class ItemsCache {
  items: { [name :string]: number; };

  constructor() {
    this.items = {};
  }

  addItem(name: string, quantity?: number): { [name :string]: number; } {
    return null;
  }

  getMostPopularItems(numberOfItems?: number): { [name :string]: number; }[] {
    return null;
  }

  clear(): void {
    this.items = {};
  }
}
