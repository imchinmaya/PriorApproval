export const paths = {
  home: '/',
  dashboard: { pawizard: '/dashboard/pawizard', editMapping: '/dashboard/editmapping' },
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  errors: { notFound: '/errors/not-found' },
} as const;
