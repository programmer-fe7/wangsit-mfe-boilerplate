import { Component } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    component: (): Promise<Component> => import('@/layout/AssetLayout.vue'),
    redirect: '/asset-list',
    children: [
      {
        path: 'asset-list',
        name: 'AssetListView',
        component: (): Promise<Component> =>
          import('@/views/AssetListView.vue'),
      },
      {
        path: 'asset-detail/:selectedAssetId',
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
