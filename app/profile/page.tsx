"use client";
import ProfileForm from "@/components/Forms/ProfileForm";
import { useAuth } from "@/hooks/useAuth";
import { useStore } from "@/lib/store-context";
import { useGetClientData } from "@/services/clients/getClientData";
import { UserData } from "@/types/mock.interface";
import { mapClientToUserData } from "@/utils/mappedClientToUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [editSection, setEditSection] = useState<
    "personal" | "addresses" | "cards" | null
  >(null);

  const router = useRouter();
  const { user, logout } = useAuth();
  const { data: clientData } = useGetClientData(user?.id ?? "");
  const [loading, setLoading] = useState(true);

  const [loggedUser, setLoggedUser] = useState<UserData>();
  useEffect(() => {
    if (clientData) {
      const mapClient = mapClientToUserData(clientData.client);
      console.log(mapClient);
      setLoggedUser(mapClient);
      setLoading(false);
    }
  }, [clientData]);
  const saveUser = (user: UserData) => {
    localStorage.setItem("bookstore-user", JSON.stringify(user));
    setLoggedUser(user);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };
  return loading ? (
    <p>Carregando...</p>
  ) : (
    <ProfileForm
      loggedUser={loggedUser}
      editSection={editSection}
      setEditSection={setEditSection}
      onSave={saveUser}
      onLogout={handleLogout}
      isPageProfile={true}
    />
  );
};

export default ProfilePage;
