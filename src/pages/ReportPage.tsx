import React from "react";
import { useReport } from "../features/user/hooks/useReport";
import { GlobalFilter } from "../constants/ui";

const ReportPage = () => {
  const { data: responseData } = useReport(GlobalFilter.DEFAULT_REPORT_FILTER);
  console.log(responseData);
  return <div>ReportPage</div>;
};

export default ReportPage;
