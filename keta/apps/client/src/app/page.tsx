import { Test } from "../components/test/test";
import { useGetUsersQuery } from "../requests/users";

export default async function Index() {

  const { data } = await useGetUsersQuery({select: {
    id: true,
    name: true,
  }})
  return (
   <div>
    <Test />
    {data?.map((user) => {
      return <div key={user.id}>{user.name}</div>
    })}
   </div>
  );
}

