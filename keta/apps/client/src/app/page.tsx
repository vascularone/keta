import { Suspense } from "react";
import { useGetUsersQuery } from "../requests/users";
import { getAresMasterQuery } from "../requests/ares_master";
import { Loading } from "../ui/loading/loading";
export default async function Index() {

  const { data } = await useGetUsersQuery({select: {
    id: true,
    name: true,
  }})

  const { data: aresData } = await getAresMasterQuery()

  return (
   <Suspense fallback={<Loading />}>
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

