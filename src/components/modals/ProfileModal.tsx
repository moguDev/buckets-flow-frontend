import { useAuth } from "@/hooks/useAuth";
import { Controller, useForm } from "react-hook-form";

type FormData = {
  userName: string;
  image: FileList;
};

export const ProfileModal = () => {
  const { userName, loading, updateName } = useAuth();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await updateName(data.userName);
      const checkbox = document.getElementById(
        "profile-modal"
      ) as HTMLInputElement;
      checkbox.checked = false;
    } catch (e) {}
  };

  return (
    <div className="text-blue-300">
      <input type="checkbox" id="profile-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-theme bg-opacity-90 border-2 border-blue-300 border-opacity-10 backdrop-blur-sm">
          <div className="flex items-center text-lg font-semibold pb-2">
            <span className="material-icons pr-1">edit</span>
            プロフィールを編集
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center">
              <div className="flex items-center justify-center bg-gray-800 bg-opacity-30 h-14 w-16 rounded-full mr-1 cursor-pointer">
                <Controller
                  name="image"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <input
                      type="file"
                      accept="image/*"
                      {...field}
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  )}
                />
                <span className="material-icons text-blue-200 opacity-25">
                  add_a_photo
                </span>
              </div>
              <div className="flex flex-col w-full p-1">
                <label htmlFor="userName" className="text-xs p-1 opacity-50">
                  アカウント名
                </label>
                <input
                  type="text"
                  className="border-b border-blue-500 border-opacity-20 bg-theme text-blue-200 p-1 outline-none"
                  {...register("userName")}
                />
              </div>
            </div>
            <div className="flex items-center justify-end p-1">
              <label
                htmlFor="profile-modal"
                className="btn bg-opacity-0 border-none font-thin"
              >
                キャンセル
              </label>
              <button
                type="submit"
                className="btn bg-opacity-0 text-blue-500 font-bold border-none"
              >
                プロフィールを更新
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
