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
  private name = "items";

  constructor() {
    this.collection = AppStorage.get(name) || [];
    this._size = AppStorage.get('size') || 0;
  }

  add(item: Item) {
    var len = this.collection.length
    for (var i=0; i<len; ++i) {
      var current = this.collection[i];
      if (current.name == item.name && current.expirationDate == item.expirationDate) {
        current.quantity += item.quantity;
        return;
      }
    }

    this.append(item)
  }

  private append(item: Item) {
    this._size += item.quantity;
    this.collection.push(item);
    AppStorage.save(name, this.collection);
    AppStorage.save("size", this._size);
  }

  removeById(id: string) {
    for (var i = 0; i < this._size; i++) {
      if (this.collection[i]["id"] == id) {
        if (this.collection[i]["quantity"] == 1) this.collection.splice(i, 1);
        else this.collection[i]["quantity"] = this.collection[i]["quantity"] - 1;

        this._size--;
        return;
      }
    }
    AppStorage.save(name, this.collection);
    AppStorage.save("size", this._size);
  }

  remove(item: Item) {
    for (var i = 0; i < this._size; i++) {
      if (this.collection[i]["id"] == item["id"]) {
        if (this.collection[i]["quantity"] == 1) this.collection.splice(i, 1);
        else this.collection[i]["quantity"] = this.collection[i]["quantity"] - 1;

        this._size--;
        return;
      }
    }
    AppStorage.save(name, this.collection);
    AppStorage.save("size", this._size);
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
      if (this.collection[i].id == id) {
        return this.collection[i];
      }
    }

    return null;
  }

  sort(): ItemsCollection {
    var weGood: bool;
    var tmp: Item;

    while (!weGood) {
      weGood = true;
      for (var i = 0; i < this.collection.length - 1; i++) {
        if (this.collection[i].expirationDate.getTime() >
            this.collection[i+1].expirationDate.getTime()) {
          weGood = false;
          tmp = this.collection[i];
          this.collection[i] = this.collection[i+1];
          this.collection[i+1] = tmp;
        }
      };
    }

    return this;
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
