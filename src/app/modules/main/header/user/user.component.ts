import {Component, OnInit} from '@angular/core';
import {UserService} from '@services/user.service';
import {DateTime} from 'luxon';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    public user;

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.user = this.userService.user;
    }

    logout() {
        this.userService.logout();
    }

    formatDate(date) {
        return DateTime.fromISO(date).toFormat('dd LLL yyyy');
    }
}
