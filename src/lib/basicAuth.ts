import type { IncomingMessage, ServerResponse } from 'http';

export default function basicAuth(req: IncomingMessage, res?: ServerResponse) {
  const auth = req.headers.authorization;

  const username = process.env.BASIC_AUTH_USER;
  const password = process.env.BASIC_AUTH_PASS;

  if (!auth || !auth.startsWith('Basic ')) {
    if (res) {
      res.statusCode = 401;
      res.setHeader('WWW-Authenticate', 'Basic realm="Protected"');
      res.end('Unauthorized');
    }
    return false;
  }

  const base64Credentials = auth.split(' ')[1];
  const [user, pass] = Buffer.from(base64Credentials, 'base64').toString().split(':');

  const isValid = user === username && pass === password;

  if (!isValid && res) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Protected"');
    res.end('Unauthorized');
  }

  return isValid;
}
