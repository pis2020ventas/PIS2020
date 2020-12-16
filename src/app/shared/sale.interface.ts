import { ILatLng } from './latlng.interface';
import { Product } from './product.interface';

export interface Sale {
   uid?:string,
   position : ILatLng,
   nombre: string,
   usuario: string,
   direccion : string,
   telefono : number,
   productos : Product[],
   nit : string,
   total : number,
   sucursal : string
}