import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder } from '@angular/forms';

import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  orchForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private orderService: OrderService, private router: Router) { }

  ngOnInit() {
    this.orchForm = this.formBuilder.group({
      'date': [],
      'type': [],
      'desc': [],
      'status': []
    });
  }

  onOrder() {
    const order: Order = new Order();
    order.date = this.orchForm.value.date;
    order.type = this.orchForm.value.type;
    order.desc = this.orchForm.value.desc;
    order.status = this.orchForm.value.status;
    this.orderService.createOrder(order).subscribe(
      res => {
        console.log('order was succesfull', res);
      },
      err => {
        console.error('Error inserting equipment', err);
      }
    );
  }

  onCancel() {
    this.router.navigateByUrl('/orchestrator/ide');
  }

}
