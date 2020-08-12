import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ScrollTopButtonComponent } from '../components/scroll-top-button/scroll-top-button.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
        ScrollTopButtonComponent
    ],
    exports: [
        ScrollTopButtonComponent
    ]
})
export class SharedModule { }