import React, {useState} from 'react';
import {Checkbox, Segment} from 'semantic-ui-react';
import {Column, Table, AutoSizer, SortDirection} from 'react-virtualized';
import _ from 'lodash';
import "react-virtualized/styles.css";

const list = [
  {
    id: 1001,
    code: 'TU101',
    title: 'test one',
    status: 'Approved',
    assigned: 'Test Person one',
  },
  {
    id: 1002,
    code: 'TU102',
    title: 'test two',
    status: 'Approved',
    assigned: 'Test Person',
  },
  {
    id: 1003,
    code: 'TU103',
    title: 'test three',
    status: 'Approved',
    assigned: 'Test Person two',
  },
  {
    id: 1004,
    code: 'TU104',
    title: 'test four',
    status: 'Approved',
    assigned: 'Test Person zero',
  },
  {
    id: 1005,
    code: 'TU104',
    title: 'test four',
    status: 'Approved',
    assigned: 'Test Person zero',
  },
];

export default function EditableList() {
  const [sortBy, setSortBy] = useState("id");
  const [sortDirection, setSortDirection] = useState("DESC");
  const [sortedList, setSortedList] = useState(
    _sortList({ sortBy, sortDirection })
  );
  function _sortList() {
    const newList = _.sortBy(list, [sortBy]);
    if (sortDirection === SortDirection.DESC) {
      newList.reverse();
    }
    return newList;
  }

  function _sort() {
    setSortBy(sortBy);
    setSortDirection(sortDirection);
    setSortedList(_sortList({ sortBy, sortDirection }));
  }

  function _headerRenderer() {
    return (
      <div>
        <Checkbox />
      </div>
    );
  }
  function _rowRenderer({
    key, // Unique key within array of rows
    index // Index of row within collection
  }) {
    return (
      <div
        key={key}
        className="ReactVirtualized__Table__row"
        role="row"
        style={{
          height: "40px",
          width: "800px",
          overflow: "hidden",
          paddingRight: "12px"
        }}
      >
        {
          <>
            <div
              className="ReactVirtualized__Table__rowColumn"
              role="gridcell"
              style={{ overflow: "hidden", flex: "0 1 100px" }}
            >
              <Checkbox />
            </div>
            <div
              className="ReactVirtualized__Table__rowColumn"
              role="gridcell"
              style={{ overflow: "hidden", flex: "0 1 200px" }}
            >
              {list[index].id}
            </div>
            <div
              className="ReactVirtualized__Table__rowColumn"
              role="gridcell"
              style={{ overflow: "hidden", flex: "0 1 300px" }}
            >
              {list[index].code}
            </div>
            <div
              className="ReactVirtualized__Table__rowColumn"
              role="gridcell"
              style={{ overflow: "hidden", flex: "0 1 300px" }}
            >
              {list[index].title}
            </div>
            <div
              className="ReactVirtualized__Table__rowColumn"
              role="gridcell"
              style={{ overflow: "hidden", flex: "0 1 300px" }}
            >
              {list[index].status}
            </div>
            <div
              className="ReactVirtualized__Table__rowColumn"
              role="gridcell"
              style={{ overflow: "hidden", flex: "0 1 300px" }}
            >
              {list[index].assigned}
            </div>
          </>
        }
      </div>
    );
  }
  return (
    <>
      <Segment basic />
      <div style={{ height: 300 }}>
        <AutoSizer>
          {() => (
            <Table
              width={800}
              height={300}
              headerHeight={30}
              rowHeight={40}
              sort={_sort}
              sortBy={sortBy}
              sortDirection={sortDirection}
              rowCount={sortedList.length}
              rowGetter={({ index }) => sortedList[index]}
              rowRenderer={({ key, index }) => _rowRenderer({ key, index })}
            >
              <Column
                dataKey="checkbox"
                headerRenderer={_headerRenderer}
                width={100}
              />
              <Column label="ID" dataKey="id" width={200} />
              <Column width={300} label="Code" dataKey="code" />
              <Column width={300} label="Title" dataKey="title" />
              <Column width={300} label="Status" dataKey="status" />
              <Column width={300} label="Assigned" dataKey="assigned" />
            </Table>
          )}
        </AutoSizer>
      </div>
    </>
  );
}
