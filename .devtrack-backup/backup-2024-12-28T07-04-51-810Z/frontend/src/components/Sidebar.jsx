import PropTypes from "prop-types";
import { ServerListSidebar } from "./ServerListSidebar";

export const Sidebar = ({ className }) => {
    return (
      <div className={className}>
        <ServerListSidebar/>
        <p>sidebar</p>
      </div>
    );
  };

  Sidebar.propTypes = {
    className: PropTypes.string, 
  };