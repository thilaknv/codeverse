import { questionProps } from "./types";

const themeColors = {
  currentTheme: localStorage.getItem("theme") == "true" ? true : false,
  dark: {
    bColors: ["#2a2a2a", "#3a3a3a", "#4a4a4a", "#5a5a5a"],
    colors: ["#9f9f9f", "#c9c9c9", "#e0e0e0", "#f0f0f0"],
  },
  light: {
    bColors: ["#cfcfcf", "#dfdfdf", "#efefef", "#ffffff"],
    colors: ["#707070", "#303030", "#202020", "#101010"],
  },
};

const changeTheme = (theme: boolean) => {
  themeColors.currentTheme = theme;
  const root: any = document.querySelector(":root");
  const style = root?.style;

  const bColor = theme ? themeColors.dark.bColors : themeColors.light.bColors;
  const color = theme ? themeColors.dark.colors : themeColors.light.colors;

  bColor.forEach((color, index) => {
    style.setProperty(`--background-color${index + 1}`, color);
  });

  color.forEach((color, index) => {
    style.setProperty(`--color${index + 1}`, color);
  });

  localStorage.setItem("theme", theme ? "true" : "false");
};

const sort_functions = {
  status: {
    sign: -1,
    sort: (arr: questionProps[]) => {
      arr.sort((a: questionProps, b: questionProps) =>
        a.status == b.status
          ? a.id < b.id
            ? -1
            : 1
          : a.status
          ? sort_functions.status.sign
          : -sort_functions.status.sign
      );
      sort_functions.status.sign = -sort_functions.status.sign;
    },
  },
  id: {
    sign: 1,
    sort: (arr: questionProps[]) => {
      arr.sort((a: questionProps, b: questionProps) =>
        a.id < b.id ? sort_functions.id.sign : -sort_functions.id.sign
      );
      sort_functions.id.sign = -sort_functions.id.sign;
    },
  },
  difficulty: {
    sign: 1,
    sort: (arr: questionProps[]) => {
      arr.sort((a: questionProps, b: questionProps) => {
        return a.difficulty == b.difficulty
          ? a.id < b.id
            ? -1
            : 1
          : a.difficulty < b.difficulty
          ? sort_functions.difficulty.sign
          : -sort_functions.difficulty.sign;
      });
      sort_functions.difficulty.sign = -sort_functions.difficulty.sign;
    },
  },
};

export { changeTheme, themeColors, sort_functions };
