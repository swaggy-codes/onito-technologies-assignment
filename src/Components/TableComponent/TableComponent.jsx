import React, { useEffect, useRef } from "react";
import DataTables, { Config } from "datatables.net-dt";

function TableComponent(props) {
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);

  useEffect(() => {
    if (!dataTableRef.current) {
      const dt = new DataTables(tableRef.current, {
        ...props,
      });

      dataTableRef.current = dt;

      return () => {
        dt.destroy();
        dataTableRef.current = null;
      };
    }
  }, [props]);

  return <table ref={tableRef}></table>;
}

export default TableComponent;
