import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})

export class ThemeService {
    private themeWrapper = document.querySelector('body');
    setTheme(variableList?: Array<any>): Observable<boolean> {
        variableList.forEach(element => {
            for (const key of Object.keys(element)) {
                this.themeWrapper.style.setProperty(key, element[key]);
            }
        });
        return of(true);
    }
}
