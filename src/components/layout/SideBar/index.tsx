import { supaServerClient } from "@/lib/supabase/createServerClient";
import SideBarBtn from "./SideBarBtn";

export default async function Sidebar() {
  const supabase = supaServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <SideBarBtn user={user} />
    </>
  );
}
