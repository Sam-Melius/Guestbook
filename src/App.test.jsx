import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const server = setupServer(
    rest.post(`${process.env.SUPABASE_API_URL}/auth/v1/token`, (req, res, ctx) =>
      res(
        ctx.json({
          access_token: 'MOCKED_ACCESS_TOKEN',
          token_type: 'bearer',
          expires_in: 3600,
          refresh_token: 'MOCKED_REFRESH_TOKEN',
          user: {
            id: '12345',
            aud: 'authenticated',
            role: 'authenticated',
            email: 'dan@alchemycodelab.com',
            email_confirmed_at: '2021-12-30T22:38:38.811933Z',
            phone: '',
            confirmation_sent_at: '2021-12-30T22:38:27.275189Z',
            confirmed_at: '2021-12-30T22:38:38.811933Z',
            recovery_sent_at: '2022-05-01T01:46:20.103383Z',
            last_sign_in_at: '2022-05-04T22:02:21.608591647Z',
            app_metadata: {
              provider: 'email',
              providers: ['email'],
            },
            user_metadata: {},
            identities: [
              {
                id: '12345',
                user_id: '12345',
                identity_data: {
                  sub: '12345',
                },
                provider: 'email',
                last_sign_in_at: '2021-12-30T22:38:27.273692Z',
                created_at: '2021-12-30T22:38:27.273734Z',
                updated_at: '2021-12-30T22:38:27.273734Z',
              },
            ],
            created_at: '2021-12-30T22:38:27.271807Z',
            updated_at: '2022-05-04T22:02:21.609699Z',
          },
        })
      )
    ),
    rest.get(`${process.env.SUPABASE_API_URL}/rest/v1/entries`, (req, res, ctx) =>
      res(
        ctx.json([
          {
            id: 23,
            guest_id: '12345',
            content: "How's it going?",
            created_at: '2022-05-04T16:13:45.973973+00:00',
          },
          {
            id: 22,
            guest_id: '12345',
            content: 'Hello, World!',
            created_at: '2022-05-04T16:13:26.583814+00:00',
          },
        ])
      )
    )
  );
  
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

describe('<App />', () => {
    it('renders a list of entries and creates an entry', async () => {
        render(
            <MemoryRouter>
                <UserProvider>
                    <App />
                </UserProvider>
            </MemoryRouter>
        );
        const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
        userEvent.click(dashboardLink);

        const emailInput = screen.getByRole('textbox');
        userEvent.type(emailInput, 'test_user@example.com');

        const passwordInput = screen.getByPlaceholderText(/password/i);
        userEvent.type(passwordInput, 'password');

        const signInButton = screen.getByRole('button', { name: /sign in/i });
        userEvent.click(signInButton);
          
        await screen.findByRole('link', { name: /dashboard/i });
        userEvent.click(dashboardLink);

        // await screen.findByRole('heading', {
        //     name: /dashboard/i,
        //   }); 

        // const entry = await screen.getByText('Hello, World!');
        // expect(entry).toBeInTheDocument();

        
    })
})
