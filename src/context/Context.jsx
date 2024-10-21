import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    try {
      let response;
      if (prompt !== undefined) {
        setPrevPrompts((prev) => [...prev, prompt]);
        response = await run(prompt);
        setRecentPrompt(prompt);
      } else {
        setPrevPrompts((prev) => [...prev, input]);
        setRecentPrompt(input);
        response = await run(input);
      }

      if (response) {
        const formattedResponse = processResponseToArticle(response);
        setResultData(formattedResponse);
      } else {
        throw new Error("Response is undefined");
      }
    } catch (error) {
      console.error("Error in onSent:", error);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const processResponseToArticle = (response) => {
    const formattedResponse = response
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .split("\n")
      .filter((para) => para.trim() !== "");

    let article = `<h2 style="color: #4a90e2;">Recent Inquiry:</h2>`;

    if (formattedResponse.length > 0) {
      article += `<p><strong>${formattedResponse[0]}</strong></p>`;
    }

    for (let i = 1; i < formattedResponse.length; i++) {
      if (formattedResponse[i].trim()) {
        article += `<p>${formattedResponse[i]}</p>`;
      }
    }

    return article;
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
