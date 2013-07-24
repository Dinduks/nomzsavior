class Item {
  id: string;
  name: string;
  expirationDate: Date;
  quantity: number;

  constructor(name: string, expirationDate: Date, quantity?: number) {
    this.id = String((new Date()).getTime());
    this.name = name;
    this.expirationDate = expirationDate;

    if (quantity == null) this.quantity = 1;
    else if (quantity < 1) throw "Quantity must be greater than 1.";
    else this.quantity = quantity;
  }
}

class ItemsCollection {
  collection: Item[];

  constructor() {
    this.collection = [];
  }

  add(item: Item) {
    this.collection.push(item);
  }

  remove(id: string) {
  }
}
