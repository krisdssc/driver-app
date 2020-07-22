import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-ordermodal',
    templateUrl: './ordermodal.page.html',
    styleUrls: ['./ordermodal.page.scss'],
})
export class OrdermodalPage implements OnInit {

    constructor(private modalController: ModalController) {
    }

    @Input() public customer: {};
    @Input() public order = {
        id: '111-222',
        customerName: 'Juan Dela Cruz',
        orderNum: '111',
        orderDate: '11:45 - Jan 01, 2020',
        orderStatus: 'Received',
        mainCourse: 'Steak',
        desert: 'Pudding'
    };

    ngOnInit() {
    }

    async closeModal() {
        this.customer = this.order;
        await this.modalController.dismiss(this.customer);
    }
}
