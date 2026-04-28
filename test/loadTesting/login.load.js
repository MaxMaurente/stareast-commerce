import http from "k6/http";
import { check } from "k6";

export const options = {
  stages: [
    { duration: "5s", target: 10 },
    { duration: "20s", target: 30 },
    { duration: "5s", target: 0 }
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"]
  }
};

const BASE_URL = "http://localhost:3000";
const LOGIN_PAYLOAD = JSON.stringify({
  email: "alice@example.com",
  password: "alice123"
});
const PARAMS = {
  headers: {
    "Content-Type": "application/json"
  }
};

export default function () {
  const response = http.post(`${BASE_URL}/login`, LOGIN_PAYLOAD, PARAMS);

  check(response, {
    "status is 200": (r) => r.status === 200,
    "token is present": (r) => {
      const body = r.json();
      return typeof body.token === "string" && body.token.length > 0;
    }
  });
}
