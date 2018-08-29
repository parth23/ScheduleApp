import { Component, OnInit } from '@angular/core';
import { Car } from './domain/car';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { RepositoryService } from './services/repository.service';


export class PrimeCar implements Car {
    constructor(public vin?, public year?, public brand?, public color?) { }
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

    public form: FormGroup;
    constructor(private fb: FormBuilder, private repository: RepositoryService) { }
    NumberOfEmployee: number;
    DateRange: Date[];
    Weekend: number;
    events: any;
    headerConfig: any;
    ngOnInit() {
        this.form = this.fb.group({
            NumberOfEngineers: new FormControl(null),
            StartDate: new FormControl(null),
            EndDate: new FormControl(null)
        });

        this.headerConfig = {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		};
    }

    onSchedule() {
        var date1 = new Date(Date.UTC(this.DateRange[0].getFullYear(), this.DateRange[0].getMonth(), this.DateRange[0].getDate()))
        var date2 = new Date(Date.UTC(this.DateRange[1].getFullYear(), this.DateRange[1].getMonth(), this.DateRange[1].getDate()))
        var oneDay = 24*60*60*1000;
        var diffDays = Math.round(Math.abs((date1.getTime() - date2.getTime())/(oneDay))) + 1;
        if(this.NumberOfEmployee>diffDays)
        {
            alert("Date range count should be  greater than or equal to Number of employee.");
            return false;
        }
        var dates = [date1, date2];
        var data = {
            NumberOfEmployee: this.NumberOfEmployee,
            DateRange: dates,
            Weekend: this.Weekend
        }

        let apiUrl = 'Schedule';
        this.repository.create(apiUrl, data)
            .subscribe(res => {
                this.events = res;
            },
                (error => {
                    // this.errorHandler.handleError(error);
                    // this.errorMessage = this.errorHandler.errorMessage;
                })
            )
        console.log(data);
    }
}
