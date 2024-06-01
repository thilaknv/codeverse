import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface ThemeContextProps {
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeContext = createContext<ThemeContextProps | null>(null);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") == "true" ? true : false
  );

  useEffect(() => changeTheme(theme), [theme]);

  const themeColors = {
    dark: {
      bColors: ["#091525", "#0d2136", "#162c46", "#262c5680"],
      colors: ["#8c9db6", "#9cadc6", "#e0e0e0", "#87aef0"],
    },
    light: {
      bColors: ["#d9e9e9", "#e9eef3", "#f5f5f5", "#ffffff"],
      colors: ["#707070", "#303030", "#202020", "#0077b6"],
    },
  };

  const changeTheme = (theme: boolean) => {
    setTheme(theme);
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

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
