import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',
         meta: { open:false, title:"Risk Management" },
        component: () => import('pages/Index.vue') },
      { path: 'login', 
        meta: { open:true, title:"Authoration", back:true, color:"#f44336" },
        component: () => import('pages/Login.vue') },
      {
        path: 'agilebpm/bpm/my/todoTaskList', name: 'todoTaskList', 
        meta: { title:"todos", back:true, color:"blue" },
        component: () => import('pages/agilebpm/bpm/my/todoTaskList.vue') },
      {
        path: 'agilebpm/bpm/task/taskComplete/:id', name: 'taskComplete',
        props: true, component: () => import('pages/agilebpm/bpm/task/taskComplete.vue')
      },
      {
        path: 'form/:formId', name: 'form', props: true,
        meta: { title:"Forms",color:"gray", back:true},
        component: () => import('pages/form.vue')
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  { path: '*', component: () => import('pages/Error404.vue') }
];

export default routes;
