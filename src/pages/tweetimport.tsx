import React, { useState } from 'react';

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import Link from 'next/link'
import Layout from '../components/layout/Layout';
import Input from '../inputs/input/Input';

import { useTable } from 'react-table'

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const TweetsV2Page = () => {
  const [statuses, setStatuses] = useState();
  const columns = React.useMemo(
    () => [
      {
        Header: 'Results',
        columns: [
          {
            Header: 'id',
            accessor: 'id',
          },
          {
            Header: 'text',
            accessor: 'text',
          },
        ],
      },
    ],
    []
  )

  // const data = React.useMemo(() => makeData(20), [])

  async function handleOnSearchSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const query = formData.get('query');

    const results = await fetch('/api/twitter/searchv2', {
      method: 'POST',
      body: JSON.stringify({
        query
      })
    }).then(res => res.json());

    setStatuses(results.data); 
  }

  return (
    <Layout title="About | Next.js + TypeScript Example">
      <h1>Tweets </h1>
      <form onSubmit={handleOnSearchSubmit}>
        <h2>Search</h2>
        <Input type="search" name="query" />
        <button>Search</button>
       </form>
       
      {statuses && (
        <Table columns={columns} data={statuses} />
    )}
    </Layout>
  )
}


export default TweetsV2Page