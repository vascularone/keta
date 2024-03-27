import { Suspense } from "react";
import { Test } from "../components/test/test";
import { useGetUsersQuery } from "../requests/users";
import { getAresMasterQuery } from "../requests/ares_master";

export default async function Index() {

  const { data } = await useGetUsersQuery({select: {
    id: true,
    name: true,
  }})

  const { data: aresData } = await getAresMasterQuery()

  return (
   <Suspense fallback={<div>Loading</div>}>
    <div>
    <Test />
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

