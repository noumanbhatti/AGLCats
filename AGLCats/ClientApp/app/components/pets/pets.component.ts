import { Component ,OnInit} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

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
    public petsForMaleOwner: string[];
    public petsForFemaleOwner: string[];
    public petTypes: string[];
    public petForm: FormGroup;

    constructor(private petsService: PetsService, private fb: FormBuilder) {
        this.petTypes = ["Cat", "Dog", "Fish"];
    }

    ngOnInit()
    {
        this.petForm = this.fb.group({
            petType: 'Cat',
        })

        this.getData();
    }

    getCatsMaleOwner(type:string)
    {
        this.petsService.getPets('male',type)
            .subscribe(data => {
                this.petsForMaleOwner = data;
                this.loading = false;
            }, (error: any) => this.errorOccured(error));
    }

    getCatsFemaleOwner(type:string) {
        this.petsService.getPets('female',type)
            .subscribe(data => {
                this.petsForFemaleOwner = data;
                this.loading = false;
            }, (error: any) => this.errorOccured(error));
    }

    getData()
    {
        this.loading = true;
        this.getCatsMaleOwner(this.petForm.controls['petType'].value);
        this.getCatsFemaleOwner(this.petForm.controls['petType'].value);
    }


    errorOccured(error: any): void {
        this.loading = false;
        this.errorMessage = error;
        this.error = true;
    }
}