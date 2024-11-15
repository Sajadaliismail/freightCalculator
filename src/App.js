import React, { useEffect, useState } from "react";
import "./App.css";
import {
  calculatePrice,
  countryNames,
  importZones,
  validateData,
} from "./utilities";

const FormField = ({ label, type, value, onChange, name }) => {
  return (
    <label className="flex flex-col">
      {label}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full bg-gray-100 outline-1 border-2 h-10 rounded-xl px-3"
      />
    </label>
  );
};

function App() {
  const [mode, setMode] = useState("import");
  const [heading, setHeading] = useState("Import from");
  const [selectedImport, setSelectedImport] = useState("India");
  const [selectedExport, setSelectedExport] = useState("Qatar");
  const [error, setError] = useState({});
  const [price, setPrice] = useState(null);
  const [formValues, setformValues] = useState({
    weight: null,
    boxes: null,
    name: "",
    phone: null,
    length: null,
    width: null,
    height: null,
    postCode: null,
    email: null,
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
      console.log(validate);

      if (!validate.err) {
        const result = calculatePrice({
          ...formValues,
          mode,
          selectedExport,
          selectedImport,
        });
        console.log(result);
        setPrice(result);
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
              disabled={mode == "export"}
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
            label="Weight"
            type="number"
            value={formValues.weight}
            name="weight"
            onChange={handleInputChange}
          />
          <FormField
            label="Number of Boxes"
            type="number"
            value={formValues.boxes}
            name={"boxes"}
            onChange={handleInputChange}
          />
          <FormField
            label="Name"
            type="text"
            value={formValues.name}
            name="name"
            onChange={handleInputChange}
          />
          <FormField
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
              disabled={mode == "import"}
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
              label="Length (cm)"
              type="number"
              value={formValues.length}
              name="length"
              onChange={handleInputChange}
            />
            <FormField
              label="Width (cm)"
              type="number"
              value={formValues.width}
              name="width"
              onChange={handleInputChange}
            />
            <FormField
              label="Height (cm)"
              type="number"
              value={formValues.height}
              name="height"
              onChange={handleInputChange}
            />
          </div>

          <FormField
            label="Post code"
            type="text"
            value={formValues.postCode}
            name="postCode"
            onChange={handleInputChange}
          />
          <FormField
            label="Email"
            type="email"
            value={formValues.email}
            name="email"
            onChange={handleInputChange}
          />

          <button
            onClick={submitForm}
            className="bg-blue-600 w-fit text-white mx-auto"
          >
            Calculate shipping charge
          </button>
          {price && <h3 className="text-2xl">Price Will be :{price}</h3>}
        </div>
      </div>
    </div>
  );
}

export default App;
