import { Product } from './product.interface';

//import { Product } from '../shared/product.interface';

export interface Cart{
    productos : Array<Product>;
    total : DoubleRange;
}