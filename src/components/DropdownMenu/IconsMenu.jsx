import MotherIcon from "../Icons/NavIcons/MotherIcon";
import CpuIcon from "../Icons/NavIcons/CpuIcon";
import RamIcon from "../Icons/NavIcons/RamIcon";
import PsuIcon from "../Icons/NavIcons/PsuIcon";
import GpuIcon from "../Icons/NavIcons/GpuIcon";

export const IconsMenu = ({ icon }) => {
  switch (icon) {
    case "CPU":
      return <CpuIcon className={"ml-1 mr-2 text-indigo-600"} />;
    case "GPU":
      return <GpuIcon className={"ml-1 mr-2 text-indigo-600"} />;
    case "MOTHERBOARD":
      return <MotherIcon className={"ml-1 mr-2 text-indigo-600"} />;
    case "RAM":
      return <RamIcon className={"ml-1 mr-2 text-indigo-600"} />;
    case "PSU":
      return <PsuIcon className={"ml-1 mr-2 text-indigo-600"} />;
    default:
      break;
  }
};