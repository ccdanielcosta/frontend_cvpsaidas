import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Gatekeeper} from 'gatekeeper-client-sdk';
import { UserService } from '../services/user.service';


@Injectable({
    providedIn: 'root'
})
export class AppService {
    public user: any = null;
    serverErrorMessages: any;
    //constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {

    constructor(private userService: UserService, private router: Router, private toastr: ToastrService) {}

    async loginByAuth({email, password}) {

        this.userService.login({email, password}).subscribe({
            next: async res => {
              this.userService.setToken(res['token']);
              this.router.navigate(['/']);
              this.userService.getUserProfile();
              this.toastr.success('Login success');
            },
            error: err => {
                this.toastr.error(err.error.message);
              if(err.status == 0){
              window.alert("Technical problems, please contact admin !")
              }
              //this.serverErrorMessages = err.error.message;
            }
        });
        }
        /*
        try {
            const token = await Gatekeeper.loginByAuth(email, password);
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Login success');
        } catch (error) {
            this.toastr.error(error.message);
        }*/
    

    async registerByAuth({email, password}) {
        try {
            //const token = await Gatekeeper.registerByAuth(email, password);
            //localStorage.setItem('token', token);
            this.userService.getUserProfile();
            this.router.navigate(['/']);
            this.toastr.success('Register success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async loginByGoogle() {
        try {
            const token = await Gatekeeper.loginByGoogle();
            localStorage.setItem('token', token);
            //await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Login success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async registerByGoogle() {
        try {
            const token = await Gatekeeper.registerByGoogle();
            localStorage.setItem('token', token);
            //await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Register success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async loginByFacebook() {
        try {
            const token = await Gatekeeper.loginByFacebook();
            localStorage.setItem('token', token);
            //await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Login success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async registerByFacebook() {
        try {
            const token = await Gatekeeper.registerByFacebook();
            localStorage.setItem('token', token);
           // await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Register success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    /*async getProfile() {
        try {
            this.user = await Gatekeeper.getProfile();
        } catch (error) {
            this.logout();
            throw error;
        }
    }*/

    
}
