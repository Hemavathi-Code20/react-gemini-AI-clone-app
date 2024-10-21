import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { Context } from "../../context/Context";
import { FiMenu } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { FiMessageSquare } from "react-icons/fi";
import { FaHistory } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaRegQuestionCircle } from "react-icons/fa";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className={`sidebar ${extended ? "extended" : ""}`}>
      <div className="sidebar-header">
        <FiMenu
          onClick={() => setExtended((prev) => !prev)}
          style={{ fontSize: "25px", marginLeft: "5px", cursor: "pointer" }}
        />
        <div onClick={() => newChat()} className="new-chat">
          <FaPlus />
          {extended ? <p style={{ marginLeft: "3px" }}>New chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => (
              <div
                key={index}
                onClick={() => loadPrompt(item)}
                className="recent-entry"
              >
                <FiMessageSquare />
                <p>{item.slice(0, 18)} ...</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="sidebar-footer">
        <div className="bottom-item recent-entry">
          <FaRegQuestionCircle />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <FaHistory />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <IoMdSettings />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
