import React, { useContext } from "react";
import "./Main.css";
import { FaUserCircle } from "react-icons/fa";
import { FaCompass } from "react-icons/fa";
import { IoBulb } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { FaCode } from "react-icons/fa";
import { MdImageSearch } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa";
import { TbSend2 } from "react-icons/tb";
import quoteimg from "../../assets/gemini.png";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    prevPrompts,
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  } = useContext(Context);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && input.trim()) {
      onSent(input);
    }
  };

  const handleCardClick = (question) => {
    onSent(question); // Triggers the same API call as manual input submission
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <FaUserCircle style={{ fontSize: "20px" }} />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, User</span>
              </p>
              <p>How can I help you today? </p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "Can you provide questions to help me prepare for an interview?"
                  )
                }
              >
                <p>Provide questions to help me prepare for an interview</p>
                <IoBulb className="icon" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "Can you help me design a database schema for a business?"
                  )
                }
              >
                <p>Help design a database schema for a business</p>
                <FaCode className="icon" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "Can you suggest beautiful places to see on an upcoming road trip?"
                  )
                }
              >
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <FaCompass className="icon" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "Can you help me draft a response to a friend who is going through a break-up?"
                  )
                }
              >
                <p>
                  Help me draft a response to a friend who is going through a
                  break-up
                </p>
                <MdEdit className="icon" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <FaUserCircle />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={quoteimg} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: resultData }} />
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here.."
              onKeyDown={handleKeyDown}
            />
            <div>
              <MdImageSearch />
              <FaMicrophone />
              {input ? <TbSend2 onClick={() => onSent(input)} /> : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
