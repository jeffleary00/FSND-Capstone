import createAuth0Client from '@auth0/auth0-spa-js';
import jwt_decode from "jwt-decode";

let auth0 = null;
let token = null;
let decoded = null;
let permissions = null;
let environment = {
  domain: 'dev-us1d520w.us.auth0.com',
  client_id: '1XMqKvqO5JYM8GNh1oEl28voSfef8EKa',
  redirect_uri: 'https://cs-monitor.herokuapp.com#!/login-results',
  audience: 'https://cs-monitor.herokuapp.com'
}

const initClient = async function() {
  auth0 = await createAuth0Client({
    domain: environment.domain,
    client_id: environment.client_id,
    redirect_uri: environment.redirect_uri,
    audience: environment.audience
  });
}

const decodeToken = function(t) {
  token = t;
  decoded = jwt_decode(t);
  return decoded;
}

const hasPermission = function(p) {
  if (!token) {
    return false;
  }
  return decoded.permissions && decoded.permissions.length && decoded.permissions.indexOf(p) >= 0;
}

export {auth0, token, initClient, decodeToken, hasPermission};
