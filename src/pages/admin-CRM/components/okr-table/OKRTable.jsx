import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AgGridReact } from "ag-grid-react";
import datas from "../../../../mock-data/okrData.json";
import { IntegratedChartsModule } from "ag-grid-enterprise";
import { AgChartsEnterpriseModule } from "ag-charts-enterprise";
/* import dayjs from "dayjs"; */
import { Button, Radio } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import "./OKRTable.css";
import {
  ClientSideRowModelModule,
  ModuleRegistry,
  ValidationModule,
  NumberFilterModule,
  RowStyleModule,
  CellStyleModule,
  PinnedRowModule,
  themeBalham,
  iconSetQuartzLight,
  RenderApiModule,
} from "ag-grid-community";
import {
  ColumnMenuModule,
  ColumnsToolPanelModule,
  ContextMenuModule,
  FiltersToolPanelModule,
  PivotModule,
  RowGroupingPanelModule,
  SetFilterModule,
  ExcelExportModule,
  StatusBarModule,
  ClipboardModule,
} from "ag-grid-enterprise";
import { getOKR } from "../../../../api/adminCRMService";
import { DatePicker } from "antd";
import { getDiasDelMes } from "../../../../utils/countDaysMonth";
/* import { set } from "react-hook-form"; */
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ColumnsToolPanelModule,
  ColumnMenuModule,
  ContextMenuModule,
  PivotModule,
  SetFilterModule,
  RowStyleModule,
  CellStyleModule,
  NumberFilterModule,
  FiltersToolPanelModule,
  RowGroupingPanelModule,
  ExcelExportModule,
  PinnedRowModule,
  StatusBarModule,
  RenderApiModule,
  ClipboardModule,

  ...[ValidationModule],
]);

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  IntegratedChartsModule.with(AgChartsEnterpriseModule),
]);
const { RangePicker } = DatePicker;
const plainOptions = ["Rango", "Mes"];
const myTheme = themeBalham.withPart(iconSetQuartzLight).withParams({
  columnBorder: true
});

