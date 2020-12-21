import { Component, OnInit } from '@angular/core';
import { SaleslistService } from 'src/app/services/saleslist/saleslist.service';
import { Sale } from 'src/app/shared/sale.interface';

@Component({
  selector: 'app-saleslist',
  templateUrl: './saleslist.page.html',
  styleUrls: ['./saleslist.page.scss'],
})
export class SaleslistPage implements OnInit {
  public sales = Array<Sale>();

  constructor(public saleslistService: SaleslistService) { }

  ngOnInit() {
    this.getAllSales();
  }

  getAllSales(): void {
    this.saleslistService.getAllSales().subscribe(sales => {
      this.sales = sales;
    })
  }
}
