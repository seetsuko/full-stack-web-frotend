'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import productsData from "./sample/dummy_products.json"

type ProductsData = {
  id: number
  name: string
  price: number
  description: string
}

export default function Page() {

  const [ data, setData ] = useState<Array<ProductsData>>([])
  const [ shownNewRow, setShownNewRow ] = useState(false)

  useEffect(()=>{
    setData(productsData)
  },[])

  const handleShowNewRow = () =>  { 
    setShownNewRow(true)
  }

  const handleAddCancel = () =>  { 
    setShownNewRow(false)
  }

  const handleAdd = () =>  { 
    setShownNewRow(false)
  }

  return (
    <div>
      <h2>商品一覧</h2>
      <button onClick={ handleShowNewRow }>商品を追加する</button>
      <table>
        <thead>
          <tr>
            <th>商品ID</th>
            <th>商品名</th>
            <th>単価</th>
            <th>説明</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {shownNewRow ? (
            <tr>
              <td></td>
              <td><input type='text'/></td>
              <td><input type='number'/></td>
              <td><input type='text'/></td>
              <td></td>
              <td>
                <button onClick={ handleAddCancel }>キャンセル</button>
                <button onClick={ handleAdd }>登録する</button>
              </td>
            </tr>
          ):"" }
          {data.map((data:any)=>(
            <> 
              {/* TODO:更新・削除ボタンを押したら表示しない */}
              <tr key={data.id}>
                <td>{data.id}</td>
                <td><input type='text' defaultValue={data.name}/></td>
                <td><input type='number' defaultValue={data.price}/></td>
                <td><input type='text' defaultValue={data.description}/></td>
                <td></td>
                <td>
                  <button>更新する</button>
                  <button>削除する</button>
                </td>
              </tr>
              {/* TODO:更新・削除ボタンを押したら表示させる */}
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.price}</td>
                <td>{data.description}</td>
                <td><Link href={`/inventory/products/${data.id}`}>在庫処理</Link></td>
                <td><button>更新・削除</button></td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

