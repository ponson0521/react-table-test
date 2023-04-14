import { MenuItem, useProSidebar } from "react-pro-sidebar";
import ArrowForward from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBack from "@mui/icons-material/ArrowBackIosOutlined";

function SidebarHeader() {
  const { collapseSidebar, collapsed } = useProSidebar();
  return (
    <MenuItem
      icon={collapsed ? <ArrowForward /> : <ArrowBack />}
      onClick={() => collapseSidebar()}
      style={{
        margin: "16px 0",
        fontSize: "18px",
        fontWeight: 800,
        color: "white",
      }}
    >
      ProSidebar
    </MenuItem>
  );
}

export default SidebarHeader;
