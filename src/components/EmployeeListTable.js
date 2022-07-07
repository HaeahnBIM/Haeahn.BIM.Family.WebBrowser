import React, { useState, useEffect } from "react";
import { Checkbox, Segment } from "semantic-ui-react";
import { Column, Table, AutoSizer, SortDirection } from "react-virtualized";
import clsx from "clsx";
import TableCell from "@mui/material/TableCell";
import _ from "lodash";
import "react-virtualized/styles.css";

const classes = {
  flexContainer: "ReactVirtualizedDemo-flexContainer",
  tableRow: "ReactVirtualizedDemo-tableRow",
  tableRowHover: "ReactVirtualizedDemo-tableRowHover",
  tableCell: "ReactVirtualizedDemo-tableCell",
  noClick: "ReactVirtualizedDemo-noClick",
};

// Table data as a array of objects
let list = [];
for (let i = 0; i < 1000; i++) {
  list.push({
    key: i,
    name: `${i} Brian Vaughn`,
    description: "Software engineer",
  });
}

export default function EditableList() {
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("ASC");
  const [sortedList, setSortedList] = useState([]);

  useEffect(() => {
    setSortedList(_sortList(sortBy, sortDirection));
  }, []);

  const columns = [
    {
      width: 200,
      label: "key",
      dataKey: "key",
    },
    {
      width: 200,
      label: "name",
      dataKey: "name",
    },
    {
      width: 200,
      label: "description",
      dataKey: "description",
    },
  ];

  const headerHeight = 20;
  const rowHeight = 20;

  const _sortList = ({ sortBy, sortDirection }) => {
    let newList = _.sortBy(list, [sortBy]);
    if (sortDirection === SortDirection.DESC) {
      newList.reverse();
    }
    return newList;
  };

  const _sort = ({ sortBy, sortDirection }) => {
    const sortedList = this._sortList({ sortBy, sortDirection });
    this.setState({ sortBy, sortDirection, sortedList });
  };

  const handleCellClick = (event) => {
    console.log("const handleCellClick = (event)", event.target);
  };

  const cellRenderer = ({ cellData, columnIndex }) => {
    // const { columns, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer)}
        variant="body"
        style={{ height: rowHeight }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? "right"
            : "left"
        }
        onClick={handleCellClick}
      >
        {cellData}
      </TableCell>
    );
  };

  const headerRenderer = ({ label, columnIndex }) => {
    //const { headerHeight, columns } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick
        )}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? "right" : "left"}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  return (
    <div style={{ height: 400 }}>
      <AutoSizer>
        {({ height, width }) => (
          <Table
            width={width}
            height={height}
            headerHeight={20}
            rowHeight={30}
            sort={_sort}
            sortBy={sortBy}
            sortDirection={sortDirection}
            rowCount={sortedList.length}
            rowGetter={({ index }) => sortedList[index]}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    </div>
  );
}
