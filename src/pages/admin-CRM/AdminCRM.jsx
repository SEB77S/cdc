import { useEffect, useState } from "react";
import "./AdminCRM.css";
import CallTypingTable from "./components/call-typing-table/CallTypingTable";
import SalesChannelTable from "./components/sales-channel-table/SalesChannelTable";
import OpportunityManagementTable from "./components/opportunity-management-table/OpportunityManagementTable";
import OKRTable from "./components/okr-table/OKRTable";
import PersonalizeTable from "./components/personalize-table/PersonalizeTable";
import { useLocation } from "react-router-dom";

function AdminCRM() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const [optionName, setOptionName] = useState(id);
  const componentsMap = {
    1: <CallTypingTable />,
    2: <SalesChannelTable />,
    3: <OKRTable />,
    4: <OpportunityManagementTable />,
    5: <PersonalizeTable />,
  };

  useEffect(() => {
    setOptionName(id);
  }, [id]);

  return (
    <div>
      <div className="h-200">{componentsMap[optionName]}</div>
    </div>
  );
}

export default AdminCRM;
