"use client";
import ProfileForm from "@/components/Forms/ProfileForm";
import { useAuth } from "@/hooks/useAuth";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useStore } from "@/lib/store-context";
import { useGetClientData } from "@/services/clients/getClientData";
import { useUpdateClient } from "@/services/clients/updateClient";
import { UserData } from "@/types/mock.interface";
import { mapClientToUserData } from "@/utils/mappedClientToUser";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [isEdit, setIsEdit] = useState(false);

  const router = useRouter();
  const { user, logout } = useAuth();
  const { data: clientData, isLoading } = useGetClientData(user?.id ?? "");

  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const loggedUser = clientData
    ? mapClientToUserData(clientData.client)
    : undefined;
  const { mutate: mutateUpdateClient } = useUpdateClient({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-client-data", user?.id],
      });
      showSnackbar("Salvo com sucesso!", "success");
      router.push("/profile");
    },
    onError: (error) => {
      showSnackbar("Erro ao salvar!", "error");
      console.log(error);
    },
  });
  const saveUser = (data: UserData) => {
    // localStorage.setItem("bookstore-user", JSON.stringify(user));
    // setLoggedUser(user);
    mutateUpdateClient({ form: data, id: user.id });
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };
  return isLoading || !loggedUser ? (
    <p>Carregando...</p>
  ) : (
    <ProfileForm
      key={clientData?.client?.id + JSON.stringify(clientData)}
      loggedUser={loggedUser}
      isEdit={isEdit}
      setIsEdit={setIsEdit}
      onSave={saveUser}
      onLogout={handleLogout}
      isPageProfile={true}
    />
  );
};

export default ProfilePage;
