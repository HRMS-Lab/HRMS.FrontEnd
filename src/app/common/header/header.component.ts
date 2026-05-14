import { NgClass } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { Component, HostListener } from '@angular/core';
import { ToggleService } from '../sidebar/toggle.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { AuthenticationService } from '../../core/services/authentication.service';
import { jwtDecode } from 'jwt-decode';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [NgClass, MatMenuModule, MatButtonModule, RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {

    // isSidebarToggled
    isSidebarToggled = false;

    // isToggled
    isToggled = false;
    tokenObj: any;

    constructor(
        private toggleService: ToggleService,
        private auth: AuthenticationService,
        public themeService: CustomizerSettingsService
    ) {
        let token = localStorage.getItem("token");
        if (token != null)
            this.tokenObj = jwtDecode(token);

        this.toggleService.isSidebarToggled$.subscribe(isSidebarToggled => {
            this.isSidebarToggled = isSidebarToggled;
        });
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    // Burger Menu Toggle
    toggle() {
        this.toggleService.toggle();
    }

    // Header Sticky
    isSticky: boolean = false;
    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollPosition >= 50) {
            this.isSticky = true;
        } else {
            this.isSticky = false;
        }
    }

    // Dark Mode
    toggleTheme() {
        this.themeService.toggleTheme();
    }

    logout() {
        this.auth.logout();
    }

}