import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(arreglo: any [], texto: string): any [] {
    if (!arreglo){
      return [];
    }
    if (!texto){
      return arreglo;
    }
    return arreglo.filter(item => {
      return (item.nombre.toLowerCase().includes(texto.toLowerCase()) || item.nit.includes(texto.toLowerCase())
      );
    });
  }

}
