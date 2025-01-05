// src/utils/custom-fetch.js
import fetch from 'node-fetch';
import https from 'https';

const agent = new https.Agent({
  rejectUnauthorized: false, // This allows self-signed certificates
});

export default async function customFetch(url, options) {
  return fetch(url, {
    ...options,
    agent, // This works with `node-fetch`
  });
}
