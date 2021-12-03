import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    name: 'Book',
    price: 3,
    description: 'Great for reading!'
  },
  {
    id: 'p2',
    name: 'Chocolate',
    price: 2,
    description: 'Great for eating!'
  }
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map(p => (
          <ProductItem
            key={p.id}
            id={p.id}
            name={p.name}
            price={p.price}
            description={p.description}
          />)
        )}
      </ul>
    </section>
  );
};

export default Products;
