import { useState, useEffect } from "react";
import Papa from "papaparse";

const useFetchExtraRates = (csvPath) => {
  const [extraRates, setExtraRates] = useState([]);
  const [error, setError] = useState(null);
  const [isLoadingExtraRates, setIsLoadingExtraRates] = useState(false);

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        setIsLoadingExtraRates(true);
        const response = await fetch(csvPath);
        const csvData = await response.text();
        console.log(csvData);

        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const rates = result.data.map((item) => parseFloat(item.Rate));
            setExtraRates(rates);
          },
        });
      } catch (err) {
        setError(err);
      } finally {
        setIsLoadingExtraRates(false);
      }
    };

    fetchCSV();
  }, [csvPath]);

  return { extraRates, error, isLoadingExtraRates };
};

export default useFetchExtraRates;
