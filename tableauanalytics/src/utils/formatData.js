/**
 * Class for formatting data.
 */
export default class formatData {
  /**
   * Constructs a new instance of formatData.
   * @param {Object} data - The data to be formatted.
   * @returns {Object} - The formatted data.
   */
  constructor(data) {
    data = this.joindata(data);
    data = this.formatD(data);

    /* Sometimes todayScore doesn't exist but exists in the score property, so we assign a new property todayScore. */
    if (data["score"]) {
      data["todayScore"] = data["score"];
      delete data.score;
    }

    const calorieCount = data["keyData"]["calorieCount"];
    if (calorieCount) {
      data["keyData"]["calorieCount"] = this.formatCalories(calorieCount);
    }

    return data;
  }

  /**
   * Formats the data.
   * @param {Object} data - The data to be formatted.
   * @returns {Object} - The formatted data.
   */
  formatD(data) {
    data["data"].forEach((value) => {
      if (!isNaN(value["kind"])) {
        if (data["kind"][value["kind"]]) {
          value["kind"] = data["kind"][value["kind"]];
        }
      }

      if (value["kind"] === "cardio") {
        value["kind"] = "Cardio";
      } else if (value["kind"] === "energy") {
        value["kind"] = "Energie";
      } else if (value["kind"] === "endurance") {
        value["kind"] = "Endurance";
      } else if (value["kind"] === "strength") {
        value["kind"] = "Force";
      } else if (value["kind"] === "speed") {
        value["kind"] = "Vitesse";
      } else if (value["kind"] === "intensity") {
        value["kind"] = "Intensité";
      }
    });

    if (data.hasOwnProperty("kind")) {
      delete data["kind"];
    }

    return data;
  }

  /**
   * Joins the data.
   * @param {Object[]} data - The data to be joined.
   * @returns {Object} - The joined data.
   */
  joindata(data) {
    data = data.reduce((accumulator, data) => {
      Object.entries(data).forEach(([key, value]) => {
        if (accumulator[key] === undefined) {
          accumulator[key] = value;
        }

        /* Avoid duplicate 'sessions' property */
        if (key === "sessions" && typeof value === "object" && value) {
          const isInteger = value[0].day;
          if (!isNaN(isInteger)) {
            accumulator["sessionsLength"] = value;
          } else {
            accumulator["sessionsWeight"] = value;
          }
        }
      });
      return accumulator; // Return only one object at the end.
    });
    if (data["sessionsLength"] && data["sessionsWeight"]) {
      delete data.sessions;
    }
    return data;
  }

  /**
   * Formats the calories.
   * @param {number} weight - The weight to be formatted.
   * @returns {string} - The formatted weight.
   */
  formatCalories(weight) {
    const numAsString = weight.toString();

    if (numAsString.includes(",")) {
      return numAsString;
    } else {
      return numAsString.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
  }
}
