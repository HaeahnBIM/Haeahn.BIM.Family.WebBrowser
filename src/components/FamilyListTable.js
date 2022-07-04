import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { AutoSizer, Column, Table } from "react-virtualized";

const FamilyListTable = () => {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <Table
          height={height}
          width={width}
          rowHeight={25}
          gridStyle={{
            direction: "inherit",
          }}
          headerHeight={25}
          rowClassName={this.getRowClassName}
        >
          <Column label="Name" dataKey="name" width={200} />
          <Column width={300} label="Description" dataKey="description" />
        </Table>
      )}
    </AutoSizer>
  );
};

export default FamilyListTable;
