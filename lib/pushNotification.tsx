import React, { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

const PushNotification = ({ children }: React.PropsWithChildren) => {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>("");
  const [notification, setNotification] = useState<boolean | undefined | any>(
    false
  );

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync({
          ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
            allowAnnouncements: true,
          },
        });
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
        })
      ).data;
      console.log(token);
    } else {
      console.log("Must use physical device for Push Notifications");
    }

    return token;
  }

  const notificationListener: any =
    useRef<ReturnType<typeof Notifications.addNotificationReceivedListener>>();
  const responseListener: any =
    useRef<
      ReturnType<typeof Notifications.addNotificationResponseReceivedListener>
    >();

  Notifications.setNotificationHandler({
    handleNotification: async () => {
      return {
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      };
    },
  });
  Notifications.setBadgeCountAsync(0);

  Notifications.getBadgeCountAsync().then((count) => {
    // console.log("notification: ", count);
  });

  useEffect(() => {
    (async () => {
      await registerForPushNotificationsAsync().then((token) =>
        setExpoPushToken(token)
      );

      await Notifications.cancelAllScheduledNotificationsAsync();
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Look at that notification",
          body: "I'm so proud of myself!",
          badge: 1,
        },
        trigger: {
          hour: 10, // 10 AM
          minute: 30,
          repeats: true,
        },
      });
    })();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification: any) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("notification response", response);
      });

    Notifications.getAllScheduledNotificationsAsync().then((data) => {
      console.log("all schedule", data);
    });

    console.log("subscribed");
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
      console.log("unsubscribed");
    };
  }, []);

  return <>{children}</>;
};

export default PushNotification;
