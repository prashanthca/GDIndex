import { getEncodedMessage, convertPem, str2ab, ab2str } from './sas-utils';
const decoder = new TextDecoder()
const encoder = new TextEncoder()

const algorithms = {
  RS256: {
    name: 'RSASSA-PKCS1-v1_5',
    hash: { name: 'SHA-256' },
  },
};

export function getHeader(alg, headerAdditions){
  return Object.assign({
    ...headerAdditions,
    alg,
    typ: 'JWT',
  });
};

// XXX https://developers.google.com/identity/protocols/OAuth2ServiceAccount#jwt-auth
export async function getToken (privateKeyPEM, payload, alg = 'RS256', cryptoImpl = null, headerAdditions = {}) {
  const algorithm = algorithms[alg];
  if (!algorithm) {
    throw new Error(`Unsupported algorithm ${alg}.`);
  }

  const privateKeyDER = convertPem(privateKeyPEM);
  const privateKey = await crypto.subtle.importKey(
    'pkcs8',
    privateKeyDER,
    algorithm,
    false,
    ['sign']
  );

  const header = getHeader(alg, headerAdditions);
  const encodedMessage = getEncodedMessage(header, payload);
  const encodedMessageArrBuf = str2ab(encodedMessage);

  const signatureArrBuf = await crypto.subtle.sign(
    algorithms.RS256.name,
    privateKey,
    encodedMessageArrBuf
  );
  console.log(signatureArrBuf);
  const encodedSignature = btoa(ab2str(signatureArrBuf));
  const token = `${encodedMessage}.${encodedSignature}`;
  return token;
};

// Service Account Authoriazation without OAuth2:
// https://developers.google.com/identity/protocols/OAuth2ServiceAccount#jwt-auth
// Service Account Auth for OAuth2 Tokens: Choose "HTTP / REST" for:
// https://developers.google.com/identity/protocols/OAuth2ServiceAccount
async function getTokenFromGCPServiceAccount(serviceAccountJSON, aud, alg = 'RS256', cryptoImpl = null, expiredAfter = 3600, headerAdditions = {}, payloadAdditions = {}) {

  const clientEmail =  serviceAccountJSON.client_email;
  const privateKeyId = serviceAccountJSON.private_key_id;
  const privateKeyPEM = serviceAccountJSON.private_key;
  const scope = serviceAccountJSON.scope;

  Object.assign(headerAdditions, { kid: privateKeyId });
  const header = getHeader(alg, headerAdditions);

  const iat = parseInt(Date.now() / 1000);
  const exp = iat + expiredAfter;
  const iss = clientEmail;
  const sub = clientEmail;
  const payload = Object.assign({ aud, iss, sub, iat, exp, scope, ...payloadAdditions });

  return getToken(privateKeyPEM, payload, alg, headerAdditions, cryptoImpl);
};

export default getTokenFromGCPServiceAccount