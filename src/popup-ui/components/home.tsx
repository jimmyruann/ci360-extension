import { useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleOpenForeground = () => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (currentTabs) => {
        if (currentTabs.length && currentTabs[0] && currentTabs[0].id) {
          if (currentTabs[0].url?.includes("https://ci360.dynatrace.com")) {
            chrome.tabs.sendMessage(
              currentTabs[0].id,
              {
                key: "SET_MODAL_OPEN_STATE",
                value: !modalOpen,
              },
              (response) => {
                setModalOpen(!modalOpen);
              }
            );
          }
        }
      }
    );
  };

  return (
    <div>
      Home <br /> <Link to="/second">to second</Link>
      <button onClick={toggleOpenForeground}>Toggle Open foreground</button>
    </div>
  );
};

export default Home;
