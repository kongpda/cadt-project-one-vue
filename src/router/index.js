import { createRouter, createWebHistory } from "vue-router";
import LandingPageLayout from "@/layouts/LandingPageLayout.vue";
import { adminRoutes } from "./admin.routes";
import LandingPageRoute from "./landing-page.routes";
import { userRoutes } from "./user.routes";

// Marketing routes
const landingPageRoute = {
  path: "/",
  component: LandingPageLayout,
  children: [...LandingPageRoute],
};

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    landingPageRoute,
    adminRoutes,
    userRoutes,
    // Catch-all / 404 route
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/components/pageNotFound.vue'),
    },
  ],
});

// Navigation guard for auth
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // Add your auth check logic here
    // For now, just proceeding
    next();
  } else {
    next();
  }
});

export default router;
