import React, { useEffect, useState } from "react";
import "./App.css";
import { calculatePrice, validateData } from "./utilities";
import useFetchCSV from "./useFetchZones";
import useFetchExtraRates from "./useFetchExtraRates";
import useFetchRates from "./useFetchRates";

const FormField = ({ label, type, value, onChange, name, error }) => {
  return (
    <label className="flex flex-col">
      {label}
      <input
        name={name}
        type={type}
        value={value}
        placeholder={label}
        onChange={onChange}
        className={`w-full bg-gray-100 text-black outline-0 border-2  h-10 rounded-xl px-3 ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <span className="text-red-700 text-sm text-left">{error}</span>}
    </label>
  );
};

function App() {
  const [mode, setMode] = useState("import");
  const [heading, setHeading] = useState("Import from");
  const [selectedImport, setSelectedImport] = useState("India");
  const [selectedExport, setSelectedExport] = useState("Qatar");
  const { countries, zones } = useFetchCSV("/importZones.csv");
  const { extraRates } = useFetchExtraRates("./extraZones.csv");
  const { data } = useFetchRates("./rateCards.csv");

  const [error, setError] = useState({
    weight: "",
    boxes: "",
    name: "",
    phone: "",
    length: "",
    width: "",
    height: "",
    postCode: "",
    email: "",
    countrySelected: "",
  });
  const [summary, setSummary] = useState({});
  const [formValues, setformValues] = useState({
    weight: undefined,
    boxes: undefined,
    name: undefined,
    phone: undefined,
    length: undefined,
    width: undefined,
    height: undefined,
    postCode: undefined,
    email: undefined,
  });

  const submitForm = async () => {
    try {
      const validate = validateData({
        ...formValues,
        mode,
        selectedExport,
        selectedImport,
      });

      setError(validate.error);

      if (!validate.err) {
        setError({
          weight: "",
          boxes: "",
          name: "",
          phone: "",
          length: "",
          width: "",
          height: "",
          postCode: "",
          email: "",
          countrySelected: "",
        });
        const result = calculatePrice(
          {
            ...formValues,
            mode,
            selectedExport,
            selectedImport,
          },
          zones,
          extraRates,
          data
        );

        setSummary(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMode = (e) => {
    setMode(e.target.value);
  };

  const handleImportCountryChange = (e) => {
    setError((prev) => ({
      ...prev,
      countrySelected: "",
    }));
    setSelectedImport(e.target.value);
  };
  const handleExportCountryChange = (e) => {
    setError((prev) => ({
      ...prev,
      countrySelected: "",
    }));
    setSelectedExport(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
    setformValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    setHeading(() => {
      if (mode === "import") return "Import form";
      else if (mode === "export") return "Export form";
      else if (mode === "crosstrade") return "Cross trade form";
    });
  }, [mode]);

  return (
    <div className="flex flex-col min-w-[100vw]  bg-gradient-to-br min-h-[100vh] from-[#021f61] via-[#021f6195] to-[#021f61] text-white">
      <h1 className="text-center text-4xl md:text-5xl py-8 font-semibold underline">
        Rate Calculation
      </h1>
      <div className="flex flex-row flex-wrap justify-center gap-8 text-lg">
        <label className="flex flex-row gap-2">
          <input
            type="radio"
            value="export"
            checked={mode === "export"}
            onChange={toggleMode}
          />
          EXPORT
        </label>
        <label className="flex flex-row gap-2">
          <input
            type="radio"
            value="import"
            checked={mode === "import"}
            onChange={toggleMode}
          />
          IMPORT
        </label>

        <label className="flex flex-row gap-2">
          <input
            type="radio"
            value="crosstrade"
            checked={mode === "crosstrade"}
            onChange={toggleMode}
          />
          CROSS TRADE
        </label>
      </div>

      <h1 className="text-center text-3xl my-3">{heading}</h1>
      {error.countrySelected && (
        <span className="text-center text-red-600">
          {error.countrySelected}
        </span>
      )}

      <div className="flex md:flex-row flex-col gap-16 md:gap-0 md:px-3 px-3 w-full">
        <div className="flex flex-col w-full text-center md:px-16 gap-3">
          <label className="flex flex-col">
            Country from
            <select
              className="h-10 rounded-xl text-black "
              disabled={mode === "export"}
              value={selectedImport}
              onChange={handleImportCountryChange}
            >
              {countries.map((country, idx) => (
                <option className="text-black" key={idx} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </label>
          <FormField
            error={error.weight}
            label="Total Weight"
            type="number"
            value={formValues.weight}
            name="weight"
            onChange={handleInputChange}
          />
          <FormField
            error={error.boxes}
            label="Number of Boxes"
            type="number"
            value={formValues.boxes}
            name={"boxes"}
            onChange={handleInputChange}
          />
          <FormField
            error={error.name}
            label="Name"
            type="text"
            value={formValues.name}
            name="name"
            onChange={handleInputChange}
          />
          <div className="flex md:flex-row flex-col w-[100%] md:gap-14 gap:3">
            <FormField
              error={error.phone}
              label="Phone"
              type="text"
              value={formValues.phone}
              name="phone"
              onChange={handleInputChange}
            />
            <FormField
              error={error.email}
              label="Email"
              type="email"
              value={formValues.email}
              name="email"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex flex-col w-full text-center md:px-16 gap-3">
          <label className="flex flex-col">
            Country to
            <select
              className="h-10 rounded-xl  text-black"
              disabled={mode === "import"}
              value={selectedExport}
              onChange={handleExportCountryChange}
            >
              {countries.map((country, idx) => (
                <option className=" text-black" key={idx} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </label>

          <div className="flex flex-row w-full gap-3">
            <FormField
              error={error.length}
              label="Length (cm)"
              type="number"
              value={formValues.length}
              name="length"
              onChange={handleInputChange}
            />
            <FormField
              label="Width (cm)"
              error={error.width}
              type="number"
              value={formValues.width}
              name="width"
              onChange={handleInputChange}
            />
            <FormField
              label="Height (cm)"
              type="number"
              error={error.height}
              value={formValues.height}
              name="height"
              onChange={handleInputChange}
            />
          </div>

          <FormField
            label="Post code"
            type="text"
            error={error.postCode}
            value={formValues.postCode}
            name="postCode"
            onChange={handleInputChange}
          />
          <label className="flex flex-col">
            Remarks
            <textarea
              className="rounded-xl outline-0 text-black p-2"
              rows={4}
              maxLength={250}
              style={{ resize: "none" }}
            ></textarea>
          </label>
        </div>
      </div>
      <div className="py-4 flex justify-center flex-col md:text-xl text-lg">
        {mode === "crosstrade" ? (
          <button className="bg-blue-600 w-fit text-white mx-auto h-12 px-3 rounded-lg ">
            Get a quote for this
          </button>
        ) : (
          <button
            onClick={submitForm}
            className="bg-blue-600 w-fit text-white mx-auto h-12 px-3 rounded-lg"
          >
            Calculate shipping charge
          </button>
        )}

        {summary.price && (
          <div className="flex flex-col w-fit justify-center items-center  bg-[#3131314f] mx-auto my-3 px-4 rounded-xl text-white">
            <h1 className="text-3xl">Summary</h1>
            <div className="space-y-4">
              {" "}
              <div className="flex justify-between">
                <h2>Total Weight:</h2>
                <span>{summary.totalWeight}</span>
              </div>
              <div className="flex justify-between">
                <h2>Total Volume:</h2>
                <span>{summary.volume}</span>
              </div>
              <div className="flex justify-between">
                <h2>Total Boxes:</h2>
                <span>{summary.totalBoxes}</span>
              </div>
              <div className="flex justify-between">
                <h2>Country to:</h2>
                <span>{summary.exported}</span>
              </div>
              <div className="flex justify-between">
                <h2>Country from:</h2>
                <span>{summary.imported}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-semibold">
                <h3>Estimated Cost will be:</h3>
                <span>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(summary.price)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
