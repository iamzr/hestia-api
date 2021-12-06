import http from "k6/http";
import { check } from "k6";
import { FormData } from "https://jslib.k6.io/formdata/0.0.2/index.js";

export const options = {
  thresholds: {
    http_req_failed: ["rate > 0.99"],
    checks: ["rate > 0.99"],
  },
};

export default function() {
  const fd = new FormData();

  const res = http.post("http://localhost:3000", {
    headers: {
      "Content-Type": "multipart/form-data; boundary=" + fd.boundary,
    },
  });
  check(res, {
    "is status 400": (r) => r.status === 400,
    "error message": (r) => r.body == "Please upload a CSV file!",
  });
}
