import {
  PageIndex,
  PageLogIn,
  PageSignUp,
  PageNotFound,
  PageLoggedOut,
  PageBirdsEye,
  PageUser,
  PageWhats,
  PageWhys,
} from '../components'

export default [
  // Public
  { path: '/', component: PageIndex, },
  // { path: '/log-in', alias: 'iniciar-sesion', component: PageLogIn },
  // { path: '/sign-up', alias: 'registrar', component: PageSignUp },
  // { path: '/*', component: PageNotFound, },
  // { path: '/logged-out', alias: 'sesion-terminado', component: PageLoggedOut, },

  // Authenticated
  // { path: '/birds-eye', alias: '/vista-panoramica', component: PageBirdsEye, props: true },
  // { path: '/profile', alias: '/perfil', component: PageUser, props: true },
  // { path: '/whats/:id', alias: 'ques/:id', name: 'what', component: PageWhats, props: true },
  // { path: '/whys/:id', alias: 'porques/:id', name: 'why', component: PageWhys, props: true },
]