import { getCurrentUser, login, logout, handleLogin, handleLogout } from '@/access/AuthenticationService';
import { createMockSession } from '../setupJest';
import User, { AnonymousUser } from '@/access/User';
import { redirect } from 'next/navigation';
import IronSession from 'iron-session';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;
const casUrl = process.env.NEXT_PUBLIC_CAS_URL as string;
const testUser: User = JSON.parse(process.env.TEST_USER_A as string);
const xmlSoapResponse = process.env.XML_SOAP_RESPONSE as string;

describe('AuthenticationService', () => {

    describe('getCurrentUser', () => {
        
        it('should return the currentUser', async () => {
            jest.spyOn(IronSession, 'getIronSession').mockResolvedValue(createMockSession(testUser));

            expect(await getCurrentUser()).toEqual(testUser);
        });

        it('should return an AnonymousUser when nothing is stored in the session', async () => {
            jest.spyOn(IronSession, 'getIronSession').mockResolvedValue(createMockSession(undefined));

            expect(await getCurrentUser()).toEqual(AnonymousUser);
        });

    });

    describe('login', () => {

        it('should visit the CAS login url', () => {
            const casLoginUrl = `${casUrl}/login?service=${encodeURIComponent(`${baseUrl}/api/cas/login`)}`;
            login();
            expect(redirect).toHaveBeenCalledWith(casLoginUrl);
        });

    });

    describe('logout', () => {

        it('should visit the CAS logout url', async () => {
            const casLogoutUrl = `${casUrl}/logout?service=${encodeURIComponent(`${baseUrl}/api/cas/logout`)}`;
            logout();
            expect(redirect).toHaveBeenCalledWith(casLogoutUrl);
        });

    });

    describe('handleLogin', () => {

        let axiosMock: MockAdapter;

        beforeEach(() => {
            axiosMock = new MockAdapter(axios);
        });

        it('should return when ticket to validate is invalid', async () =>{
            const getIronSessionSpy = jest.spyOn(IronSession, 'getIronSession');

            axiosMock.onPost().reply(500);
            await handleLogin('ticket');

            expect(getIronSessionSpy).not.toHaveBeenCalled();
        });

        it('should save the user to the session', async () => {
            const session = createMockSession(testUser);
            jest.spyOn(IronSession, 'getIronSession').mockResolvedValue(session);
            const sessionSaveSpy = jest.spyOn(session, 'save');
            
            axiosMock
                .onPost().reply(200, xmlSoapResponse)
                .onGet().reply(200, false);
            await handleLogin('ticket');

            expect(sessionSaveSpy).toHaveBeenCalled();
        });

    });

    describe('handleLogout', () => {

        it('should destroy the session', async () => {
            const session = createMockSession(testUser);
            jest.spyOn(IronSession, 'getIronSession').mockResolvedValue(session);
            const sessionDestroySpy = jest.spyOn(session, 'destroy');

            await handleLogout();

            expect(sessionDestroySpy).toHaveBeenCalled();
        });

    });

});
