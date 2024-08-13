import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ItemService } from '../services/item.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  data: any = [];

  constructor(private dataServie: ItemService) {}

  ngOnInit() {
    this.dataServie.getData().subscribe((result: any) => {
      this.data = result;
    });
  }

  addItem(item: any) {
    let payload = {
      item_id: item.id,
      quantity: 1,
    };
    this.dataServie.addItem(payload).subscribe((result: any) => {
      alert('Item successully added in Cart');
    });
  }
}
