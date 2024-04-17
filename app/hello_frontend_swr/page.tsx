"use client"

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json())

const page = () => {

  const { data, error } = useSWR("/api/hello", fetcher)

  if(error) return <div>エラー</div>
  if(!data) return <div>よみこみ中</div>

  return (
    <div>
      Hello! {data.name}
    </div>
  );
}

export default page;