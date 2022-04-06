export interface User {
    id: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    email_verified?: boolean;
    phone_verified?: boolean;
}