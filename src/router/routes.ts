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
          title: "todos" },
        component: () => import('pages/agilebpm/bpm/my/todoTaskList.vue') },
      {
        path: 'agilebpm/bpm/my/applyTaskList', name: 'applyTaskList',
        meta: {
          title: "applyTask",
          keepAlive: true
        },
        component: () => import('pages/agilebpm/bpm/my/applyTaskList.vue')
      },
      {
        path: 'agilebpm/bpm/my/approveList', name: 'approveList',
        meta: {
          title: "approveList"
        },
        component: () => import('pages/agilebpm/bpm/my/approveList.vue')
      },
      {
        path: 'agilebpm/bpm/my/carboncopyReceiveList', name: 'carboncopyReceiveList',
        meta: {
          title: "carboncopyReceiveList"
        },
        component: () => import('pages/agilebpm/bpm/my/carboncopyReceiveList.vue')
      },
      {
        path: 'agilebpm/bpm/definition/definitionList', name: 'definitionList',
        meta: { title: "definitions", },
        component: () => import('pages/agilebpm/bpm/definition/definitionList.vue')
      },

      {
        path: 'agilebpm/bpm/definition/start/:defId', name: 'start',
        meta: { title: "start"  }, props: true,
        component: () => import('pages/agilebpm/bpm/definition/start.vue')
      },

      {
        path: 'agilebpm/bpm/task/taskComplete/:id', name: 'taskComplete',
        props: true, component: () => import('pages/agilebpm/bpm/task/taskComplete.vue')
      },
      {
        path: 'agilebpm/bpm/task/instanceDetail/:id', name: 'instanceDetail',
        props: true, component: () => import('pages/agilebpm/bpm/task/instanceDetail.vue')
      },
      {
        path: 'form/:formId', name: 'form', props: true,
        meta: { title:"Forms" },
        component: () => import('pages/form.vue')
      },
      {
        path: 'ecm/:site', name: 'ecm', props: true,
        meta: { title:"ECM" },
        component: () => import('pages/ecm.vue')
      },

      {
        path: 'news/list',
        meta: {
          open: true,title: "News",
          keepAlive: true },
        component: () => import('pages/news/list.vue')
      },
      {
        path: 'qrcode',
        meta: {
          open: true,title: "QR Code", color: "black"
        },
        component: () => import('pages/qrcode.vue')
      }, {
        path: 'apps',
        meta: {
          open: true,title: "Apps"
        },
        component: () => import('pages/apps.vue')
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  { path: '*', component: () => import('pages/Error404.vue') }
];

export default routes;
