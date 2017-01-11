import { Component }   from '@angular/core'
import { AuthService } from '../auth/auth.service'
import { Router }      from '@angular/router'
import { Observable }  from 'rxjs/Observable';
import { UserService } from '../user/user.service'
import { UserModel }   from '../user/user.model'


/**
 * class for the admin component.
 */
@Component({
    selector: 'admin',
    templateUrl: './admin.component.html', 
})
export class AdminComponent{
    //list of users
    private users : UserModel[] = [];
    private numberOfPages: number = 1;
    private numberOfUsers: number = 1;

    private currentPage: number = 1;
    private lastPage: number= 0;

    public roles:string[] = ['Admin', 'Normal User', 'Restricted User', 'Banned User'];
    
    /**
     * constructor
     */
    constructor(private auth: AuthService, private router: Router, private userService: UserService)
    {
        if(this.auth.getRank() != 0)
            this.router.navigateByUrl('/mapView');
        this.getPartOfUsers(1);
    }

    /**
     * Retrives from the API a page (a partial list) of users.
     */
    private getPartOfUsers(pageNumber: number)
    {
        this.userService.getUsers(pageNumber)
        .subscribe(
            (res) => {
                this.users = res.json();
                var headers = res.headers;
                this.numberOfPages = parseInt(headers.get('x-paginate-pages'));
                this.numberOfUsers = parseInt(headers.get('x-paginate-items'));
            }
        );
    }

    /**
     * Saves the user into the API.
     */
    public saveUser(userModel : UserModel)
    {
        this.userService.changeUserRank(userModel.id, userModel.rank)
        .subscribe(
            success =>{},
            error => alert("Error: " + error)
        );
    }

    /**
     * Event fired from the template when the user has selected an other page.
     */
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