import * as React from 'react';
import { authStore } from './stores/authStore';
import { start } from './auth';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const auth = authStore();
    React.useEffect(() => {
        start().catch((e) => {
            console.error('Auth error', e);
        });
    }, []);

    if (auth.user == null) {
        return <p>authing...</p>;
    }
    return <>{children}</>;
};
