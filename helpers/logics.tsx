import { questionProps } from "./types";
import axios from "axios";

const sortFunctions = {
  status: {
    sign: -1,
    sort: (arr: questionProps[]) => {
      arr.sort((a: questionProps, b: questionProps) =>
        a.status == b.status
          ? a.qid < b.qid
            ? -1
            : 1
          : a.status
          ? sortFunctions.status.sign
          : -sortFunctions.status.sign
      );
      sortFunctions.status.sign = -sortFunctions.status.sign;
    },
  },
  qid: {
    sign: 1,
    sort: (arr: questionProps[]) => {
      arr.sort((a: questionProps, b: questionProps) =>
        a.qid < b.qid ? sortFunctions.qid.sign : -sortFunctions.qid.sign
      );
      sortFunctions.qid.sign = -sortFunctions.qid.sign;
    },
  },
  difficulty: {
    sign: 1,
    sort: (arr: questionProps[]) => {
      arr.sort((a: questionProps, b: questionProps) => {
        return a.difficulty == b.difficulty
          ? a.qid < b.qid
            ? -1
            : 1
          : a.difficulty < b.difficulty
          ? sortFunctions.difficulty.sign
          : -sortFunctions.difficulty.sign;
      });
      sortFunctions.difficulty.sign = -sortFunctions.difficulty.sign;
    },
  },
};

const sortUsersOnPoints = (list: any[]) => {
  // 2 for easy, 4 for medium, 6 for hard
  // const findPoints = (arr: number[]) => arr[0] * 2 + arr[1] * 4 + arr[2] * 6;
  list.sort((a: any, b: any) =>
    a.stats.points == b.stats.points
      ? a.stats.solvedQuestionsSet.length - b.stats.solvedQuestionsSet.length
      : b.stats.points - a.stats.points
  );
};

// RUN USING judge0

const RUN_CODE_API = async (
  code: string,
  language: "Java" | "Python" | "CPP",
  runOrSubmit: 0 | 1
) => {
  const LANGUAGE_CODES = { Java: 91, Python: 92, CPP: 52 };

  const OPTIONS_1 = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    params: {
      base64_encoded: "false",
      fields: "*",
    },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Key": import.meta.env.VITE_X_RAPIDAPI_KEY,
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    data: {
      language_id: LANGUAGE_CODES[language],
      source_code: code,
      stdin: runOrSubmit,
    },
  };

  const OPTIONS_2 = {
    method: "GET",
    url: "https://judge0-ce.p.rapidapi.com/submissions/",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_X_RAPIDAPI_KEY,
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(OPTIONS_1);
    // response --> response.data.token is used to get details of submition

    OPTIONS_2.url =
      "https://judge0-ce.p.rapidapi.com/submissions/" + response.data.token;

    let response1 = await axios.request(OPTIONS_2);
    let check = response1.data.status.id < 3;
    let retry = 0;

    while (check && retry++ < 6) {
      // just to wait
      await new Promise((res) => setTimeout(res, 1000));

      response1 = await axios.request(OPTIONS_2);
      check = response1.data.status.id < 3;
    }

    return { DATA: response1.data };
  } catch (error) {
    return { ERROR: "Internal Error" };
  }
};

export { sortFunctions, sortUsersOnPoints, RUN_CODE_API };
