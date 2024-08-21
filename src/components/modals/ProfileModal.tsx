import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  userName: string;
  image: FileList;
};

export const ProfileModal = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSource, setImageSource] = useState("");
  const { userName, loading, updateName } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSelectFile = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  };

  const generateImageSource = (files: FileList) => {
    const file = files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImageSource(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  };

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (files && files.length > 0) {
      generateImageSource(files);
      setImageFile(files[0]);
    }
  };

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
              <div
                className="relative h-14 w-16 bg-gray-800 bg-opacity-30 rounded-full mr-1 cursor-pointer  border-2 border-blue-300 border-opacity-50 overflow-hidden"
                onClick={() => onSelectFile()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleChangeFile}
                />
                {true ? (
                  <span className="material-icons text-blue-200 opacity-25 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    add_a_photo
                  </span>
                ) : (
                  <Image
                    src={imageSource}
                    alt="image"
                    layout="intrinsic" // or "fixed"
                    width={64}
                    height={64}
                    className="rounded-full object-cover" // object-cover ensures the image covers the container
                  />
                )}
              </div>
              <div className="flex flex-col w-full p-1">
                <label htmlFor="userName" className="text-xs p-1 opacity-50">
                  アカウント名
                </label>
                <input
                  type="text"
                  className="border-b border-blue-500 border-opacity-20 bg-theme text-blue-200 p-1 outline-none"
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
            <div className="text-red-500 text-xs p-1">
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
