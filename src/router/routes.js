// src/router/routes.js

export default  [
  { path: '/', component: () => import('layouts/MainLayout.vue'), children: [
      { path: '', component: () => import('pages/WebConsolePage.vue') }
    ]
  },
  { path: '/:catchAll(.*)*', component: () => import('pages/ErrorNotFound.vue') }
]
