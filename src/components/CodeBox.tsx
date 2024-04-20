import { ChangeEvent, useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { themeColors } from "../../helpers/logics";
import { useAuth } from "./Auth";
import { AuthProps } from "../../helpers/types";

// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBoxProps {
  // "vs-dark"
  expandOutput: React.Dispatch<React.SetStateAction<number>>;
  setOutput: React.Dispatch<React.SetStateAction<any>>;
}

// this will be done in server later -----
const tempOptions = {
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
    language_id: 71,
    source_code: "",
    stdin: 0,
  },
};
const tempOptions1 = {
  method: "GET",
  url: "https://judge0-ce.p.rapidapi.com/submissions/",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_X_RAPIDAPI_KEY,
    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
  },
};
const tempHelper = async (code: string, language: string) => {
  tempOptions.data.source_code = code;
  tempOptions.data.language_id =
    language == "Java"
      ? 91
      : language == "Python"
      ? 71
      : language == "CPP"
      ? 52
      : -1;
  try {
    const response = await axios.request(tempOptions);
    tempOptions1.url =
      "https://judge0-ce.p.rapidapi.com/submissions/" + response.data.token;
    let response1 = await axios.request(tempOptions1);
    let check = response1.data.status.id < 3,
      retry = 0;
    while (check && retry++ < 6) {
      response1 = await axios.request(tempOptions1);
      check = response1.data.status.id < 3;
    }
    return { DATA: response1.data };
  } catch (error) {
    return { ERROR: "Internal Error" };
  }
};
// this will be done in server later -----

const CodeBox = ({ expandOutput, setOutput }: CodeBoxProps) => {
  type Language = "Java" | "CPP" | "Python";

  const { currentUser } = useAuth() as AuthProps;
  const authenticated = currentUser != null;

  const [language, setLanguage] = useState<Language>("Java");
  const languages: string[] = ["Java", "CPP", "Python"];
  const [code, setCode] = useState({
    Java: `import java.util.Scanner;

class Solution {
  public int findDuplicate(int[] nums) {
    // Write your code here
    for (int i = 0; i < nums.length;) {
      if (nums[i] == i + 1) {
        i++;
        continue;
      }
      if (nums[i] == nums[nums[i] - 1])
        return nums[i];
      int index = nums[i];
      nums[i] = nums[index - 1];
      nums[index - 1] = index;
    }
    return -1;
  }
}


class Main {
  public static void main(String[] args) {
    Scanner in = new Scanner(System.in);
    int option = in.nextInt();
    in.close();
    if (option == 0) {
      run();
    } else {
      // submit();
    }
  }

  private static void run() {
    Solution obj = new Solution();
    int[] result = new int[2];
    int[] output = new int[2];
    // test cases to run;
    int[] case1 = { 1, 3, 4, 2, 2 };
    int[] case2 = { 3, 1, 3, 4, 2 };

    output[0] = obj.findDuplicate(case1);
    result[0] = output[0] == 2 ? 1 : 0;

    output[1] = obj.findDuplicate(case2);
    result[1] = output[1] == 3 ? 1 : 0;

    // to differntiate users stdout and our stdout
    System.out.print("%break%");
    System.out.print(output[0] + "|" + output[1]);
    System.out.print("%result%");
    System.out.print(result[0] + "|" + result[1]);
  }

  private static void submit() {
    // later
  }
}
`,
    Python: `print("hello")
`,
    CPP: `#include <iostream>
int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
} 
`,
  });

  // temp -----
  const handleRun = async () => {
    //should be authenticated
    if (!authenticated) return;

    if (!currentUser || language != "Java") return;
    tempOptions.data.stdin = 0;
    const output = tempHelper(code[language], language);
    setOutput((await output).DATA);
    expandOutput(() => {
      document.querySelector("#t-o-dropdown")?.classList.toggle("rotate", true);
      return 60;
    });
  };
  const handleSubmit = () => {
    //should be authenticated
    if (!authenticated) return;

    // expandOutput(() => {
    //   document.querySelector("#t-o-dropdown")?.classList.toggle("rotate", true);
    //   return 60;
    // });
  };
  // temp -----
  return (
    <div className="codebox">
      <div className="codebox-header">
        <select
          name="language"
          className="codebox-lang-select"
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            setLanguage((prev) => {
              const value = event.target.value;
              if (value == "Java" || value == "Python" || value == "CPP")
                return value;
              return prev;
            })
          }
        >
          {languages.map((lang) => (
            <option key={lang} value={lang} className="codebox-lang-option">
              {lang}
            </option>
          ))}
        </select>
      </div>

      <Editor
        // height="90vh"
        className="editorrr"
        onChange={(newCode) =>
          newCode && setCode((prev) => ({ ...prev, [language]: newCode }))
        }
        language={language.toLowerCase()}
        // defaultValue={code[language]}
        value={code[language]}
        theme={themeColors.currentTheme ? "vs-dark" : "light"}
      />
      {/* <SyntaxHighlighter language={language.toLowerCase()} style={vscDarkPlus}>
        {code[language]}
      </SyntaxHighlighter> */}
      <div className="codebox-footer">
        <button
          className={authenticated ? "submit" : "submit disabled-cursor"}
          onClick={handleSubmit}
          disabled={!authenticated}
        >
          Submit
        </button>
        <button
          className={authenticated ? "run" : "run disabled-cursor"}
          onClick={handleRun}
          disabled={!authenticated}
        >
          Run
        </button>
      </div>
    </div>
  );
};

export default CodeBox;
