import { useEffect, useState } from "react";
import dataMocked from "../data/mockup.json";
import formatData from "./formatData";

/**
 * Custom hook for retrieving and formatting data based on user ID.
 * @param {number} userID - The user ID.
 * @returns {[Object, boolean]} - The formatted data and error status.
 */
export default function useData(userID) {
  // const datas = dataMocked;
  const rawData = `http://localhost:3000/user`;

  const [error, setError] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    let tempData = [];
    (async () => {
      setError(false);

      try {
        // Check if using mocked data or data from API
        if (rawData === dataMocked) {
          // Fetch user, activity, sessions, and performance data from API
          const user = fetch(`${rawData}/${userID}`);
          const activity = fetch(`${rawData}/${userID}/activity`);
          const session = fetch(`${rawData}/${userID}/average-sessions`);
          const performance = fetch(`${rawData}/${userID}/performance`);
          const promises = [user, activity, session, performance];

          // Wait for all requests to finish
          const responses = await Promise.all(promises);

          /**
           * Function to retrieve data from each response.
           */
          const fetchData = async () => {
            try {
              const tempData = [];
              const promises = responses.map(async (response) => {
                if (!response.ok) {
                  setError(true);
                } else {
                  const json = await response.json();
                  tempData.push(json["data"]);
                }
              });
              await Promise.all(promises);
            } catch (error) {
              setError(true);
            }
          };

          // Call fetchData function to retrieve the data
          fetchData();

          // Format the data using the formatData class
          const datas = new formatData(tempData);
          setData(datas);
        } else {
          // Search for corresponding data in mocked data
          dataMocked.forEach((data) => {
            if (data["id"] === Number(userID)) {
              tempData.push(data);
            }
          });

          // Check if any data is found
          if (tempData[0]["id"]) {
            // Format the data using the formatData class
            const datas = new formatData(tempData);
            setData(datas);
          } else {
            setError(true);
          }
        }
      } catch {
        setError(true);
      }
    })();
  }, [userID, rawData]);

  return [data, error];
}
