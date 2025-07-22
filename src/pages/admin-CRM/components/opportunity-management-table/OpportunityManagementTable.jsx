
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
import datas from '../../../../mock-data/opportunitiesData.json';
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

const OpportunityManagementTable = () => {
    const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

    const [columnDefs] = useState([
        { field: "team", headerName: 'Team', filter: "agSetColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows', treeList: true, } },
        { field: "agent", headerName: 'Agente', filter: "agSetColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows', treeList: true, } },
        { field: "total", headerName: 'Total', filter: "agSetColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows', treeList: true, } },
        { field: "opportunity_sale", headerName: 'Oportunidades Venta', filter: "agNumberColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows', treeList: true, } },
        { field: "opportunity_close", headerName: 'Oportunidades Cerradas', filter: "agNumberColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows', treeList: true, } },
        { field: "opportunity_lost", headerName: 'Oportunidades Perdidas', filter: "agNumberColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows', treeList: true, } },
        { field: "follow_up", headerName: 'En Seguimiento', filter: "agNumberColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows', treeList: true, } },
        { field: "future_client", headerName: 'Cliente Futuro', filter: "agNumberColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows', treeList: true, } },
        { field: "unworked_sales_opportunities", headerName: 'O. Venta NO Trabajadas', filter: "agNumberColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows', treeList: true, } },
        { field: "days_follow_up", headerName: 'Promedio Dias en seguimiento', filter: "agNumberColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows', treeList: true, } },
        { field: "closing_avarage", headerName: 'Promedio Cierre', filter: "agNumberColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows', treeList: true, } },
        { field: "lost_avarage", headerName: 'Promedio Perdida', filter: "agNumberColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows', treeList: true, } },
        { field: "date", headerName: 'Fecha', filter: "agNumberColumnFilter", filterParams: { applyMiniFilterWhileTyping: true, excelMode: 'windows', treeList: true, } },
        { field: "month", headerName: 'Mes',rowGroup: true, hide: true },
        { field: "week", headerName: '  Semana', rowGroup: true, hide: true },

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

    const { /* data, */ loading } = useFetchJson(
        "https://661ea73216358961cd92811d.mockapi.io/OpportunityManagementTable"
    );


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
                />
            </div>
        </div>
    );
};


export default OpportunityManagementTable