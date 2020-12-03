import { ILatLng } from './latlng.interface';
import { Product } from './product.interface';

export interface Sale {
   position : ILatLng,
   nombre: string,
   direccion : string,
   telefono : number,
   productos : Product[],
   nit : string,
   total : number
}