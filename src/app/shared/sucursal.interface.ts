import {ILatLng} from './latlng.interface';
export interface Sucursal{
    address : string;
    name: string;
    position: ILatLng;
    telephone:string;
    id?: string;

}