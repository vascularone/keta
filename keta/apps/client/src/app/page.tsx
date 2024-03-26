import { Test } from "./components/test/test";
import { useGetUsersQuery } from "./requests/users";

export default async function Index() {
  const { data, error, loading } = await useGetUsersQuery({
    select: {
      id: true,
      name: true
    }
  })

  if(error) return <div>Error while fetching users</div>
  return (
   <div>
    {loading ? <div>loading</div> : <div>{data?.map((user) => <div key={user.id}>{user.id} / {user.name} / {user.surname} </div>)}</div>}
    <Test />
   </div>
  );
}

