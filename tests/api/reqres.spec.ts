import { test, expect } from '@playwright/test';

test.describe('API Tests', () => {
  test('should fetch user list', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users?page=2');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    expect(responseBody.page).toBe(2);
    expect(responseBody.data.length).toBeGreaterThan(0);
  });

  test('should create a new user', async ({ request }) => {
    const response = await request.post('https://reqres.in/api/users', {
      data: {
        name: 'John Doe',
        job: 'QA Automation Engineer'
      }
    });
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);
    
    const responseBody = await response.json();
    expect(responseBody.name).toBe('John Doe');
    expect(responseBody.job).toBe('QA Automation Engineer');
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('createdAt');
  });
});
