class Product {
  readonly name: string;
  readonly price: number;

  constructor({ name, price }: { name: string; price: number }) {
    this.name = name;
    this.price = price;
  }
}

class Transaction {
  private total: number = 0;
  private productsInfo: Set<Product> = new Set();
  private productQuantity: Record<string, number> = {};

  constructor() {}

  addToCart(product: Product, quantity: number = 1) {
    if (!this.productsInfo.has(product)) {
      this.productQuantity[product.name] = quantity;
      this.productsInfo.add(product);
    } else {
      this.productQuantity[product.name] += quantity;
    }
    this.total += product.price * quantity;
    console.log(`${quantity}x ${product.name} being added to the shopping cart`);
  }

  showTotal() {
    console.log('Your current total transaction: $' + this.total);
  }

  checkOut() {
    if (this.total === 0) {
      return console.log("There's no any item on your shopping cart");
    }
    const purchasedProduct = [...this.productsInfo].map((product) => ({
      productName: product.name,
      productPrice: product.price,
      productQuantity: this.productQuantity[product.name],
    }));

    const transactionData = {
      totalTransaction: this.total,
      purchasedProduct,
    };
    console.log('Purchased completed $' + this.total);
    this.total = 0;
    this.productsInfo = new Set();
    this.productQuantity = {};
    return transactionData;
  }
}
const nintendo = new Product({ name: 'Nintendo Switch 2', price: 449.99 });
const playStation = new Product({ name: 'PlayStation 5', price: 499.99 });
const laptop = new Product({ name: 'Lenovo Legion 5', price: 849.99 });

const userTransaction = new Transaction();

userTransaction.addToCart(nintendo);
userTransaction.addToCart(nintendo, 2);
userTransaction.addToCart(playStation);

console.log('-----------------------------------------------');

userTransaction.showTotal();

console.log('-----------------------------------------------');

userTransaction.addToCart(laptop);

console.log('-----------------------------------------------');

const transactionData = userTransaction.checkOut();

console.log('-----------------------------------------------');

userTransaction.showTotal();

console.log('-----------------------------------------------');

userTransaction.checkOut();

console.log('-----------------------------------------------');

console.log('transactionData: ');
console.log(transactionData);
