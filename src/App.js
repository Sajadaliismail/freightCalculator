import React, { useEffect, useState } from "react";
import "./App.css";
import { calculatePrice, countryNames, validateData } from "./utilities";

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
        className={`w-full bg-gray-100 outline-0 border-2  h-10 rounded-xl px-3 ${
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
  const [getQuote, setGetQoute] = useState(false);
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
  const [price, setPrice] = useState(null);
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
    setGetQoute(false);
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
        const result = calculatePrice({
          ...formValues,
          mode,
          selectedExport,
          selectedImport,
        });
        if (!result) setGetQoute(true);
        else setPrice(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMode = (e) => {
    setMode(e.target.value);
  };

  const handleImportCountryChange = (e) => {
    setSelectedImport(e.target.value);
  };
  const handleExportCountryChange = (e) => {
    setSelectedExport(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGetQoute(false);
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
    <div className="flex flex-col w-[100vw] h-[100vw]">
      <div className="flex flex-row justify-center gap-8 text-lg">
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
            value="export"
            checked={mode === "export"}
            onChange={toggleMode}
          />
          EXPORT
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

      <div className="flex md:flex-row flex-col md:mx-3 mx-3 w-full">
        <div className="flex flex-col w-full text-center md:mx-16 gap-3">
          <label className="flex flex-col">
            Country from
            <select
              className="h-10 rounded-xl"
              disabled={mode === "export"}
              value={selectedImport}
              onChange={handleImportCountryChange}
            >
              {countryNames.map((country, idx) => (
                <option key={idx} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </label>
          <FormField
            error={error.weight}
            label="Weight"
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
          <FormField
            error={error.phone}
            label="Phone"
            type="text"
            value={formValues.phone}
            name="phone"
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col w-full text-center md:mx-16 gap-3">
          <label className="flex flex-col">
            Country to
            <select
              className="h-10 rounded-xl"
              disabled={mode === "import"}
              value={selectedExport}
              onChange={handleExportCountryChange}
            >
              {countryNames.map((country, idx) => (
                <option key={idx} value={country}>
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
          <FormField
            error={error.email}
            label="Email"
            type="email"
            value={formValues.email}
            name="email"
            onChange={handleInputChange}
          />

          {price && <h3 className="text-2xl">Price Will be :{price}</h3>}
          {getQuote ? (
            <button className="bg-blue-600 w-fit text-white mx-auto h-12 px-3 rounded-lg">
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
        </div>
      </div>
    </div>
  );
}

export default App;
