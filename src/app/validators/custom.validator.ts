import { AbstractControl, ValidationErrors } from '@angular/forms';

export class ConfirmPassword{
    static confirmPassword(control:AbstractControl):ValidationErrors | null{
        if(control.get('passwordSignUp').value!==control.get('confirmPasswordSignUp').value){
            return {confirmPassword:"No match"};
        }
        return null;
    }
}