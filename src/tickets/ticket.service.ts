import { query } from '../../db/database';

export const saveTicket = async (ticket: Ticket) => {
  const { order, vat, total } = ticket;
  console.log('ticket', ticket)
  const result = await query(
    'INSERT INTO tickets (order_id, vat, total) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
    [order, vat, total]
  );
  return result;
};

export const saveProduct = async (product: Product) => {
  const { product_name, product_id, price } = product;
  const result = await query(
    'INSERT INTO products (product_name, product_id, price) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
    [product_name, product_id, price]
  );
  return result;
};

export const parseTicketPayload = async (req: any) => {
  try {
    const lines = req.body.trim().split('\n');
    const ticket: Partial<Ticket> = {};
    const products: Product[] = [];

    lines.forEach((line) => {
      if (line !== '') {

        if (line.includes('Order')) {
          ticket.order = line.split(': ')[1];
        }
        else if (line.includes('VAT')) {
          ticket.vat = parseFloat(line.split(': ')[1]);
        }
        else if (line.includes('Total')) {
          ticket.total = parseFloat(line.split(': ')[1]);
        }
        else {
          if (!(line.includes('product,product_id,price'))) {
            const [product_name, product_id, price] = line.split(',');
            products.push({ product_name, product_id, price: parseFloat(price) });
          }

        }
      }

    });

    ticket.products = products;
    products.forEach(async (product) => await saveProduct(product));
    await saveTicket(ticket as Ticket);

  }
  catch (error) {
    console.error(error);
    throw error;
  }
};



