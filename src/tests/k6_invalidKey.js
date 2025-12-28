/*
    k6 test script to validate API behavior with an invalid API key.
    @author Manan 
   
    
*/
import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 5,
  iterations: 30,
};

export default function () {
  const res = http.get('http://localhost:5000/test', {
    headers: {
      'x-api-key': 'invalid_key_123',
    },
  });

  check(res, {
    '401 or 429': (r) => r.status === 401 || r.status === 429,
  });
}
