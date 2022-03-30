import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBBadge
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const SidebarPro = () => {
  return (
    <div
      style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="black">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: 'inherit' }}
          >
            ABC
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/Alta del Cliente" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="bi bi-newspaper">Alta del Cliente</CDBSidebarMenuItem>
            </NavLink>
            <CDBSidebarMenu
              icon="book"
              suffix={
                <CDBBadge color="danger" size="small" borderType="pill">
                  new
                </CDBBadge>
              }
            > 
              <CDBSidebarMenuItem>Baja del Cliente</CDBSidebarMenuItem>
              <CDBSidebarMenuItem>Añadir Turno</CDBSidebarMenuItem>

            </CDBSidebarMenu>
            <NavLink exact to="/tables" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="bi bi-phone-fill">Alta del Operador</CDBSidebarMenuItem>
            </NavLink>

            <CDBSidebarMenu
              icon="book"
              suffix={
                <CDBBadge color="danger" size="small" borderType="pill">
                  new
                </CDBBadge>
              }
            > 

              <CDBSidebarMenuItem>Baja del Operador</CDBSidebarMenuItem>
              <CDBSidebarMenuItem>Reasignacion</CDBSidebarMenuItem>
              <CDBSidebarMenuItem>Cambio de Número</CDBSidebarMenuItem>

            </CDBSidebarMenu>

            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Justificaciones</CDBSidebarMenuItem>
            </NavLink>

            
            <NavLink exact to="/analytics" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">
                Reporte Quincenal
              </CDBSidebarMenuItem>
            </NavLink>

            <CDBSidebarMenu
              icon="book"
              suffix={
                <CDBBadge color="danger" size="small" borderType="pill">
                  new
                </CDBBadge>
              }
            > 
              <CDBSidebarMenuItem>Reporte Mensual</CDBSidebarMenuItem>
              <CDBSidebarMenuItem>Reporte de Bajas e Ingresos</CDBSidebarMenuItem>

            </CDBSidebarMenu>

      
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            Nhyix
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default SidebarPro;
