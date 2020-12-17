import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { Cliente } from 'src/app/shared/client.interface';

@Component({
  selector: 'app-rankingclientes',
  templateUrl: './rankingclientes.page.html',
  styleUrls: ['./rankingclientes.page.scss'],
})
export class RankingclientesPage implements OnInit {
  public products = Array<Cliente>();

  constructor(private dataApis: FirestoreService) { }

  ngOnInit() {
    this.getAllClients();
  }
   term: string;

  getAllClients(): void {
    this.dataApis.getAllClientes().subscribe(products => {
      this.products = products;
    })
  }
   
}
