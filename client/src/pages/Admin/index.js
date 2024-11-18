import React, { Children } from 'react'
import MovieList from './MovieList';
import TheatersTable from './TheatersTable';
import { Tabs } from 'antd';

function Admin() {

    const tabItems  = [
        {key:"1", label:"Movies", children:<MovieList />},
        {key:"2", label:"Theaters", children:<TheatersTable />},
    ];
    
  return (
    <div>
        <h1>Admin Page</h1>
        <Tabs items={tabItems} />
    </div>
  )
}

export default Admin