import React from 'react';
import { authStatus, start } from './auth';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const auth = authStatus();
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
