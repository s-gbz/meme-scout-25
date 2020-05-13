import { Biography } from './biography';
import { MemePreference } from './memePreference';

export interface User { 
    id: number;
    name: string;
    profilePicture: string;
    email: string;
    age: number;
    gender: string;
    sexualPreference: string;
    memePreference: MemePreference;
    biography: Biography;
    matches: Array<User>;
}