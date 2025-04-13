import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/teacher'
  },
  {
    path: '/teacher',
    component: () => import('../layouts/TeacherLayout.vue'),
    meta: { requiresAuth: true, userType: 'teacher' },
    children: [
      {
        path: '',
        redirect: '/teacher/class/class001'
      },
      {
        path: 'class/:id',
        name: 'ClassDetail',
        component: () => import('../views/teacher/ClassDetail.vue')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('../layouts/AdminLayout.vue'),
    meta: { requiresAuth: true, userType: 'admin' },
    children: [
      {
        path: '',
        redirect: '/admin/teachers'  // Redirect to teachers management by default
      },
      {
        path: 'teachers',
        name: 'TeachersManagement',
        component: () => import('../views/admin/TeachersManagement.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStore.authenticated) {
      next();
    } else {
      const userType = to.meta.userType;
      if (userType && authStore.user?.type !== userType && authStore.user?.type !== 'admin') {
        // Only redirect if user is not an admin
        next(`/${authStore.user?.type}`);
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

export default router;
