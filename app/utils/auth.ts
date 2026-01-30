import * as z from 'zod'

export const authSchema = z.object({
  email: z.email('Email invalide'),
  password: z.string().min(6, 'Minimum 6 caractères')
})

export type AuthSchema = z.output<typeof authSchema>

export const authFields = [
  { name: 'email', type: 'email', label: 'Email', placeholder: 'votre@email.com' },
  { name: 'password', type: 'password', label: 'Mot de passe', placeholder: '******' }
]

export const authProviders = [{
  label: 'Google',
  icon: 'i-simple-icons-google',
  to: '/auth/google',
  external: true
}]
