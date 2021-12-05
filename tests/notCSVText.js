import http from "k6/http";
import { check } from "k6";
import { FormData } from "https://jslib.k6.io/formdata/0.0.2/index.js";

const txt = open("./test");

export const options = {
  duration: "1s",
  vus: 5,
  thresholds: {
    http_req_duration: ["p(50)<500"],
    http_req_duration: ["p(95)<1000"],
    http_req_failed: ["rate=1"],
  },
};

export default function() {
  const fd = new FormData();
  fd.append("file", http.file(txt, "test"));

  const res = http.post("http://localhost:3000", fd.body(), {
    headers: { "Content-Type": "multipart/form-data; boundary=" + fd.boundary },
  });
  check(res, {
    "status code is 400": (r) => r.status == 400,
    "error message": (r) =>
      r.body == "This is not a CSV file. Please upload a CSV file.",
  });
}
