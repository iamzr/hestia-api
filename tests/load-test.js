// import http from "k6/http";
// import { check, sleep } from "k6";
// import { FormData } from "https://jslib.k6.io/formdata/0.0.2/index.js";

// import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js";
// import { SharedArray } from "k6/data";

// // const csvFile = open("../sample.csv");

// // // const csvData = new SharedArray("csv contents", function() {
// // //   return papaparse.parse(csvFile, { header: true }).data;
// // // });

// // let b = function() {
// //   const fd = new FormData();
// //   fd.append("file", http.file("sample.csv", "text/csv"));
// //   return { body: fd.body(), boundary: fd.boundary };
// // };

// export const options = {
//   duration: "10s",
//   vus: 5,
//   thresholds: {
//     http_req_duration: ["p(95)<500"],
//     http_req_failed: ["rate<0.001"],
//   },
// };

// // export default function() {
// //   const url = "http://localhost:3000";
// //   const payload = {
// //     file: http.file(csvFile, "sample.csv", "text/csv"),
// //   };

// //   const params = {
// //     headers: {
// //       "Content-Type": "text/csv",
// //     },
// //   };

// //   const res = http.post(url, , params);
// //   console.log(res.status);

// //   check(res, {
// //     "response code was 200": (r) => r.status == 200,
// //     "correct output": (r) => r.body.includes(56),
// //   });
// // }

// const binFile = open("../sample.csv", "b");

// export default function() {
//   const data = {
//     field: "this is a standard form field",
//     file: http.file(binFile, "test.bin"),
//   };

//   const res = http.post("http://localhost:3000", data);
//   console.log(res.status);
//   sleep(3);
// }

import http from "k6/http";
import { check } from "k6";
import { FormData } from "https://jslib.k6.io/formdata/0.0.2/index.js";

const txt = open("./sample.csv");

export const options = {
  duration: "10s",
  vus: 5,
  thresholds: {
    http_req_duration: ["p(50)<500"],
    http_req_duration: ["p(95)<1000"],
    http_req_failed: ["rate=0"],
  },
};

export default function() {
  const fd = new FormData();
  fd.append("file", http.file(txt, "sample.csv", "text/csv"));

  const res = http.post("http://localhost:3000", fd.body(), {
    headers: { "Content-Type": "multipart/form-data; boundary=" + fd.boundary },
  });
  check(res, {
    "is status 200": (r) => r.status === 200,
  });
}
