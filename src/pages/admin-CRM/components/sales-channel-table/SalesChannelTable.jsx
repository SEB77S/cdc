
import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { IntegratedChartsModule } from "ag-grid-enterprise";
import { AgChartsEnterpriseModule } from 'ag-charts-enterprise';
import data from '../../../../mock-data/saleChannel.json';
import { useFetchJson } from "../call-typing-table/useFetch";
import {
  ClientSideRowModelModule,
  ModuleRegistry,
  ValidationModule,
  NumberFilterModule
} from "ag-grid-community";
import {
  ColumnMenuModule,
  ColumnsToolPanelModule,
  ContextMenuModule,
  FiltersToolPanelModule,
  PivotModule,
  RowGroupingPanelModule,
  SetFilterModule
} from "ag-grid-enterprise";
import { Radio } from "antd";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ColumnsToolPanelModule,
  ColumnMenuModule,
  ContextMenuModule,
  PivotModule,
  SetFilterModule,
  NumberFilterModule,
  FiltersToolPanelModule,
  RowGroupingPanelModule,
  ...[ValidationModule],
]);




ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  IntegratedChartsModule.with(AgChartsEnterpriseModule)
]);

const SalesChannelTable = () => {

  const [optionSelected, setIOptionSelected] = useState('a');
  const [columnDefsChats] = useState([
    { field: "month", headerName: 'Mes', rowGroup: true, hide: true, filter: 'agSetColumnFilter', filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows' } },
    { field: "week", headerName: 'Semana', rowGroup: true, hide: true, filter: 'agSetColumnFilter', filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows' } },
    { field: "date", headerName: 'Fecha', filter: 'agSetColumnFilter', filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows' } },
    { field: "facebook_instagram", headerName: "Facebook/Instagram", filter: "agNumberColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows',treeList: true, } },
    { field: "mailing", headerName: "Mailing", filter: "agNumberColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows',treeList: true, }  },
    { field: "sms", headerName: "SMS", filter: "agNumberColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows',treeList: true, } },
    { field: "grand_total", headerName: "Grand Total", filter: "agNumberColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows',treeList: true, } },
  ]);

  const [columnDefsCalls] = useState([
    { field: "month", headerName: 'Mes', rowGroup: true, hide: true },
    { field: "week", headerName: 'Semana', rowGroup: true, hide: true },
    { field: "date", headerName: 'Fecha' },
    { field: "facebook_instagram", headerName: "Facebook/Instagram", filter: "agNumberColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows',treeList: true, } },
    { field: "google", headerName: "Google", filter: "agNumberColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows',treeList: true, } },
    { field: "mailing", headerName: "Mailing", filter: "agNumberColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows',treeList: true, } },
    { field: "radio_america", headerName: "Radio America", filter: "agNumberColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows',treeList: true, } },
    { field: "web_reserve", headerName: "Web service", filter: "agNumberColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows',treeList: true, } },
    { field: "sms", headerName: "SMS", filter: "agNumberColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows',treeList: true, } },
    { field: "tiktok", headerName: "Tiktok", filter: "agNumberColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows',treeList: true, } },
    { field: "whatsApp", headerName: "WhatsApp", filter: "agNumberColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows',treeList: true, } },
    { field: "grand_total", headerName: "Grand Total", filter: "agNumberColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows',treeList: true, } },
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
    <div className="flex flex-col items-center w-full h-full gap-3 ">
      <Radio.Group defaultValue="a" size="small" buttonStyle="solid" className="mb-4">
        <Radio.Button value="a" onClick={() => setIOptionSelected('a')}>ODV Chats</Radio.Button>
        <Radio.Button value="b" onClick={() => setIOptionSelected('b')}>ODV Llamadas</Radio.Button>
      </Radio.Group>
      <div className="ag-theme-alpine w-full h-full">
        <AgGridReact
          rowData={optionSelected === 'a' ? data.odv_chats : data.odv_calls}
          loading={loading}
          columnDefs={optionSelected === 'a' ? columnDefsChats : columnDefsCalls}
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



export default SalesChannelTable