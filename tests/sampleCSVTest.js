import http from "k6/http";
import { check } from "k6";
import { FormData } from "https://jslib.k6.io/formdata/0.0.2/index.js";

const txt = open("./sample.csv");

export const options = {
  thresholds: {
    checks: ["rate>0.99"],
    http_req_failed: ["rate<0.001"],
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
    "correct reponse": (r) => {
      console.log(r.body);
      r.body ==
        `cycle.id,cycle.name,cycle.dataDescription,cycle.endDate,cycle.startDate,cycle.startDateDefinition,cycle.cycleDuration,cycle.functionalUnitMeasure,cycle.schemaVersion,cycle.dataPrivate,cycle.site.id,cycle.defaultSource.id,cycle.dataCompleteness.electricityFuel,cycle.dataCompleteness.material,cycle.dataCompleteness.fertilizer,cycle.dataCompleteness.other,cycle.dataCompleteness.pesticidesAntibiotics,cycle.dataCompleteness.soilAmendments,cycle.dataCompleteness.water,cycle.dataCompleteness.products,cycle.dataCompleteness.coProducts,cycle.dataCompleteness.cropResidue,cycle.dataCompleteness.manureManagement,cycle.inputs.ureaAsN.value,cycle.inputs.inorganicPhosphorusFertilizerUnspecifiedAsP2O5.value,cycle.inputs.inorganicPotassiumFertilizerUnspecifiedAsK2O.value,cycle.inputs.diesel.value,cycle.products.peanutInHull.value,cycle.practices.fullTillage.value
        Small,"Peanut, in hull - Astaneh-ye-Ashrafiyeh, Iran - 2012",No emissions data. Partial data on inputs and products. Site measurements available.,2012,2011,harvest of previous crop,365,1 ha,2.16.0,False,Small,1,True,False,True,False,False,True,True,True,True,False,True,48.59624,25.988424,15.937152,86.90678908,3018.4,-
        Medium,"Peanut, in hull - Astaneh-ye-Ashrafiyeh, Iran - 2012",No emissions data. Partial data on inputs and products. Site measurements available.,2012,2011,harvest of previous crop,365,1 ha,2.16.0,False,Medium,1,True,False,True,False,False,True,True,True,True,False,True,52.3439,26.32,12.1401,81.48573128,3290.0,-
        Large,"Peanut, in hull - Astaneh-ye-Ashrafiyeh, Iran - 2012",No emissions data. Partial data on inputs and products. Site measurements available.,2012,2011,harvest of previous crop,365,1 ha,2.16.0,False,Large,1,True,False,True,False,False,True,True,True,True,False,True,56.184377,17.902705,41.393731,78.45703088,3346.3,-
        
        `;
    },
  });
}
