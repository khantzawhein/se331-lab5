import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/event/EventListView.vue'
import AboutView from '../views/AboutView.vue'
import StudentView from '../views/StudentView.vue'
import EventDetailView from '@/views/event/DetailView.vue'
import RegisterView from '@/views/event/RegisterView.vue'
import EditView from '@/views/event/EditView.vue'
import LayoutView from '@/views/event/LayoutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
import nProgress from 'nprogress'
import EventService from '@/services/EventService'
import { useEventStore } from '@/stores/event'
import EventFormView from '@/views/event/EventFormView.vue'
import OrganizerFormView from '@/views/organizers/OrganizerFormView.vue'
import OrganizerListView from '@/views/organizers/OrganizerListView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: SignUpView
    },
    {
      path: '/',
      name: 'event-list-view',
      component: EventListView,
      props: (route) => ({
        page: parseInt(route.query?.page?.toString() || '1'),
        perPage: parseInt(route.query?.per_page?.toString() || '2')
      })
    },
    {
      path: '/organizers',
      name: 'organizer-list-view',
      component: OrganizerListView,
      props: (route) => ({
        page: parseInt(route.query?.page?.toString() || '1'),
        perPage: parseInt(route.query?.per_page?.toString() || '2')
      })
    },
    {
      path: '/event/:id',
      name: 'event-layout-view',
      component: LayoutView,
      props: true,
      beforeEnter: (to) => {
        const id = parseInt(to.params.id as string)
        const eventStore = useEventStore()
        return EventService.getEvent(id)
          .then((response) => {
            eventStore.setEvent(response.data)
          })
          .catch((error) => {
            if (error.response?.status === 404) {
              return {
                name: '404-resource-view',
                params: { resource: 'event' }
              }
            } else {
              return { name: 'network-error-view' }
            }
          })
      },
      children: [
        {
          path: '',
          name: 'event-detail-view',
          component: EventDetailView,
          props: true
        },
        {
          path: 'register',
          name: 'event-register-view',
          component: RegisterView,
          props: true
        },
        {
          path: 'edit',
          name: 'event-edit-view',
          component: EditView,
          props: true
        }
      ]
    },
    {
      path: '/add-event',
      name: 'add-event',
      component: EventFormView
    },
    {
      path: '/add-organizer',
      name: 'add-organizer',
      component: OrganizerFormView
    },
    {
      path: '/students',
      name: 'students',
      component: StudentView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/network-error',
      name: 'network-error-view',
      component: NetworkErrorView
    },
    {
      path: '/404/:resource',
      name: '404-resource-view',
      component: NotFoundView,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

router.beforeEach(() => {
  nProgress.start()
})

router.afterEach(() => {
  nProgress.done()
})

export default router
