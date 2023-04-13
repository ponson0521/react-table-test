// yarn add react-pro-sidebar
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  ProSidebarProvider,
} from "react-pro-sidebar";
// yarn add @mui/icons-material @mui/material @emotion/styled @emotion/react
import StorageIcon from '@mui/icons-material/Storage';
// acesse https://react-svgr.com/playground/ para converter imagem svg em componente tsx
import SidebarHeader from "./SidebarHeader";
import { Link } from "react-router-dom";

function ProSidebar() {
  return (
    <ProSidebarProvider>
        <Sidebar>
          <Menu>
            <SidebarHeader />
            <SubMenu icon={<StorageIcon />} label="Table">
              <MenuItem component={<Link to="/" />}>V8</MenuItem>
              <MenuItem component={<Link to="/v7" />}>V7</MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>
    </ProSidebarProvider>
  );
}

export default ProSidebar;
