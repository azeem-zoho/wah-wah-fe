import {
    Component,
    EventEmitter,
    Input,
    Output,
    forwardRef,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: "lds-toggle",
    templateUrl: "lds-toggle.component.html",
    template: `<mat-slide-toggle
  [checked]="isChecked"
  (change)="onToggle($event)"
  [color]="color"
>
  <ng-content></ng-content>
</mat-slide-toggle>

    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => LDSToggleComponent),
            multi: true,
        },
    ],
})
export class LDSToggleComponent implements ControlValueAccessor {
    @Input() color: string = "primary";
    @Input() index: number = 0;
    @Output() toggleChange = new EventEmitter<{
        index: number;
        value: "Y" | "N";
    }>();

    private _value: "Y" | "N" = "N";
    private onChange: (value: "Y" | "N") => void = () => { };
    private onTouched: () => void = () => { };

    get value(): "Y" | "N" {
        return this._value;
    }

    set value(value: "Y" | "N") {
        this._value = value;
        this.onChange(this._value);
        this.onTouched();
    }

    get isChecked(): boolean {
        return this._value === "Y";
    }

    onToggle(event: any): void {
        this.value = event.checked ? "Y" : "N";
        this.toggleChange.emit({ index: this.index, value: this.value });
    }

    writeValue(value: "Y" | "N"): void {
        this._value = value || "N";
    }

    registerOnChange(fn: (value: "Y" | "N") => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        // Optionally handle the disabled state
    }
}


// src/app/home/documentation/third-party-details/third-party-details.component.html:211:62 - error TS2345: Argument of type '{ index: number; value: "Y" | "N"; }' is not assignable to parameter of type 'MatSlideToggleChange'.
//   Type '{ index: number; value: "Y" | "N"; }' is missing the following properties from type 'MatSlideToggleChange': source, checked

// 211                   (toggleChange)="setAuthorizedValidation(i, $event)"