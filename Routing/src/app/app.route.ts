import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import {routes as userRoutes } from './users/users.routes';
import { inject } from "@angular/core";

const dummyCanMatch: CanMatchFn = (route, segments) =>{
const router = inject(Router);
const shouldGetAccess = Math.random();   //use of route guards
if(shouldGetAccess < 1){
  return true;
}
  return new RedirectCommand(router.parseUrl('Unauthorized'));  // use of Route Guards
}

export const routes: Routes = [
    {
      path: '', //<your-domain>
      component: NoTaskComponent,   //main parent-root route

      title:'No task selected'

    },

    {
      path: 'users/:userId',  //<your-domain>/users/id
      component: UserTasksComponent,
      children: userRoutes,    // child route
      canMatch:[dummyCanMatch],    //use of Route Guards


      data: {   //data property holds the static and dynamic data
        message:'Hello!'  //static data declaration
      },
      resolve:{               //use of resolve function
        userName: resolveUserName
      },
      title:resolveTitle
    },

    {
      path: '**',
      component:NotFoundComponent,
    }
  ];
