import ky from 'ky';

const prefixUrl = `https://recruitment-test.flip.id/`;

export const instance = ky.extend({
  prefixUrl,
  headers: {
    Accept: 'application/json',
  },
});
