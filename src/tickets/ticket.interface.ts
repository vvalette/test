interface Ticket {
    order: string;
    vat: number;
    total: number;
    products: Product[];
  }
  
  interface Product {
    product_name: string;
    product_id: string;
    price: number;
  }
  