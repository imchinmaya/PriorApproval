export const paths = {
  home: '/',
  dashboard: { pawizard: '/dashboard/pawizard', graphqldemo: '/dashboard/graphqldemo' },
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  errors: { notFound: '/errors/not-found' },
} as const;
