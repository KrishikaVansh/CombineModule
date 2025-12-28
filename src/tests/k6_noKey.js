/*
    k6 test script to validate API behavior without an API key.
    @author Manan 
    
*/
 
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 5,
  iterations: 20,
};

export default function () {
  const res = http.get('http://localhost:5000/test');

  check(res, {
    "401 – missing API key": (r) => r.status === 401,
    "429 – rate limit exceeded": (r) => r.status === 429,
  });

  sleep(0.1);
}
