import { Component } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    // TODO: You should use a new layout (see the comment in ExampleLayout.vue)
    component: (): Promise<Component> => import('@/layout/ExampleLayout.vue'),
    // FIXME: Redirect to the asset page instead
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'ExampleView',
        component: (): Promise<Component> => import('@/views/ExampleView.vue'),
      },
      // FIXME: The path should be more descriptive of its content
      {
        path: 'another-page',
        name: 'AssetListView',
        component: (): Promise<Component> =>
          import('@/views/AssetListView.vue'),
      },
      {
        path: 'detail/:selectedAssetId',
        name: 'AssetDetailView',
        component: (): Promise<Component> =>
          import('@/views/AssetDetailView.vue'),
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory((import.meta.env || process.env).BASE_URL),
  routes,
});

export default router;
