'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import Link from "next/link"
import productsData from "./sample/dummy_products.json"

type ProductsData = {
  id: number
  name: string
  price: number
  description: string
}

type InputData = {
  id: string
  name: string
  price: string
  description: string
}

export default function Page() {

  const [ data, setData ] = useState<Array<ProductsData>>([])
  const [ input, setInput ] = useState<InputData>({
    id: "",
    name: "",
    price: "",
    description: "",
  }) 
  const [ shownNewRow, setShownNewRow ] = useState(false)
  const [ editingRow, setEditingRow ] = useState(0)

  useEffect(()=>{
    setData(productsData)
  },[])

  const handleInput = (e:ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setInput({...input, [name]: value})
  }


  const handleShowNewRow = () =>  { 
    setShownNewRow(true)
  }

  const handleAddCancel = () =>  { 
    setShownNewRow(false)
  }

  const handleAdd = () =>  { 
    setShownNewRow(false)
  }

  const handleEditRow = (id: number) =>  { 
    setShownNewRow(false)
    setEditingRow(id)
    const selectedProduct: ProductsData = data.find((v) => v.id === id) as ProductsData
    setInput({
      id: id.toString(),
      name: selectedProduct.name,
      price: selectedProduct.price.toString(),
      description: selectedProduct.description,
    })
  }

  const handleEdit = () =>{
    setEditingRow(0)
  }

  const handleDelete = () =>{
    setEditingRow(0)
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
              <td><input type='text' name="name" onChange={handleInput}/></td>
              <td><input type='number' name="price" onChange={handleInput}/></td>
              <td><input type='text' name="description" onChange={handleInput}/></td>
              <td></td>
              <td>
                <button onClick={ handleAddCancel }>キャンセル</button>
                <button onClick={ handleAdd }>登録する</button>
              </td>
            </tr>
          ):"" }
          {data.map((data:any)=>(
            editingRow === data.id ? (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td><input type='text' value={data.name} name="name" onChange={handleInput}/></td>
                  <td><input type='number' value={data.price} name="price" onChange={handleInput}/></td>
                  <td><input type='text' value={data.description} name="description" onChange={handleInput}/></td>
                  <td></td>
                  <td>
                    <button onClick={handleEdit}>更新する</button>
                    <button onClick={handleDelete}>削除する</button>
                  </td>
                </tr>
              ):(
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.price}</td>
                  <td>{data.description}</td>
                  <td><Link href={`/inventory/products/${data.id}`}>在庫処理</Link></td>
                  <td><button onClick={() => handleEditRow(data.id)}>更新・削除</button></td>
                </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
}

