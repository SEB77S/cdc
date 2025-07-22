
import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ClientSideRowModelModule,
  ModuleRegistry,
  ValidationModule,
} from "ag-grid-community";
import {
  ColumnMenuModule,
  ColumnsToolPanelModule,
  ContextMenuModule,
  FiltersToolPanelModule,
  PivotModule,
  RowGroupingPanelModule,
} from "ag-grid-enterprise";

import { useFetchJson } from "../call-typing-table/useFetch";
import datas from '../../../../mock-data/callTyping.json';

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ColumnsToolPanelModule,
  ColumnMenuModule,
  ContextMenuModule,
  PivotModule,
  FiltersToolPanelModule,
  RowGroupingPanelModule,
  ...[ValidationModule],
]);

import { IntegratedChartsModule } from "ag-grid-enterprise";
import { AgChartsEnterpriseModule } from 'ag-charts-enterprise';

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  IntegratedChartsModule.with(AgChartsEnterpriseModule)
]);

const CallTypingTable = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [columnDefs] = useState([
    { field: "month", headerName: 'Mes', rowGroup: true, hide: true, filter: "agSetColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows', treeList: true, } },
    { field: "week", headerName: 'Semana', rowGroup: true, hide: true, filter: "agSetColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows', treeList: true, } },
    { field: "date", headerName: 'Fecha', filter: "agSetColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows', treeList: true, } },
    { field: "agent", headerName: "Agente", filter: "agNumberColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows', treeList: true, } },
    { field: "chat", headerName: "Chats", filter: "agNumberColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows', treeList: true, } },
    { field: "check_in", headerName: "Check In", filter: "agNumberColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows', treeList: true, } },
    { field: "cotization", headerName: "Cotización", filter: "agNumberColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows', treeList: true, } },
    { field: "information", headerName: "Información", filter: "agNumberColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows', treeList: true, } },
    { field: "transference", headerName: "Transferencia", filter: "agNumberColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows', treeList: true, } },
    { field: "grand_total", headerName: "Grand total", filter: "agNumberColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows', treeList: true, } },
  ]);

  const defaultColDef = useMemo(() => ({
    flex: 1,
    minWidth: 130,
    enableValue: true,
    enableRowGroup: true,
    enablePivot: true,
    floatingFilter: true,

  }), []);

  const autoGroupColumnDef = useMemo(() => ({
    minWidth: 200,
    pinned: "left",
  }), []);

  const { loading } = useFetchJson(
    "https://www.ag-grid.com/example-assets/olympic-winners.json"
  );
  const enableCharts = true;
  const cellSelection = true;
  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={datas}
          loading={loading}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          pivotMode={false}
          sideBar={"columns"}
          pivotPanelShow={"always"}
          enableCharts={enableCharts}
          cellSelection={cellSelection}
        />
      </div>
    </div>
  );
};


export default CallTypingTable