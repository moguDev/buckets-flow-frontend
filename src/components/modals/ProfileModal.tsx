import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";

type FormData = {
  userName: string;
  image: FileList;
};

export const ProfileModal = () => {
  const { userName, loading, updateName } = useAuth();
  const {
    register,
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
          <div className="flex items-center text-lg font-semibold pb-4">
            アカウント名を編集
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center">
              <div className="flex ites-center border border-blue-500 border-opacity-20 rounded-xl p-3 w-full">
                <span className="material-icons text-gray-700 mr-2">
                  person
                </span>
                <input
                  type="text"
                  className=" bg-theme text-blue-200 outline-none placeholder:text-gray-700 w-full"
                  placeholder="アカウント名"
                  {...register("userName", {
                    required: "アカウント名を入力してください。",
                    maxLength: {
                      value: 32,
                      message: "アカウント名は32文字以内にしてください。",
                    },
                  })}
                />
              </div>
            </div>
            <div className="text-red-500 text-xs px-1 py-3">
              {errors.userName?.message}
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
                className="btn bg-opacity-0 text-blue-400 font-bold border-none"
              >
                更新
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
