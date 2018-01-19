import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Speaker } from '../../model/speaker.interface';

@Component({
  selector: 'app-speaker-form',
  styleUrls: ['./speaker-form.component.css'],
  templateUrl: './speaker-form.component.html',
})
export class SpeakerFormComponent implements OnInit {
    @Input() speaker: Speaker;
    @Input() disable: boolean;
    form: FormGroup;
    @Output() submitEvent: EventEmitter<Speaker> = new EventEmitter<Speaker>();
    @Output() cancelEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(){
        this.form = this.formBuilder.group({
            __v: [''],
            _id: [''],
            name: ['', Validators.required],
            email: [''],
            company: [''],
            github: [''],
            linkedIn: [''],
            twitter: ['']
        })

        if(this.speaker){
            this.form.patchValue(this.speaker);
        }
    }

    onSubmit(speaker: Speaker) {
        if(this.form.valid && !this.disable){
            this.submitEvent.emit(speaker);
        }
    }

    onCancel() {
        this.cancelEvent.emit(false);
    }

    isValid(name: string){
        const field = this.form.get(name);
        return field.invalid && (field.dirty || field.touched);
    }
}