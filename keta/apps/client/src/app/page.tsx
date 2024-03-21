import { GET } from "./api/hello/route";

export default function Index() {
  GET({select: { id: true }})
  return (
   <div>
    haha
   </div>
  );
}
