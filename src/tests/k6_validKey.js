/*
    k6 test script to validate API behavior with a valid API key.
    @author Manan
*/
import http from 'k6/http';
import { check } from 'k6';

const API_KEY = 'sk_student_123';

export const options = {
  vus: 10,
  iterations: 120,
};

export default function () {
  const res = http.get('http://localhost:3000/test', {
    headers: {
      'x-api-key': API_KEY,
    },
  });

  check(res, {
    '200 OK (allowed)': (r) => r.status === 200,
    '429 Rate limited': (r) => r.status === 429,
  });
}
