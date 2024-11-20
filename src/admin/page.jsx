import { Suspense, useEffect, useState } from "react";
import AdminSignInForm from "./adminSignin";
import Dashboard from "./DashboardContent";
import Loading from "./Loading";
const tempData = [
  {
    "weight": 23,
    "boxes": "7",
    "name": "Emily Davis",
    "phone": "+5056793732",
    "volume": "3000cm³",
    "postCode": "84732",
    "email": "emilydavis@example.com",
    "country": "USA",
    "mode": "import",
    "replied": true,
    "date": 1710120073
  },
  {
    "weight": 5,
    "boxes": "5",
    "name": "James Anderson",
    "phone": "+1908450020",
    "volume": "2000cm³",
    "postCode": "86912",
    "email": "jamesanderson@example.com",
    "country": "Canada",
    "mode": "import",
    "replied": true,
    "date": 1714315247
  },
  {
    "weight": 24,
    "boxes": "1",
    "name": "James Anderson",
    "phone": "+5461802522",
    "volume": "5000cm³",
    "postCode": "69149",
    "email": "jamesanderson@example.com",
    "country": "UK",
    "mode": "import",
    "replied": false,
    "date": 1718467771
  },
  {
    "weight": 10,
    "boxes": "6",
    "name": "Sarah Wilson",
    "phone": "+2303247354",
    "volume": "3000cm³",
    "postCode": "29211",
    "email": "sarahwilson@example.com",
    "country": "India",
    "mode": "export",
    "replied": true,
    "date": 1725511327
  },
  {
    "weight": 45,
    "boxes": "10",
    "name": "Sarah Wilson",
    "phone": "+3002557904",
    "volume": "4000cm³",
    "postCode": "25356",
    "email": "sarahwilson@example.com",
    "country": "Australia",
    "mode": "export",
    "replied": false,
    "date": 1704595389
  },
  {
    "weight": 37,
    "boxes": "7",
    "name": "Linda Martinez",
    "phone": "+8550456235",
    "volume": "3000cm³",
    "postCode": "32646",
    "email": "lindamartinez@example.com",
    "country": "USA",
    "mode": "import",
    "replied": true,
    "date": 1724412335
  },
  {
    "weight": 50,
    "boxes": "5",
    "name": "Emily Davis",
    "phone": "+6893023370",
    "volume": "4000cm³",
    "postCode": "53370",
    "email": "emilydavis@example.com",
    "country": "Australia",
    "mode": "export",
    "replied": true,
    "date": 1710633597
  },
  {
    "weight": 46,
    "boxes": "6",
    "name": "David Taylor",
    "phone": "+5972540983",
    "volume": "5000cm³",
    "postCode": "13116",
    "email": "davidtaylor@example.com",
    "country": "Italy",
    "mode": "crosstrade",
    "replied": true,
    "date": 1701863974
  },
  {
    "weight": 35,
    "boxes": "8",
    "name": "Michael Brown",
    "phone": "+2461304738",
    "volume": "5000cm³",
    "postCode": "57429",
    "email": "michaelbrown@example.com",
    "country": "France",
    "mode": "import",
    "replied": false,
    "date": 1706785142
  },
  {
    "weight": 26,
    "boxes": "8",
    "name": "David Taylor",
    "phone": "+5829734044",
    "volume": "4000cm³",
    "postCode": "55769",
    "email": "davidtaylor@example.com",
    "country": "USA",
    "mode": "crosstrade",
    "replied": false,
    "date": 1709095369
  },
  {
    "weight": 22,
    "boxes": "4",
    "name": "Michael Brown",
    "phone": "+2376810402",
    "volume": "4000cm³",
    "postCode": "43734",
    "email": "michaelbrown@example.com",
    "country": "France",
    "mode": "export",
    "replied": false,
    "date": 1701177600
  },
  {
    "weight": 28,
    "boxes": "3",
    "name": "Linda Martinez",
    "phone": "+4265926009",
    "volume": "3000cm³",
    "postCode": "60630",
    "email": "lindamartinez@example.com",
    "country": "USA",
    "mode": "export",
    "replied": true,
    "date": 1715278071
  },
  {
    "weight": 9,
    "boxes": "5",
    "name": "David Taylor",
    "phone": "+1387358549",
    "volume": "1000cm³",
    "postCode": "71889",
    "email": "davidtaylor@example.com",
    "country": "Mexico",
    "mode": "import",
    "replied": false,
    "date": 1721192647
  },
  {
    "weight": 45,
    "boxes": "10",
    "name": "Emily Davis",
    "phone": "+7440728961",
    "volume": "3000cm³",
    "postCode": "92316",
    "email": "emilydavis@example.com",
    "country": "Germany",
    "mode": "export",
    "replied": true,
    "date": 1715434807
  },
  {
    "weight": 41,
    "boxes": "7",
    "name": "Linda Martinez",
    "phone": "+5368142773",
    "volume": "5000cm³",
    "postCode": "53867",
    "email": "lindamartinez@example.com",
    "country": "Spain",
    "mode": "export",
    "replied": true,
    "date": 1713979108
  },
  {
    "weight": 12,
    "boxes": "4",
    "name": "David Taylor",
    "phone": "+4133202064",
    "volume": "5000cm³",
    "postCode": "78804",
    "email": "davidtaylor@example.com",
    "country": "France",
    "mode": "export",
    "replied": false,
    "date": 1702715700
  },
  {
    "weight": 19,
    "boxes": "8",
    "name": "Alice Smith",
    "phone": "+4149299772",
    "volume": "4000cm³",
    "postCode": "73159",
    "email": "alicesmith@example.com",
    "country": "Germany",
    "mode": "export",
    "replied": true,
    "date": 1722679434
  }
]



export default function AdminSignInPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [data, setData] = useState(tempData);


  return (
    <div className="flex items-start justify-center min-h-screen bg-[#21428b] relative">
      <img
        className="absolute"
        src={"/logixman.svg"}
        width={150}
        height={50}
        alt="logo"
      />
      {isAuthenticated ? (
        data ? (
          <Suspense fallback={<Loading />}>
            <Dashboard data={data} setIsAuthenticated={setIsAuthenticated} />
          </Suspense>
        ) : (
          <Loading />
        )
      ) : (
        <div className="w-full max-w-md my-auto">
          <h1 className="text-2xl font-bold text-center mb-6 text-white">
            Admin Sign In
          </h1>
          <AdminSignInForm setIsAuthenticated={setIsAuthenticated} />
        </div>
      )}
    </div>
  );
}
