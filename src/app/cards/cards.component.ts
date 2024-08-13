import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent implements OnInit {
  cardItem: any;
  constructor(private dataService: ItemService) {}
  ngOnInit(): void {
    this.dataService.getCart().subscribe((result: any) => {
      this.cardItem = result;
      console.log(this.cardItem);
    });
  }

  removeItem(item: any) {
    const id = item.item_id;

    this.dataService.removeCartItem(id).subscribe((result: any) => {
      alert('Item removed');
      console.log('result', result);
      // alert('Item successfully removed');
    });
  }
}
