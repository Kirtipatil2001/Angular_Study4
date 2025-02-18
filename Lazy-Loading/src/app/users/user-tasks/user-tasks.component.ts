import { Component,inject,input,} from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent  {
  //userId = input.required<string>();
  userName  = input.required<string>();
  message = input.required<string>();
  private activatedRoute = inject(ActivatedRoute);

  //here how to use of static data
  // ngOnInit(): void{
  //   this.activatedRoute.data.subscribe({
  //     next: data =>{
  //     console.log(data);
  //   }
  //   })
  // }
  // }
// Here this code is not work for resolve route bcz we declare a separate class for resolve route

  // private userService = inject(UsersService);
  // private activatedRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);
  // userName = computed(
  //   () => this.userService.users.find((u => u.id === this.userId()))?.name
  // );

//   ngOnInit(): void {
//     console.log('Input Data: ' + this.message());
//     console.log(this.activatedRoute.snapshot);
//     const subscription = this.activatedRoute.paramMap.subscribe({
//     next: paramMap =>{
//         this.userName = this.userService.users.find(
//         (u) => u.id === paramMap.get('userId')
//         )?.name || '';
//       },
//     });

//     this.destroyRef.onDestroy(() => subscription.unsubscribe());
  //}
 }

// Use of ResolveFunction using Dynamic Data

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot ,
  routerState: RouterStateSnapshot
) => {

  const userService = inject(UsersService);
  const userName =
    userService.users.find(
      (u) => u.id === activatedRoute.paramMap.get('userId')
    )?.name || '';
  return userName;
};

export const resolveTitle: ResolveFn<string> =(
  activatedRoute,
  routerState
) => {
 return resolveUserName(activatedRoute, routerState) + '\'s Tasks'  //concatenation of string - Max's Tasks
}
