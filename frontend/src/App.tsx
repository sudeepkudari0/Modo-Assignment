import { SetStateAction, useState } from "react";
import "./App.css";
import axios from "axios";
import { FaRegLightbulb } from "react-icons/fa";

function App() {
  const [buttonValue, setButtonValue] = useState("Turn On");
  const [selectedMiniserver, setSelectedMiniserver] = useState("192.168.1.11");
  const [selectedController, setSelectedController] = useState("Select Controller");
  const [isLightOn, setIsLightOn] = useState(false);
  const  handleTurnOn = async (miniserver: string) => {
    const turnOn = "SET(Lico;On;Pulse)"
    await axios.post(`http://localhost:3000/dev/sps/io/Vti/${turnOn}`, { miniserver })
    .then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        setIsLightOn(true);
      }
    })
    .catch(function (error) {
      console.log(error);
      
    });
  };

  const handleTurnOff = async (miniserver: string) => {
    const turnOff = "SET(Lico;Off;Pulse)"
    await axios.post(`http://localhost:3000/dev/sps/io/Vti/${turnOff}`, { miniserver })
    .then((response) => {
      if (response.status === 200) {
        console.log(response.data)
        setIsLightOn(false);
      }
    })
    .catch(function (error) {
      console.log(error);
      
    });
  };

  const handleClick = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (buttonValue === "Turn On") {
      handleTurnOn(selectedMiniserver);
    } else {
      handleTurnOff(selectedMiniserver);
    }

    // Toggle the button value
    setButtonValue((prevValue) => (prevValue === "Turn On" ? "Turn Off" : "Turn On"));
  };
  const handleMiniserverChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedMiniserver(event.target.value);
  };
  const handleControllerChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedController(event.target.value);
  };

  return (
    <>
      <div>
        <div className="w-screen h-[50px] bg-black text-center text-white text-2xl font-bold">
          <h1 className="p-1">Luxone miniserver Dashboard</h1>
        </div>
        <div className="h-auto w-screen items-center justify-center">
          <form className="flex flex-col gap-4 items-center m-10">
            <div className="flex gap-8"><label htmlFor="miniserver" className="text-[25px] font-semibold">
              Miniserver
            </label>
            <select
              name={"miniserver"}
              id="miniserver"
              value={selectedMiniserver}
              onChange={handleMiniserverChange}
              className="font-semibold w-[200px] h-8 bg-gray-200 rounded-xl">
              <option className="text-center" value="192.168.1.11">
                192.168.1.11 (m1)
              </option>
              <option className="text-center" value="192.168.1.12">
                192.168.1.12 (m2)
              </option>
              <option className="text-center" value="192.168.1.13">
                192.168.1.13 (m3)
              </option>
              <option className="text-center" value="192.168.1.14">
                192.168.1.14 (m4)
              </option>
            </select>
            </div>
            <div className="flex">
            <label htmlFor="miniserver" className="relative right-[60px] text-[25px] font-semibold">
              Lighting controller
            </label>
            <select id="controller"  className=" font-semibold w-[200px] h-8 relative right-[30px] bg-gray-200 rounded-xl"
            onChange={handleControllerChange} value={selectedController}>
              <option value="lico" className="text-center">LC1</option>
              <option value="lico" className="text-center">LC2</option>
              <option value="lico" className="text-center">LC3</option>
              <option value="lico" className="text-center">LC4</option>
            </select>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleClick}
            >
              {buttonValue}
            </button>
          </form>
        </div>
        <div className="flex items-center gap-3 justify-center">
          <p className="text-[25px] font-bold">Lighting Status:</p>
        {isLightOn ? (
          <FaRegLightbulb  size={35} color="yellow" />
        ) : (
          <FaRegLightbulb size={35} color="gray" />
        )}
      </div>
        </div>
        </>
     )}

export default App;