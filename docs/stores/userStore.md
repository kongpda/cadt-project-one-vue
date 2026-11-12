# UserStore Documentation

## Overview

The userStore handles all user-related state management including authentication, profile data, and user settings. This store is used across the application for managing user state and interactions with the backend API.

## Quick Start

1. Import the store:

```javascript
import { useUserStore } from '@/stores/userStore';
const userStore = useUserStore();
```

2. Access user data:

```javascript
// Check if user is logged in
const isLoggedIn = userStore.user !== null;

// Get user profile
const userProfile = userStore.userProfile;

// Check if user is admin
const isAdmin = userStore.user?.role === 'admin';
```

## API Routes Configuration

All API routes are configured in `src/config/api.js`. When the backend API is ready, update these routes to match your endpoints:

```javascript
// src/config/api.js
export const API_ROUTES = {
    AUTH: {
        LOGIN: '/auth/login', // POST: {email, password}
        LOGOUT: '/auth/logout', // POST: {}
        REFRESH: '/auth/refresh', // POST: {refreshToken}
    },
    USERS: {
        PROFILE: '/users/profile', // GET: user profile
        SETTINGS: '/users/settings', // GET & PUT: user settings
    },
};
```

## Store State Structure

```javascript
{
  user: {
    id: null,
    email: '',
    role: '',      // 'admin' or 'user'
    firstName: '',
    lastName: '',
    // ... other user fields
  },

  userProfile: {
    // Extended user information
    department: '',
    phone: '',
    avatar: '',
    // ... other profile fields
  },

  userSettings: {
    language: 'en',
    theme: 'light',
    notifications: {
      emailNotifications: {
        updates: false,
        events: false,
        security: false
      },
      pushNotifications: {
        events: false,
        messages: false
      }
    },
    privacy: {
      profileVisibility: true,
      activityVisibility: true,
      searchVisibility: true
    }
  }
}
```

## Available Actions

### Authentication

```javascript
// Login user
await userStore.login(email, password);

// Logout user
await userStore.logout();
```

### Profile Management

```javascript
// Get user profile
await userStore.fetchUserProfile();

// Update profile
await userStore.updateProfile({
    firstName: 'John',
    lastName: 'Doe',
    department: 'IT',
});
```

### Settings Management

```javascript
// Get user settings
await userStore.fetchUserSettings();

// Update settings
await userStore.updateUserSettings({
    theme: 'dark',
    notifications: {
        emailNotifications: {
            events: true,
        },
    },
});
```

## Expected API Responses

### Login Response

```javascript
{
  user: {
    id: number,
    email: string,
    role: string,
    firstName: string,
    lastName: string
  },
  token: string
}
```

### Profile Response

```javascript
{
  id: number,
  email: string,
  firstName: string,
  lastName: string,
  department: string,
  phone: string,
  avatar: string
}
```

### Settings Response

```javascript
{
  language: string,
  theme: string,
  notifications: {
    emailNotifications: {
      updates: boolean,
      events: boolean,
      security: boolean
    },
    pushNotifications: {
      events: boolean,
      messages: boolean
    }
  },
  privacy: {
    profileVisibility: boolean,
    activityVisibility: boolean,
    searchVisibility: boolean
  }
}
```

## Error Handling

The store includes built-in error handling for common API errors:

```javascript
try {
    await userStore.someAction();
} catch (error) {
    // error.response.status available for HTTP errors
    // error.message available for all errors
}
```

Common error status codes:

-   401: Unauthorized (not logged in)
-   403: Forbidden (insufficient permissions)
-   404: Resource not found
-   422: Validation error

## Common Issues

1. **User is null after page refresh**

    - Check if token is properly stored in localStorage
    - Verify token refresh mechanism is working

2. **Settings not persisting**

    - Ensure updateUserSettings is called after changes
    - Check API response format matches expected structure

3. **Profile updates not reflecting**
    - Verify updateProfile is called with correct data structure
    - Check if API response includes all required fields

## Development Notes

1. Always use try-catch blocks with store actions
2. Check user authentication status before accessing protected routes
3. Use computed properties from the store instead of direct state access
4. Update both user and userProfile when profile changes occur

## Testing Store Actions

```javascript
// tests/unit/stores/userStore.test.js
import { test, expect } from '@playwright/test';
import { useUserStore } from '@/stores/userStore';

test('login should set user data', async () => {
    const store = useUserStore();
    await store.login('test@example.com', 'password');
    expect(store.user).toBeTruthy();
});

test('logout should clear user data', async () => {
    const store = useUserStore();
    await store.logout();
    expect(store.user).toBeNull();
});
```
