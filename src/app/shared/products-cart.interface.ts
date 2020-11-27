import { Product } from './product.interface';

export interface ProductsCart{
    nombre?: string;
    telefono?: number;
    nit?:number;
    direccion?: string;
// productos : Array<Product>;
    total?: number;
}