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
      style={{ position: 'absolute', height: '100vh', overflow: 'scroll initial' }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="black">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: 'inherit'}}
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
              
            > 
            <NavLink exact to="/Baja del Cliente">
              <CDBSidebarMenuItem>Baja del Cliente</CDBSidebarMenuItem>
              </NavLink>

              <NavLink exact to="/Añadir Turno">
              <CDBSidebarMenuItem>Añadir Turno</CDBSidebarMenuItem>
              </NavLink>

            </CDBSidebarMenu>
            <NavLink exact to="/Alta del Operador" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="bi bi-phone-fill">Alta del Operador</CDBSidebarMenuItem>
            </NavLink>

            <CDBSidebarMenu
              icon="book"
            > 
                <NavLink exact to="/Baja del Operador">
              <CDBSidebarMenuItem>Baja del Operador</CDBSidebarMenuItem>
                </NavLink>

                <NavLink exact to="/Reasignacion">
              <CDBSidebarMenuItem>Reasignación</CDBSidebarMenuItem>
                </NavLink>

                <NavLink exact to="/Cambio de Numero">
              <CDBSidebarMenuItem>Cambio de Número</CDBSidebarMenuItem>
                </NavLink>

            </CDBSidebarMenu>

            <NavLink exact to="/Calendario" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Justificaciones</CDBSidebarMenuItem>
            </NavLink>

            
            <NavLink exact to="/Reporte Quincenal" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">
                Reporte Quincenal
              </CDBSidebarMenuItem>
            </NavLink>

            <CDBSidebarMenu
              icon="book"
            > 

                <NavLink exact to="/ReporteM">
              <CDBSidebarMenuItem>Reporte Mensual</CDBSidebarMenuItem>
                </NavLink>

                <NavLink exact to="/Reporte Bajas">
              <CDBSidebarMenuItem>Reasignacion de Supervisor</CDBSidebarMenuItem>
                </NavLink>

                <NavLink exact to="/Consulta">
              <CDBSidebarMenuItem>Consulta</CDBSidebarMenuItem>
                </NavLink>

            </CDBSidebarMenu>

      
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            {/* Nhyix */}
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default SidebarPro;
