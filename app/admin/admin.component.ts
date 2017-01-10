import { Component }   from '@angular/core'
import { AuthService } from '../auth/auth.service'
import { Router }      from '@angular/router'
import { Observable }  from 'rxjs/Observable';
import { UserService } from '../user/user.service'
import { UserModel }   from '../mapView/user.model'


@Component({
    selector: 'admin',
    templateUrl: './admin.component.html', 
})
export class AdminComponent{
    private users : UserModel[] = [];
    private numberOfPages: number = 1;
    private numberOfUsers: number = 1;

    private currentPage: number = 1;
    private lastPage: number= 0;

    public roles:string[] = ['Admin', 'Normal User', 'Restricted User', 'Banned User'];
    private selectedRole: number[] = [];

    
    constructor(private auth: AuthService, private router: Router, private userService: UserService)
    {
        if(this.auth.getRank() != 0)
            this.router.navigateByUrl('/mapView');
        this.getPartOfUsers(1);
    }

    private getPartOfUsers(pageNumber: number)
    {
        this.userService.getUsers(pageNumber)
        .subscribe(
            (res) => {
                this.users = res.json();
                var headers = res.headers;
                this.numberOfPages = parseInt(headers.get('x-paginate-pages'));
                this.numberOfUsers = parseInt(headers.get('x-paginate-items'));
             
                this.users.forEach((user) => {
                    this.selectedRole.push(user.rank);
                });
            }
        );
    }

    public saveUser(userModel : UserModel, index: number)
    {
        userModel.rank = this.selectedRole[index];
        this.userService.changeUserRank(userModel.id, userModel.rank)
        .subscribe(
            success =>{},
            error => alert("Error: " + error)
        );
    }

    public changePage($event)
    {
        if(this.lastPage != this.currentPage)
        {
            if(this.currentPage > this.numberOfPages)
                this.currentPage = this.numberOfPages;

            this.getPartOfUsers(this.currentPage);
            this.lastPage = this.currentPage;
        }
    }
}