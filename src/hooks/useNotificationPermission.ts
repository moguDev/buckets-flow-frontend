import { useEffect, useState } from "react";

const useNotificationPermission = () => {
  const [permission, setPermission] = useState(Notification.permission);

  useEffect(() => {
    const requestNotificationPermission = async () => {
      if (Notification.permission === "default") {
        const permissionResult = await Notification.requestPermission();
        setPermission(permissionResult);
      }
    };

    // 初回アクセスかどうかをチェック
    const isFirstVisit = localStorage.getItem("hasVisited") === null;
    if (isFirstVisit) {
      localStorage.setItem("hasVisited", "true");
      requestNotificationPermission();
    }
  }, []);

  return permission;
};

export default useNotificationPermission;
