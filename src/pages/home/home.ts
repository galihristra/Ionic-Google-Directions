import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { AutoCompletePage } from './autocomplete/autocomplete.module';

declare var google;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
    address;
    
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    start = 'chicago, il';
    end = 'chicago, il';
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;

    constructor(
        private navCtrl: NavController,
        private modalCtrl: ModalController){
        this.address = {
            place: ''
        };
    }

    showAddressModalFrom(){
        let modal = this.modalCtrl.create(AutoCompletePage);
        let me = this;
        modal.onDidDismiss(data => {
            this.start = data;
        });
        modal.present();
    }

    showAddressModalTo(){
        let modal = this.modalCtrl.create(AutoCompletePage);
        let me = this;
        modal.onDidDismiss(data => {
            this.end = data;
        });
        modal.present();
    }

    ionViewDidLoad(){
        this.initMap();
    }

    initMap(){
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
            zoom: 7,
            center: {lat: 41.85, lng: -87.65}
        });
        
        this.directionsDisplay.setMap(this.map);
    }

    calculateAndDisplayRoute(){
        this.directionsService.route({
            origin: this.start,
            destination: this.end,
            travelMode: 'DRIVING'
        }, (response, status) => {
            if (status == 'OK'){
                this.directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }
}
