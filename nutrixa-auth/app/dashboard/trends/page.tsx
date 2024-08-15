import React from 'react'
import WeightGraph from './weight-trend/weightgraph.js'


export default function Trends()
{
   return(
    <main>
        <h1>
            Trends
            <div style={{ width: '50vw', height: '50vh', padding: '20px' }}>
            <WeightGraph />
            </div>
        </h1>
    </main>
)
}