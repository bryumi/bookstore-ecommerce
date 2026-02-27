"use client";
import ProfileForm from "@/components/Forms/ProfileForm";
import { useStore } from "@/lib/store-context";
import { UserData } from "@/types/mock.interface";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ProfilePage = () => {
  const [editSection, setEditSection] = useState<
    "personal" | "addresses" | "cards" | null
  >(null);

  const { loggedUser, setLoggedUser } = useStore();
  const router = useRouter();

  if (!loggedUser) {
    return <div>Loading...</div>;
  }
  const saveUser = (user: UserData) => {
    localStorage.setItem("bookstore-user", JSON.stringify(user));
    setLoggedUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("bookstore-user");
    setLoggedUser(null);
    router.push("/");
  };
  return (
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
