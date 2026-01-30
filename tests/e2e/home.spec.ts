import { test, expect } from '@playwright/test'

test('should redirect to login when not authenticated', async ({ page }) => {
  await page.goto('/')

  // Verify redirection to /login
  await expect(page).toHaveURL(/\/login/)

  // Verify the login form is visible
  const title = page.getByText('Connexion')
  await expect(title).toBeVisible()
})

test('should show auth providers', async ({ page }) => {
  await page.goto('/login')

  // Verify Google provider is visible
  await expect(page.getByText(/google/i)).toBeVisible()
})
