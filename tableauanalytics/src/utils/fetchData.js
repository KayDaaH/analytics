import { useEffect, useState } from "react";
import dataMocked from "../data/mockup.json";
import FormatData from "./formatData";
import axios from "axios";

/**
 * Custom hook for retrieving and formatting data based on user ID.
 * @param {number} userID - The user ID.
 * @returns {[Object, boolean]} - The formatted data and error status.
 */
export default function useData(userID) {
  // data for development
  // const rawData = dataMocked;

  const rawData = `http://localhost:3000/user`;

  const [error, setError] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    let tempData = [];
    (async () => {
      setError(false);

      try {
        // Check if using mocked data or data from API
        if (rawData !== dataMocked) {
          // Fetch user, activity, sessions, and performance data from API
          const responses = await Promise.all([
            axios.get(`${rawData}/${userID}`),
            axios.get(`${rawData}/${userID}/activity`),
            axios.get(`${rawData}/${userID}/average-sessions`),
            axios.get(`${rawData}/${userID}/performance`),
          ]);

          for (const response of responses) {
            const { data } = response;
            tempData.push(data);
          }

          // Format the data using the FormatData class
          const formattedData = new FormatData(tempData);

          setData(formattedData);
        } else {
          // Search for corresponding data in mocked data
          rawData.forEach((data) => {
            if (data["id"] === Number(userID)) {
              tempData.push(data);
            }
          });

          // Check if any data is found
          if (tempData[0]["id"]) {
            const formattedData = new FormatData(tempData[0]);

            // Format the data using the FormatData class
            setData(formattedData);
          } else {
            setError(true);
          }
        }
      } catch (error) {
        setError(true);
      }
    })();
  }, [userID, rawData]);

  return [data, error];
}