const OKRTable = () => {
  const [selectDate, setSelectDate] = useState("Rango");
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100vh", width: "100%" }), []);
  const [loading, setLoading] = useState(false);
  const [dataOKR, setDataOKR] = useState([]);
  const enableCharts = true;
  const cellSelection = true;
  const gridRef = useRef();
  const [callColorRuleAI, setcallColorRuleAI] = useState();
  const [callColorRuleNI, setcallColorRuleNI] = useState();

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "team",
      headerName: "Team",
      filter: "agSetColumnFilter",
      enableValue: true,
      filterParams: {
        excelMode: "windows",
        treeList: true,
      },
      width: 30
    },
    {
      field: "agent",
      headerName: "Agente",
      filter: "agSetColumnFilter",
      enableValue: true,
      filterParams: {
        excelMode: "windows",
        treeList: true,
      },
    },
    {
      field: "odv_audited",
      headerName: "ODV auditado",
      filter: "agNumberColumnFilter",
      enableValue: true,
      filterParams: {
        applyMiniFilterWhileTyping: true,
        excelMode: "windows",
        treeList: true,
      },
    },
    {
      field: "calls",
      headerName: "Llamadas",
      filter: "agNumberColumnFilter",
      enableValue: true,
      filterParams: {
        applyMiniFilterWhileTyping: true,
        excelMode: "windows",
        treeList: true,
      },
    },
    {
      field: "percentage_calls_odv",
      headerName: "% llamadas que son ODV",
      filter: "agNumberColumnFilter",
      enableValue: true,
      filterParams: {
        applyMiniFilterWhileTyping: true,
        excelMode: "windows",
        treeList: true,
      },
      valueFormatter: (params) => {
        const value = params.value;
        return value != null ? `${value}%` : "";
      },
    },
    {
      field: "oc",
      headerName: "OC",
      filter: "agNumberColumnFilter",
      enableValue: true,
      filterParams: {
        applyMiniFilterWhileTyping: true,
        excelMode: "windows",
        treeList: true,
      },
    },
    {
      field: "rdo",
      headerName: "RDO",
      filter: "agNumberColumnFilter",
      enableValue: true,
      filterParams: {
        applyMiniFilterWhileTyping: true,
        excelMode: "windows",
        treeList: true,
      },
      valueFormatter: (params) => {
        const value = params.value;
        return value != null ? `${value}%` : "";
      },
      cellClassRules: {
        "rdo-red": "x <= 24.99",
        "rdo-orange": "x >= 25 && x <= 29.99",
        "rdo-yellow": "x >= 30 && x <= 39.99",
        "rdo-green": "x >= 40",
      },
    },
    {
      field: "ipc",
      headerName: "IPC",
      filter: "agNumberColumnFilter",
      enableValue: true,
      filterParams: {
        applyMiniFilterWhileTyping: true,
        excelMode: "windows",
        treeList: true,
      },

    },
    {
      field: "ipc_oc",
      headerName: "IPC/OC",
      filter: "agNumberColumnFilter",
      enableValue: true,
      filterParams: {
        applyMiniFilterWhileTyping: true,
        excelMode: "windows",
        treeList: true,
      },
    },
    {
      field: "commission",
      headerName: "Comision",
      filter: "agNumberColumnFilter",
      enableValue: true,
      filterParams: {
        applyMiniFilterWhileTyping: true,
        excelMode: "windows",
        treeList: true,
      },
      valueFormatter: (params) => {
        const value = params.value;
        return value != null ? `$${value.toFixed(2)}` : "";
      },
    },
    {
      field: "acb_average",
      headerName: "ACB Promedio",
      filter: "agNumberColumnFilter",
      enableValue: true,
      filterParams: {
        applyMiniFilterWhileTyping: true,
        excelMode: "windows",
        treeList: true,
      },
      valueFormatter: (params) => {
        const value = params.value;
        return value != null ? `$${value.toFixed(2)}` : "";
      },
    },
    {
      field: "odv_log",
      headerName: "ODV en Log",
      filter: "agNumberColumnFilter",
      enableValue: true,
      filterParams: {
        applyMiniFilterWhileTyping: true,
        excelMode: "windows",
        treeList: true,
      },
    },

    {
      field: "percentage_odv_log",
      headerName: "% ODV en Log",
      filter: "agNumberColumnFilter",
      enableValue: true,
      filterParams: {
        applyMiniFilterWhileTyping: true,
        excelMode: "windows",
        treeList: true,
      },
      valueFormatter: (params) => {
        const value = params.value;
        return value != null ? `${value}%` : "";
      },
      cellClassRules: {
        "odv-log-red": "x <= 79.99",
        "odv-log-yellow": "x >= 80 && x <= 89.499",
        "odv-log-green": "x >= 89.5",
      },
    },
    {
      field: "agent_type",
      headerName: "Tipo Agente",
      minWidth: 50,
      filter: "agSetColumnFilter",
      enableValue: true,
      filterParams: {
        applyMiniFilterWhileTyping: true,
        excelMode: "windows",
        treeList: true,
      },
    },
    {
      field: "month_label",
      headerName: "Mes",
      minWidth: 50,
      filter: "agSetColumnFilter",
      enableValue: true,
      filterParams: {
        applyMiniFilterWhileTyping: true,
        excelMode: "windows",
        treeList: true,
      },
      hide: true
    },
    {
      field: "week_label",
      headerName: "Semana",
      minWidth: 50,
      filter: "agSetColumnFilter",
      enableValue: true,
      filterParams: {
        applyMiniFilterWhileTyping: true,
        excelMode: "windows",
        treeList: true,
      },
      rowGroup: true,
      hide: true
    },
  ]);

  const excelStyles = [
    {
      id: "rdo-red",
      interior: {
        color: "#fb0016",
        pattern: "Solid",
      },
    },
    {
      id: "rdo-orange",
      interior: {
        color: "#F4CCCC",
        pattern: "Solid",
      },
    },
    {
      id: "rdo-yellow",
      interior: {
        color: "#FFFF00",
        pattern: "Solid",
      },
    },
    {
      id: "rdo-green",
      interior: {
        color: "#D3E4CD",
        pattern: "Solid",
      },
    },
    {
      id: "odv-log-red",
      interior: {
        color: "#fb0016",
        pattern: "Solid",
      },
    },
    {
      id: "odv-log-yellow",
      interior: {
        color: "#FFFF00",
        pattern: "Solid",
      },
    },
    {
      id: "odv-log-green",
      interior: {
        color: "#D3E4CD",
        pattern: "Solid",
      },
    },
    {
      id: "call-orange",
      interior: {
        color: "#FF9900",
        pattern: "Solid",
      },
    },
    {
      id: "call-green",
      interior: {
        color: "#D3E4CD",
        pattern: "Solid",
      },
    },
    {
      id: "call-yellow",
      interior: {
        color: "#FFFF00",
        pattern: "Solid",
      },
    },
    {
      id: "call-red",
      interior: {
        color: "#fb0016",
        pattern: "Solid",
      },
    },
  ];
  const sideBar = useMemo(() => {
    return {
      toolPanels: [
        {
          id: "columns",
          labelDefault: "Columns",
          labelKey: "columns",
          iconKey: "columns",
          toolPanel: "agColumnsToolPanel",
        },
        {
          id: "filters",
          labelDefault: "Filters",
          labelKey: "filters",
          iconKey: "filter",
          toolPanel: "agFiltersToolPanel",
        },
      ],

    };
  }, []);
  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      enableValue: true,
      enableRowGroup: true,
      enablePivot: true,
      floatingFilter: true,
    }),
    []
  );
  const autoGroupColumnDef = useMemo(
    () => ({
      width: 130,
      pinned: "left",

    }),
    []
  );

  useEffect(() => {
    getOKRData();
  }, []);

  const getOKRData = async (startDate, endDate) => {
    setDataOKR([]);
/*     setDataOKR(datas);
    filterAgentType(datas, "AI");
    filterAgentType(datas, "NI"); */
    setLoading(true);
    try {
      const response = await getOKR(startDate, endDate);

      setDataOKR(response.data);
      filterAgentType(response.data, "AI");
      filterAgentType(response.data, "NI");
    } catch (error) {
      console.error("Error al obtener datos:", error);
    } finally {
      setLoading(false);
    }
  };

  const onChangeRange = (date, dateString) => {
    getOKRData(dateString[0], dateString[1]);
  };

  const onChangeMonth = (date, dateString) => {
    const days = getDiasDelMes(date.month(), date.year()); // Contar dias de un mes
    getOKRData(dateString.concat("-01"), dateString.concat("-" + days));
  };

  const onChangeSelect = ({ target: { value } }) => {
    setSelectDate(value);
  };

  const onBtExport = useCallback(() => {
    gridRef.current.api.exportDataAsExcel();
  }, []);

  const totalRow = useMemo(() => {
    const totalODV = dataOKR.reduce((acc, row) => acc + row.odv_audited, 0);
    const totalCall = dataOKR.reduce((acc, row) => acc + row.calls, 0);
    const totalOC = dataOKR.reduce((acc, row) => acc + row.oc, 0);
    const totalIPCOC = dataOKR.reduce((acc, row) => acc + row.ipc_oc, 0);
    const totalODVLOG = dataOKR.reduce((acc, row) => acc + row.odv_log, 0);

    return [
      {
        name: "Total",
        odv_audited: totalODV,
        calls: totalCall,
        oc: totalOC,
        ipc_oc: parseFloat(totalIPCOC.toFixed(2)),
        odv_log: totalODVLOG,
      },
    ];
  }, [dataOKR]);

  const statusBar = useMemo(() => {
    return {
      statusPanels: [
        { statusPanel: "agTotalAndFilteredRowCountComponent" },
        { statusPanel: "agTotalRowCountComponent" },
        { statusPanel: "agFilteredRowCountComponent" },
        { statusPanel: "agSelectedRowCountComponent" },
        { statusPanel: "agAggregationComponent" },
      ],
    };
  }, []);

  const filterAgentType = (data, agent_type) => {
    if (!Array.isArray(data) || !agent_type) {
      console.warn("Datos inválidos");
      return;
    }

    const dataFilter = data.filter((d) => d.agent_type === agent_type);

    if (dataFilter.length === 0) {
      console.warn("No hay datos para el tipo de agente:", agent_type);
      return;
    }

    // Agrupar por semana
    const groupedByWeek = dataFilter.reduce((acc, item) => {
      const { week, calls = 0 } = item;
      if (!acc[week]) {
        acc[week] = [];
      }
      acc[week].push(calls);
      return acc;
    }, {});

    // Calcular reglas por semana
    const colorRulesByWeek = Object.entries(groupedByWeek).reduce((acc, [week, callsArray]) => {
      const total = callsArray.reduce((sum, c) => sum + c, 0);
      const avg = total / callsArray.length;

      acc[week] = {
        orange: Math.round(avg * 1.2),
        green: Math.round(avg * 0.9),
        yellow: Math.round(avg * 0.8),
        red: Math.round(avg * 0.8) - 0.1,
      };

      return acc;
    }, {});

    // Guardar en el estado correspondiente
    if (agent_type === 'AI') {
      setcallColorRuleAI(colorRulesByWeek);
    } else {
      setcallColorRuleNI(colorRulesByWeek);
    }

    console.log("Hola", callColorRuleAI)
  };

  useEffect(() => {
    setColumnDefs((prevDefs) =>
      prevDefs.map((col) => {
        if (col.field !== "calls") return col;

        return {
          ...col,
          cellClassRules: {
            "call-orange": (params) => {
              const rules = params.data?.agent_type === 'AI' ? callColorRuleAI : callColorRuleNI;
              const week = params.data?.week;
              const thresholds = rules?.[week];
              return thresholds && params.value >= thresholds.orange && params.value < 300;
            },
            "call-green": (params) => {
              const rules = params.data?.agent_type === 'AI' ? callColorRuleAI : callColorRuleNI;
              const week = params.data?.week;
              const thresholds = rules?.[week];
              return thresholds && params.value >= thresholds.green && params.value < thresholds.orange;
            },
            "call-yellow": (params) => {
              const rules = params.data?.agent_type === 'AI' ? callColorRuleAI : callColorRuleNI;
              const week = params.data?.week;
              const thresholds = rules?.[week];
              return thresholds && params.value >= thresholds.yellow && params.value < thresholds.green;
            },
            "call-red": (params) => {
              const rules = params.data?.agent_type === 'AI' ? callColorRuleAI : callColorRuleNI;
              const week = params.data?.week;
              const thresholds = rules?.[week];
              return thresholds && params.value >= 0 && params.value < thresholds.yellow;
            },
          },
        };
      })
    );
  }, [callColorRuleAI]);


  return (
    <div style={containerStyle}>
      <Radio.Group
        options={plainOptions}
        onChange={onChangeSelect}
        value={selectDate}
      />
      <div className="my-1">
        {selectDate === "Rango" ? (
          <RangePicker
            onChange={onChangeRange}

          />
        ) : (
          <DatePicker onChange={onChangeMonth} picker="month" />
        )}
        <Button
          type="primary"
          onClick={onBtExport}
          icon={<DownloadOutlined />}
          size={"small"}
          className="mx-2"
        />
      </div>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
          rowData={dataOKR}
          loading={loading}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          pivotMode={false}
          sideBar={sideBar}
          hiddenByDefault={true}
          pivotPanelShow={"always"}
          enableCharts={enableCharts}
          cellSelection={cellSelection}
          pinnedTopRowData={totalRow}
          theme={myTheme}
          statusBar={statusBar}
          excelStyles={excelStyles}
          copyHeadersToClipboard={true}
        />
      </div>
    </div>
  );
};

export default OKRTable;
