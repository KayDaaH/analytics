/**
 * Class for formatting data.
 */
export default class FormatData {
  /**
   * Constructs a new instance of FormatData.
   * @param {Object} data - The data to be formatted.
   * @returns {Object} - The formatted data.
   */
  constructor(data) {
    if (data.length === 4) {
      data = this.joinData(data);
    }
    data = this.formatDatas(data);

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
  formatDatas(data) {
    data.data.forEach((value) => {
      if (!isNaN(value["kind"])) {
        if (data["kind"][value["kind"]]) {
          value["kind"] = data["kind"][value["kind"]];
        }
      }

      if (value.kind === "cardio") {
        value.kind = "Cardio";
      } else if (value.kind === "energy") {
        value.kind = "Energie";
      } else if (value.kind === "endurance") {
        value.kind = "Endurance";
      } else if (value.kind === "strength") {
        value.kind = "Force";
      } else if (value.kind === "speed") {
        value.kind = "Vitesse";
      } else if (value.kind === "intensity") {
        value.kind = "Intensité";
      }
    });

    if (data.hasOwnProperty("kind")) {
      delete data["kind"];
    }

    return data;
  }

  /**
   * Joins the data from multiple sources into a single object.
   * @param {Array} data - The data to be joined.
   * @returns {Object} - The combined data.
   */
  joinData(data) {
    let dataTransformed = [];
    data.forEach((e) => {
      dataTransformed.push(e.data);
    });

    const combinedData = {
      id: undefined,
      userInfos: undefined,
      score: undefined,
      keyData: undefined,
      userId: undefined,
      data: [],
      kind: {},
      sessionsLength: [],
      sessionsWeight: [],
      todayScore: undefined,
    };

    for (const data of dataTransformed) {
      if (data.id !== undefined) {
        combinedData.id = data.id;
      }
      if (data.userInfos !== undefined) {
        combinedData.userInfos = data.userInfos;
      }
      if (data.score !== undefined) {
        combinedData.score = data.score;
      }
      if (data.keyData !== undefined) {
        combinedData.keyData = data.keyData;
      }
      if (data.userId !== undefined) {
        combinedData.userId = data.userId;
      }
      if (data.data !== undefined && Array.isArray(data.data)) {
        combinedData.data = combinedData.data.concat(data.data);
      }
      if (data.sessions !== undefined && Array.isArray(data.sessions)) {
        const sessionData = data.sessions.filter(
          (session) => typeof session.day === "string"
        );
        combinedData.sessionsWeight =
          combinedData.sessionsWeight.concat(sessionData);

        const sessionLengthData = data.sessions.filter(
          (session) => typeof session.day === "number"
        );
        combinedData.sessionsLength =
          combinedData.sessionsLength.concat(sessionLengthData);
      }
      if (data.todayScore !== undefined) {
        combinedData.todayScore = data.todayScore;
      }
      if (data.kind !== undefined && typeof data.kind === "object") {
        combinedData.kind = { ...combinedData.kind, ...data.kind };
      }
    }

    return combinedData;
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
