'use server';

import User from './User';
import Role from './Role';
import axios from 'axios';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_2_1_BASE_URL as string;

/**
 * Sets the appropriate roles for a user.
 * 
 * @param user - The user
 */
export const setRoles = async (user: User): Promise<void> => {
    // All users should have ANONYMOUS role to describe universal access (e.g. /about page in NavLinks.ts)
    user.roles.push(Role.ANONYMOUS); 

    if (isValidUhUuid(user.uhUuid)) {
        user.roles.push(Role.UH);
    }
    if (await isOwner(user.uhUuid)) {
        user.roles.push(Role.OWNER);
    }
    if (await isAdmin(user.uhUuid)) {
        user.roles.push(Role.ADMIN);
    }
}

/**
 * Calls UH Groupings API to check if the uhIdentifier is an owner.
 * 
 * @param uhIdentifier - The uid or uhUuid
 * 
 * @returns True if the uhIdentifier is an owner of a grouping
 */
const isOwner = async (uhIdentifier: string): Promise<boolean> => {
    try {
        const { data } = await axios.get(`${apiBaseUrl}/owners`, {
            headers: { 'current_user': uhIdentifier }
        });
        return data;
    } catch (error) {
        console.error(error);
    }
    return false;
}

/**
 * Calls UH Groupings API to check if the uhIdentifier is an admin.
 * 
 * @param uhIdentifier - The uid or uhUuid
 * 
 * @returns True if the uhIdentifier is an admin
 */
const isAdmin = async (uhIdentifier: string): Promise<boolean> => {
    try {
        const { data } = await axios.get(`${apiBaseUrl}/admins`, {
            headers: { 'current_user': uhIdentifier }
        });
        return data;
    } catch (error) {
        console.error(error);
    }
    return false;
}

/**
 * Checks if uhUuid is valid using Regex.
 * 
 * @param uhUuid - 8 digit unique user indentifier
 * 
 * @returns True if uhUuid is valid
 */
const isValidUhUuid = (uhUuid: string): boolean => {
    const uhUuidPattern = new RegExp(/^[0-9]{8}$/);
    return uhUuidPattern.test(uhUuid);
}
