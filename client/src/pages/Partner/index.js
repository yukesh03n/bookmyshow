import { Tabs } from 'antd';
import React from 'react'
import TheatreList from './TheatreList';

function Partner() {

    const tabItems  = [
        {key:"1", label:"Theatres", children:<TheatreList />},
    ];

  return (
    <div>
        <h1>Partner</h1>
        <Tabs items={tabItems} />
    </div>
  )
}

export default Partner