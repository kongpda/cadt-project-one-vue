import { defineStore } from 'pinia';

/**
 * Please refer to the docs/stores/userStore.md file for more information
 * */

// Fake data
const fakeUsers = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
        status: 'active',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe',
        createdAt: '2024-01-15',
        lastLogin: '2024-03-15 09:30:00',
        department: 'IT',
        phone: '+1 234-567-8901',
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'user',
        status: 'active',
        avatar: 'https://ui-avatars.com/api/?name=Jane+Smith',
        createdAt: '2024-01-20',
        lastLogin: '2024-03-14 15:45:00',
        department: 'Marketing',
        phone: '+1 234-567-8902',
    },
    {
        id: 3,
        name: 'Bob Wilson',
        email: 'bob@example.com',
        role: 'user',
        status: 'inactive',
        avatar: 'https://ui-avatars.com/api/?name=Bob+Wilson',
        createdAt: '2024-02-01',
        lastLogin: '2024-03-10 11:20:00',
        department: 'Sales',
        phone: '+1 234-567-8903',
    },
    {
        id: 4,
        name: 'Alice Johnson',
        email: 'alice@example.com',
        role: 'admin',
        status: 'active',
        avatar: 'https://ui-avatars.com/api/?name=Alice+Johnson',
        createdAt: '2024-02-15',
        lastLogin: '2024-03-15 08:15:00',
        department: 'HR',
        phone: '+1 234-567-8904',
    },
    {
        id: 5,
        name: 'Charlie Brown',
        email: 'charlie@example.com',
        role: 'user',
        status: 'active',
        avatar: 'https://ui-avatars.com/api/?name=Charlie+Brown',
        createdAt: '2024-02-20',
        lastLogin: '2024-03-13 16:40:00',
        department: 'Finance',
        phone: '+1 234-567-8905',
    },
];

export const useUserStore = defineStore('user', {
    state: () => ({
        user: fakeUsers[0], // Initialize with first user for testing
        userProfile: null,
        users: [...fakeUsers],
        userSettings: {
            language: 'en',
            timezone: 'UTC',
            theme: 'light',
            reducedMotion: false,
            notifications: {
                emailNotifications: {
                    updates: false,
                    events: true,
                    security: true,
                },
                pushNotifications: {
                    events: true,
                    messages: true,
                },
            },
            privacy: {
                profileVisibility: true,
                activityVisibility: true,
                searchVisibility: true,
                dataAnalytics: false,
                thirdPartySharing: false,
            },
            admin: {
                maintenanceMode: false,
                debugMode: false,
                allowUserRegistration: true,
            },
        },
    }),

    actions: {
        async fetchUserProfile(userId) {
            try {
                // Simulate API delay
                await new Promise((resolve) => setTimeout(resolve, 500));
                const user = this.users.find((u) => u.id === Number(userId));
                if (!user) {
                    this.userProfile = null;
                    throw new Error('User not found');
                }
                this.userProfile = { ...user };
                return this.userProfile;
            } catch (error) {
                console.error('Error fetching user profile:', error);
                throw error;
            }
        },

        async updateProfile(profileData) {
            try {
                // Simulate API delay
                await new Promise((resolve) => setTimeout(resolve, 500));

                // Find the user in the users array
                const index = this.users.findIndex((u) => u.id === this.user.id);
                if (index === -1) throw new Error('User not found');

                // Update the user data
                const updatedUser = {
                    ...this.users[index],
                    ...profileData,
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        profileData.name || this.users[index].name
                    )}`,
                };

                // Update in the users array
                this.users[index] = updatedUser;

                // Update the current profile if it matches
                if (this.userProfile && this.userProfile.id === updatedUser.id) {
                    this.userProfile = { ...updatedUser };
                }

                // Update the current user if it matches
                if (this.user.id === updatedUser.id) {
                    this.user = { ...updatedUser };
                }

                return updatedUser;
            } catch (error) {
                console.error('Error updating profile:', error);
                throw error;
            }
        },

        async updateEmail(data) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const user = this.userProfile;
            if (!user) throw new Error('No user profile found');

            // Validate password (in real app this would be done server-side)
            if (data.password !== 'password123') {
                throw new Error('Invalid password');
            }

            user.email = data.newEmail;
            this.userProfile = { ...user };
            return this.userProfile;
        },

        async updatePassword(data) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            // Validate current password (in real app this would be done server-side)
            if (data.currentPassword !== 'password123') {
                throw new Error('Invalid current password');
            }
            return { message: 'Password updated successfully' };
        },

        async signOutAllDevices() {
            await new Promise((resolve) => setTimeout(resolve, 500));
            return { message: 'Signed out from all devices' };
        },

        async fetchUsers() {
            await new Promise((resolve) => setTimeout(resolve, 500));
            this.users = [...fakeUsers];
            return this.users;
        },

        async createUser(userData) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const newUser = {
                id: fakeUsers.length + 1,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}`,
                createdAt: new Date().toISOString().split('T')[0],
                lastLogin: new Date().toISOString().replace('T', ' ').split('.')[0],
                ...userData,
            };
            fakeUsers.push(newUser);
            this.users = [...fakeUsers];
            return newUser;
        },

        async updateUser(userId, userData) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const index = fakeUsers.findIndex((u) => u.id === userId);
            if (index === -1) throw new Error('User not found');

            const updatedUser = {
                ...fakeUsers[index],
                ...userData,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    userData.name || fakeUsers[index].name
                )}`,
            };

            fakeUsers[index] = updatedUser;
            this.users = [...fakeUsers];
            return updatedUser;
        },

        async deleteUser(userId) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const index = fakeUsers.findIndex((u) => u.id === userId);
            if (index === -1) throw new Error('User not found');

            fakeUsers.splice(index, 1);
            this.users = [...fakeUsers];
        },

        async logout() {
            await new Promise((resolve) => setTimeout(resolve, 500));
            this.userProfile = null;
            this.users = [];
            return { message: 'Logged out successfully' };
        },

        async fetchUserSettings() {
            try {
                // Simulate API delay
                await new Promise((resolve) => setTimeout(resolve, 500));
                return { ...this.userSettings };
            } catch (error) {
                console.error('Error fetching user settings:', error);
                throw error;
            }
        },

        async updateUserSettings(settings) {
            try {
                // Simulate API delay
                await new Promise((resolve) => setTimeout(resolve, 500));

                // Update the settings
                this.userSettings = {
                    ...this.userSettings,
                    ...settings,
                };

                return this.userSettings;
            } catch (error) {
                console.error('Error updating user settings:', error);
                throw error;
            }
        },
    },
});
