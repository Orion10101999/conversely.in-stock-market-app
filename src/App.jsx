import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const App = () => {
    const [stocks , setStocks] = useState([])
    const formateDate = (date) => {
        const d = new Date()
        const year = `${d.getFullYear()}`;
        const month = `0${d.getMonth()+1}`.slice(-2)
        const day = `0${d.getDay()}`.slice(-2)
        return `${year}-${month}-${day}`
    } 
    const currentDate = formateDate(new Date())
    useEffect(()=>{
        const fetchData = async () =>{
            const response = await fetch(`https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2024-06-01/${currentDate}?apiKey=SaqcnpFHhsaRRronsVjDQKGEKQvGxBqs`)
            const data = await response.json()
            console.log(data.results);
            setStocks(data.results || [])
        }
        fetchData()
    },[])
  return (
    <div>
        <h1 className='m-5'>Stock Market app</h1>
        <table className='min-w-full'>
            <thead>
                <tr>
                    <td className='border border-blue-500 border-collapse py-2 px-4'>close price</td>
                    <td className='border border-blue-500 border-collapse py-2 px-4'>heighest price </td>
                    <td className='border border-blue-500 border-collapse py-2 px-4'>lowest price</td>
                    <td className='border border-blue-500 border-collapse py-2 px-4'>No. of transactions</td>
                    <td className='border border-blue-500 border-collapse py-2 px-4'>open price</td>
                    <td className='border border-blue-500 border-collapse py-2 px-4'>timestamps</td>
                    <td className='border border-blue-500 border-collapse py-2 px-4'>trading volume</td>
                    <td className='border border-blue-500 border-collapse py-2 px-4'>volume weight</td>
                </tr>
            </thead>
            <tbody>
                {
                    stocks.map((stock,i)=>(
                        <tr key={i}>
                            <td className='border border-blue-500 border-collapse py-2 px-4'>{stock.c}</td>
                            <td className='border border-blue-500 border-collapse py-2 px-4'>{stock.h}</td>
                            <td className='border border-blue-500 border-collapse py-2 px-4'>{stock.l}</td>
                            <td className='border border-blue-500 border-collapse py-2 px-4'>{stock.n}</td>
                            <td className='border border-blue-500 border-collapse py-2 px-4'>{stock.o}</td>
                            <td className='border border-blue-500 border-collapse py-2 px-4'>{formateDate(stock.t)}</td>
                            <td className='border border-blue-500 border-collapse py-2 px-4'>{stock.v}</td>
                            <td className='border border-blue-500 border-collapse py-2 px-4'>{stock.vw}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>

    </div>
  )
}

export default App