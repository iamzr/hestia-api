import http from "k6/http";
import { check } from "k6";
import { FormData } from "https://jslib.k6.io/formdata/0.0.2/index.js";

const txt = open("./sample.csv");

export const options = {
  duration: "1m",
  vus: 50,
  thresholds: {
    checks: ["rate>0.99"],
    http_req_failed: ["rate<0.001"],
  },
};

export default function () {
  const fd = new FormData();
  fd.append("file", http.file(txt, "sample.csv", "text/csv"));

  const res = http.post("http://localhost:3000", fd.body(), {
    headers: { "Content-Type": "multipart/form-data; boundary=" + fd.boundary },
  });
  check(res, {
    "is status 200": (r) => r.status === 200,
  });
  check(res, {});
}
