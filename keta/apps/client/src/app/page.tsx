import { Suspense } from "react";
import { Loading } from "@keta/ui";
import { useGetUsersQuery } from "../requests/users";
import { getAresMasterQuery } from "../requests/ares_master";
import { Test } from "../components/test/test";
export default async function Index({params}: {params: { uname: string }}) {

  const { data } = await useGetUsersQuery({select: {
    id: true,
    name: true,
  }})
  console.log('params', params.uname)

  const { data: aresData } = await getAresMasterQuery()

  return (
   <Suspense fallback={<Loading />}>
   <Test />
    ------------------------------------------
    <div>
    {data?.map((user) => {
      return <div key={user.id}>{user.name}</div>
    })}
    -------------------------------------
    {aresData?.map((ares) => {
      return <div key={ares.id}>{ares.name}</div>
    })}
   </div>
   </Suspense>
  );
}

