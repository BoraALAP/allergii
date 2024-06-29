import { useSubscribed } from "@/func/useSubscribed";

import { View } from "react-native";
import styled from "styled-components";

import Loading from "../ui/Loading";
import { Caption, SectionTitle, Text } from "../ui/Typography";
import { PageScrollView, PageView } from "../ui/Containers";
import { useAuth } from "@/func/useAuth";
import { useContext, useEffect, useState } from "react";

import { FIREBASE_DB } from "@/firebaseConfig";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { GlobalContext } from "@/context/global";
import { PrimaryButton } from "../ui/Buttons";
import { useFirebaseAISuggestion } from "@/func/useFirebase";
import { ApiDataContext } from "@/context/apidata";

const DiaryDashboard = () => {
  const { user, loading } = useAuth();
  const { state } = useContext(GlobalContext);
  const { apiDataState } = useContext(ApiDataContext);

  const collectionref = collection(FIREBASE_DB, `users/${user?.uid}/data`);
  const [data, setData] = useState<any[]>([]);
  const [todaysData, setTodaysData] = useState<any>(null);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setDataLoading(true);
      (async () => {
        const q = query(collectionref, orderBy("date", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
          // look at snapshot.docs setTodaysData for todays doc and setData for all other docs
          const todaysDataRaw = snapshot.docs.find((doc) => {
            const docData = doc.data();
            return (
              docData.date.toDate().setHours(0, 0, 0, 0) ===
              new Date().setHours(0, 0, 0, 0)
            );
          });

          // filter out todays data and set the rest of the data
          const dbData = snapshot.docs
            .map((doc) => {
              return { ...(doc.data() as any), id: doc.id };
            })
            .filter((doc) => {
              return (
                doc.date.toDate().setHours(0, 0, 0, 0) !==
                new Date().setHours(0, 0, 0, 0)
              );
            });

          setData(dbData);

          (async () => {
            if (todaysDataRaw) {
              setTodaysData(todaysDataRaw.data());
              setDataLoading(false);
            } else if (!todaysData) {
              try {
                const suggestion = await useFirebaseAISuggestion(
                  apiDataState,
                  dbData
                );
                console.log("suggestion", suggestion);

                setTodaysData(suggestion);
              } catch (error) {
                console.log("error", error);
              } finally {
                console.log("finally");
                setDataLoading(false);
              }
            } else {
              setDataLoading(false);
            }
          })();
        });

        return unsubscribe;
      })();
    }
  }, []);

  if (loading || state.loading || dataLoading) {
    return <Loading />;
  }

  //things to add in the user diary page
  // - form to add that days info
  // - - if info was provided that day, update the info, else add new info for the day
  // - how they might feel that day (AI generated test)
  // - Previous days info
  // -
  return (
    <PageScrollView center verticalCenter>
      <TodaysCard>
        <SectionTitle>Today</SectionTitle>
        <Text>
          {todaysData?.ai ? todaysData.ai.trimEnd() : todaysData.trimEnd()}
        </Text>
        <PrimaryButton
          url={"/(tabs)/diary/addDay"}
          title={todaysData?.ai ? "Update my Symptopms" : "Add New"}
        />
      </TodaysCard>
      <PreviousDays>
        <SectionTitle>Your Last 5 Days</SectionTitle>
        {data.slice(0, 5).map((item) => {
          return (
            <IndividualDay key={item.id}>
              <Caption>
                {Intl.DateTimeFormat("en-US", {
                  day: "numeric",
                  weekday: "long",
                }).format(item?.date.toDate())}
              </Caption>
              <Text>{item?.summary.trimEnd()}</Text>
            </IndividualDay>
          );
        })}
      </PreviousDays>
    </PageScrollView>
  );
};

const TodaysCard = styled(View)`
  padding: 24px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.card.border};
  border-radius: 8px;
  gap: 16px;
`;

const PreviousDays = styled(View)`
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.card.border};
  border-radius: 8px;
  width: 100%;
  gap: 16px;
`;

const IndividualDay = styled(View)`
  width: 100%;
`;

export default DiaryDashboard;
