import { Component ,OnInit} from '@angular/core';

import { PetsService } from './pets.service';

@Component({
    selector: 'fetch-pets',
    templateUrl:'./pets.component.html'
})
export class PetsComponent implements OnInit {
    public pageTitle: string = 'Pets';
    public errorMessage: string='';
    public loading: boolean;
    public error: boolean = false;
    public catsForMaleOwner: string[];
    public catsForFemaleOwner: string[];

    constructor(private petsService: PetsService) {
        this.loading = true;
    }

    ngOnInit()
    {
        this.getCatsMaleOwner();
        this.getCatsFemaleOwner();
    }

    getCatsMaleOwner()
    {
        this.petsService.getPets('male','cat')
            .subscribe(data => {
                this.catsForMaleOwner = data;
                this.loading = false;
            }, (error: any) => this.errorOccured(error));
    }

    getCatsFemaleOwner() {
        this.petsService.getPets('female','cat')
            .subscribe(data => {
                this.catsForFemaleOwner = data;
                this.loading = false;
            }, (error: any) => this.errorOccured(error));
    }


    errorOccured(error: any): void {
        this.loading = false;
        this.errorMessage = error;
        this.error = true;
    }
}