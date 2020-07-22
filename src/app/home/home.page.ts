import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {SecondPage} from '../modals/second/second.page';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';
import {HttpClient} from '@angular/common/http';

import {Socket} from 'ngx-socket-io';
import {OrdermodalPage} from '../modals/ordermodal/ordermodal.page';
import {RestService} from '../rest.service';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';

import * as leaflet from 'leaflet';
import 'leaflet-routing-machine';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
    // SOCKET START
    message = {};
    messages = [];
    currentUser = {};
    // SOCKET END

    public customer = null;
    user: User;

    @ViewChild('map') mapContainer: ElementRef;
    map: any;

    constructor(
        private modalController: ModalController,
        public afAuth: AngularFireAuth,
        public http: HttpClient,
        private socket: Socket,
        public restProvider: RestService
    ) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.user = user;
                localStorage.setItem('user', JSON.stringify(this.user));
            } else {
                localStorage.setItem('user', null);
            }
        });
    }

    // SOCKET START

    ionViewDidEnter() {
        this.loadmap();
    }

    loadmap() {
        this.map = leaflet.map('map').fitWorld();
        leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        this.map.locate({
            setView: true,
            maxZoom: 10
        }).on('locationfound', (e) => {
            leaflet.Routing.control({
                waypoints: [
                    leaflet.latLng(10.6701969, 122.98780928782193),
                    leaflet.latLng(10.671386649999999, 122.94401481175522)
                ]
            }).addTo(this.map);
        }).on('locationerror', (err) => {
            alert(err.message);
        });
    }

    ngOnInit() {

        this.socket.connect();
        const name = JSON.parse(localStorage.getItem('user')).email;
        this.currentUser = name;
        this.socket.emit('set-name', name);
        this.socket.fromEvent('message').subscribe(message => {
            console.log('Sent Data:', message);
            localStorage.setItem('message', JSON.stringify(message));
            this.messages.push();
            this.openOrderModal();
            this.restProvider.saveUser(JSON.parse(localStorage.getItem('message'))).then((result) => {
                console.log(result);
                console.log('POST REQUEST', this.message);
            }, (err) => {
                console.log(err);
            });
        });
    }

    async sendMessage() {
        this.message = JSON.parse(localStorage.getItem('customer'));
        this.socket.emit('send-message', {text: this.message});
    }

    async openOrderModal() {
        const modal = await this.modalController.create({
            component: OrdermodalPage,
            componentProps: {
                customer: this.customer
            }
        });
        modal.onWillDismiss().then(dataReturned => {
            // trigger when about to close the modal
            this.customer = dataReturned.data;
            localStorage.setItem('customer', JSON.stringify(this.customer));
            console.log('Receive ORDER: ', this.customer);
        });
        return await modal.present().then(_ => {
        });
    }

    ionViewWillLeave() {
        this.socket.disconnect();
    }

    // SOCKET END

    isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return user !== null;
    }

    signOut() {
        this.afAuth.signOut().then(() => {
            location.reload();
        });
    }

    async openModal() {
        const modal = await this.modalController.create({
            component: SecondPage
        });
        return await modal.present();
    }

    async openModalWithData() {
        const modal = await this.modalController.create({
            component: SecondPage,
            componentProps: {
                customer: this.customer
            }
        });
        modal.onWillDismiss().then(dataReturned => {
            // trigger when about to close the modal
            this.customer = dataReturned.data;
            console.log('Receive: ', this.customer);
        });
        return await modal.present().then(_ => {
            // triggered when opening the modal
            console.log('Sending: ', this.customer);
        });
    }

    // ORDER STATUS
    async changeStatusDispatched() {
        this.customer.orderStatus = 'Dispatched';
    }

    async changeStatusComplete() {
        this.customer.orderStatus = 'Completed';
        this.customer = {};
        location.reload();
    }

}
