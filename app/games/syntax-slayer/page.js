"use client";
import { useState, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // Example theme, you can change this

const dungeonLevels = [
  {
    code: `function greet(name) {\n console.log("Hello, " + nme);\n}`,
    solution: `function greet(name) {\n console.log("Hello, " + name);\n}`,
    hint: "Check the variable spelling.",
  },
  {
    code: `for (let i = 0; i < 5 i++) {\n console.log(i);\n}`,
    solution: `for (let i = 0; i < 5; i++) {\n console.log(i);\n}`,
    hint: "Syntax error in the loop structure.",
  },
  {
    code: `let numbers = [1, 2, 3];\n console.log(numbars[1]);`,
    solution: `let numbers = [1, 2, 3];\n console.log(numbers[1]);`,
    hint: "Check the array variable name.",
  },
  {
    code: `if (true) {\n console.log("Yes");\n} else {\n console.log("No")`,
    solution: `if (true) {\n console.log("Yes");\n} else {\n console.log("No");\n}`,
    hint: "Check the missing semicolon and curly brace.",
  },
  {
    code: `let x = 10;\nlet y = "10";\nconsole.log(x == y);`,
    solution: `let x = 10;\nlet y = "10";\nconsole.log(x === y);`,
    hint: "Use strict equality to compare.",
  },
  {
    code: `const num = "5";\nconst result = num * 2;\nconsole.log(rusult);`,
    solution: `const num = "5";\nconst result = num * 2;\nconsole.log(result);`,
    hint: "Check the spelling of the variable in the console.log.",
  },
  {
    code: `function sum(a, b) {\n return a + b;\n}\nconsole.log(sum(5));`,
    solution: `function sum(a, b) {\n return a + b;\n}\nconsole.log(sum(5, 5));`,
    hint: "Function is missing a parameter.",
  },
  {
    code: `let obj = { name: "Alice" };\nconsole.log(obj.anme);`,
    solution: `let obj = { name: "Alice" };\nconsole.log(obj.name);`,
    hint: "Check the spelling of the object property.",
  },
  {
    code: `function isEven(num) {\n return num % 2 = 0;\n}`,
    solution: `function isEven(num) {\n return num % 2 === 0;\n}`,
    hint: "Check the equality operator in the return statement.",
  },
  {
    code: `let arr = [1, 2, 3];\nconsole.log(arr.lenght);`,
    solution: `let arr = [1, 2, 3];\nconsole.log(arr.length);`,
    hint: "Check the spelling of the array property.",
  },
  {
    code: `let str = "hello";\nconsole.log(str.toUpper());`,
    solution: `let str = "hello";\nconsole.log(str.toUpperCase());`,
    hint: "Check the method name for converting to uppercase.",
  },
  {
    code: `let age = 21;\nif (age > 18) {\n console.log("Adult")`,
    solution: `let age = 21;\nif (age > 18) {\n console.log("Adult");\n}`,
    hint: "Missing semicolon and closing curly brace.",
  },
  {
    code: `function multiply(a, b) {\n return a * b;\n}\nconsole.log(multiply(3, 4, 5));`,
    solution: `function multiply(a, b) {\n return a * b;\n}\nconsole.log(multiply(3, 4));`,
    hint: "The function is being called with too many arguments.",
  },
  {
    code: `let isRaining = true;\nconsole.log(isRaning);`,
    solution: `let isRaining = true;\nconsole.log(isRaining);`,
    hint: "Check the spelling of the variable name.",
  },
  {
    code: `const myFunc = () => {\n return 10;\n};\nconsole.log(myfunc());`,
    solution: `const myFunc = () => {\n return 10;\n};\nconsole.log(myFunc());`,
    hint: "Check the case sensitivity of the function name.",
  },
];
export default function Home() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [playerCode, setPlayerCode] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    loadLevel();
  }, [currentLevel]);

  useEffect(() => {
    Prism.highlightAll(); // Re-highlight the code after every render
  }, [currentLevel, playerCode]);

  const loadLevel = () => {
    if (currentLevel < dungeonLevels.length) {
      setMessage(`Level ${currentLevel + 1}: Fix the code!`);
      setPlayerCode("");
    } else {
      setMessage("Congratulations! You have debugged all the code!");
    }
  };

  const handleSubmit = () => {
    const level = dungeonLevels[currentLevel];
    if (playerCode.trim() === level.solution.trim()) {
      setMessage("Correct! Moving to the next level...");
      setScore((prevScore) => prevScore + 1);
      setTimeout(() => setCurrentLevel((prevLevel) => prevLevel + 1), 2000);
    } else {
      setMessage(`Incorrect! Hint: ${level.hint}`);
    }
  };

  const handleCopy = async () => {
    const code = dungeonLevels[currentLevel].code;
    await navigator.clipboard.writeText(code);
    setMessage("Code copied to clipboard!");
  };

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    setPlayerCode(text);
  };

  return (
    <div className="h-screen w-screen  text-white flex flex-col items-center justify-center py-6">
      <div className="text-2xl mb-4">Score: {score}</div>
      <div className="w-full flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
        <div
          id="code-challenge"
          className="relative w-full md:w-1/2 bg-slate-700 p-8 rounded-lg"
        >
          <pre
            id="code-block"
            className="language-javascript relative bg-gray-900 text-gray-200 p-4 rounded-lg mb-4 whitespace-pre-wrap font-mono overflow-auto"
            style={{
              border: "1px solid #333",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-md text-sm "
            >
              Copy
            </button>
            <code className="language-javascript">
              {currentLevel < dungeonLevels.length
                ? dungeonLevels[currentLevel].code
                : ""}
            </code>
          </pre>

          {currentLevel < dungeonLevels.length && (
            <>
              <div className="relative w-full mt-8">
                <textarea
                  id="player-input"
                  className="w-full h-40 p-4 rounded bg-gray-800 text-white font-mono mb-4"
                  placeholder="Fix the code here..."
                  value={playerCode}
                  onChange={(e) => setPlayerCode(e.target.value)}
                />
                <button
                  onClick={handlePaste}
                  className="absolute top-2 right-2 bg-indigo-600 text-white px-2 py-1 rounded-md text-sm"
                >
                  Paste
                </button>
              </div>
              <button
                className="group/button relative inline-flex items-center w-full justify-center overflow-hidden rounded-md bg-blue-500/30 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-95 hover:shadow-xl hover:shadow-blue-600/50 border border-white/20"
                onClick={handleSubmit}
                id="submit-button"
              >
                <span className="text-lg">Submit</span>
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                  <div className="relative h-full w-10 bg-white/30"></div>
                </div>
              </button>
            </>
          )}
          <div id="game-message" className="mt-4 text-lg">
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}
