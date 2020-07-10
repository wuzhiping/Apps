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
        meta: {
          title: "todos", color: "blue"},
        component: () => import('pages/agilebpm/bpm/my/todoTaskList.vue') },

      {
        path: 'agilebpm/bpm/definition/definitionList', name: 'definitionList',
        meta: { title: "definitions", color: "blue" },
        component: () => import('pages/agilebpm/bpm/definition/definitionList.vue')
      },

      {
        path: 'agilebpm/bpm/definition/start/:defId', name: 'start',
        meta: { title: "start", color: "blue" }, props: true,
        component: () => import('pages/agilebpm/bpm/definition/start.vue')
      },

      {
        path: 'agilebpm/bpm/task/taskComplete/:id', name: 'taskComplete',
        props: true, component: () => import('pages/agilebpm/bpm/task/taskComplete.vue')
      },

      {
        path: 'form/:formId', name: 'form', props: true,
        meta: { title:"Forms",color:"gray" },
        component: () => import('pages/form.vue')
      },

      {
        path: 'news/list',
        meta: {
          title: "News", color: "gray",
          keepAlive: true },
        component: () => import('pages/news/list.vue')
      },
      {
        path: 'qrcode',
        meta: {
          title: "QR Code", color: "black"
        },
        component: () => import('pages/qrcode.vue')
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  { path: '*', component: () => import('pages/Error404.vue') }
];

export default routes;
