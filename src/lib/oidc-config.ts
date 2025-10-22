import { UserManagerSettings } from 'oidc-client-ts';

export const oidcConfig: UserManagerSettings = {
  authority: 'http://localhost:9090/realms/event-ticket-platform',
  client_id: 'event-ticket-platform',
  redirect_uri: 'http://localhost:3000/callback',
  post_logout_redirect_uri: 'http://localhost:3000',
  response_type: 'code',
  scope: 'openid profile email',
  automaticSilentRenew: true,
  silent_redirect_uri: 'http://localhost:3000/silent-callback',
  loadUserInfo: true,
};

