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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  // Check if route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStore.authenticated) {
      // Redirect to login (would add this in a real app)
      // next('/login');
      // For this demo, we'll just assume authentication
      next();
    } else {
      // Check if user type matches route requirements
      const userType = to.meta.userType;
      if (userType && authStore.user?.type !== userType) {
        // Redirect to appropriate home page based on user type
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