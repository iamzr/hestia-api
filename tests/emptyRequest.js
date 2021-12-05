import http from "k6/http";
import { check } from "k6";
import { FormData } from "https://jslib.k6.io/formdata/0.0.2/index.js";

export const options = {
  duration: "10s",
  vus: 5,
  thresholds: {
    http_req_duration: ["p(50)<500"],
    http_req_duration: ["p(95)<1000"],
    http_req_failed: ["rate=1"],
  },
};

export default function() {
  const fd = new FormData();

  const res = http.post("http://node-app:3000", {
    headers: {
      "Content-Type": "multipart/form-data; boundary=" + fd.boundary,
    },
  });
  check(res, {
    "is status 400": (r) => r.status === 400,
    "error message": (r) => r.body == "Please upload a CSV file!",
  });
}
