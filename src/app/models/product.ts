export class Product {
  constructor(
    public id: number,
    public name: string,
    public categoryName: string,
    public description: string,
    public price: number,
    public quantityLeft: number,
    public rating: number,
    public imageUrl: string,
  ) {}
  isInStock(): boolean {
    return this.quantityLeft > 0;
  }
  reduceStock(amount: number): void {
    if (amount <= 0) {
      return;
    }

    if (amount > this.quantityLeft) {
      return;
    }

    this.quantityLeft -= amount;
  }
}
