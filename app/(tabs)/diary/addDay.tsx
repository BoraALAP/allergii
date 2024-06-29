import { useContext, useEffect, useState } from "react";
import { useAuth } from "@/func/useAuth";
import { GlobalContext } from "@/context/global";
import { PageScrollView, PageView } from "@/components/ui/Containers";
import Loading from "@/components/ui/Loading";
import AuthNavigator from "@/components/screens/AuthNavigator";
import { SectionTitle, Text } from "@/components/ui/Typography";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FIREBASE_DB } from "@/firebaseConfig";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Buttons";
import {
  useAddDayData,
  useFirebaseAI,
  useFirebaseAISummary,
  useUpdateDayData,
} from "@/func/useFirebase";
import { Slider } from "@/components/ui/Slider";
import styled from "styled-components";
import { View } from "react-native";
import { ApiDataContext } from "@/context/apidata";
import { router } from "expo-router";

type TodayDataType = {
  NasalSymptoms: number | null;
  SneezingSymptoms: number | null;
  EyeSymptoms: number | null;
  ThroatSymptoms: number | null;
  RespiratorySymptoms: number | null;
  SkinSymptoms: number | null;
  Fatigue: number | null;
  Headache: number | null;
  SleepQuality: number | null;
  OverallWellness: number | null;
};

const AddDay = () => {
  const { state } = useContext(GlobalContext);
  const { apiDataState } = useContext(ApiDataContext);
  const [loading, setLoading] = useState(false);
  const [todaysData, setTodaysData] = useState<TodayDataType>({
    NasalSymptoms: null,
    SneezingSymptoms: null,
    EyeSymptoms: null,
    ThroatSymptoms: null,
    RespiratorySymptoms: null,
    SkinSymptoms: null,
    Fatigue: null,
    Headache: null,
    SleepQuality: null,
    OverallWellness: null,
  });
  const [newData, setNewData] = useState<string | null>(null);
  const [additionalActive, setAdditionalActive] = useState(false);
  // const { subscribed } = useSubscribed();
  const { user } = useAuth();

  const collectionref = collection(FIREBASE_DB, `users/${user?.uid}/data`);
  useEffect(() => {
    (async () => {
      const q = query(collectionref);

      onSnapshot(q, (snapshot) => {
        const todaysDataRaw = snapshot.docs.find((doc) => {
          return (
            doc.data().date.toDate().setHours(0, 0, 0, 0) ===
            new Date().setHours(0, 0, 0, 0)
          );
        });
        //get todaysData as a doc from firebase
        if (!todaysDataRaw) {
          return;
        }
        getDoc(todaysDataRaw.ref).then((doc) => {
          setNewData(doc.id);
          if (doc.data()) {
            setTodaysData(doc.data()?.userinput as TodayDataType);
          }
        });
      });
    })();
  }, []);

  if (state.loading || loading) {
    return <Loading />;
  }

  const updateServer = async () => {
    try {
      if (!user) {
        return;
      }
      setLoading(true);
      const aiResult = useFirebaseAI(apiDataState, todaysData);
      const aiResultSummary = useFirebaseAISummary(apiDataState, todaysData);

      if (newData) {
        await useUpdateDayData(user?.uid, newData, {
          userinput: { ...todaysData },
          ai: await aiResult,
          summary: await aiResultSummary,
        });
      } else {
        await useAddDayData(user?.uid, {
          userinput: { ...todaysData },
          pollen: { ...apiDataState.googlepollen },
          airQuality: { ...apiDataState.googleairquality },
          weather: { ...apiDataState.forecast.forecastday[0].day },
          ai: await aiResult,
          summary: await aiResultSummary,
        });
      }
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      setLoading(false);
      router.back();
    }
  };

  const handleValueChange = (name: string, newValue: number) => {
    setTodaysData((prev) => ({ ...prev, [name]: newValue }));
  };

  return (
    <PageScrollView>
      <SliderWrapper>
        <Slider
          title={"Rate your runny or stuffy nose."}
          onValueChange={(value) => handleValueChange("NasalSymptoms", value)}
          value={todaysData.NasalSymptoms as number}
        />

        <Slider
          title={"How bad was your sneezing?"}
          onValueChange={(value) =>
            handleValueChange("SneezingSymptoms", value)
          }
          value={todaysData.SneezingSymptoms as number}
        />

        <Slider
          title={"Rate your itchy or watery eyes."}
          onValueChange={(value) => handleValueChange("EyeSymptoms", value)}
          value={todaysData.EyeSymptoms as number}
        />

        <Slider
          title={"How sore or itchy was your throat?"}
          onValueChange={(value) => handleValueChange("ThroatSymptoms", value)}
          value={todaysData.ThroatSymptoms as number}
        />

        <Slider
          title={"How much coughing or wheezing did you have?"}
          onValueChange={(value) =>
            handleValueChange("RespiratorySymptoms", value)
          }
          value={todaysData.RespiratorySymptoms as number}
        />

        <Slider
          title={"Rate any skin rashes or itching you had."}
          onValueChange={(value) => handleValueChange("SkinSymptoms", value)}
          value={todaysData.SkinSymptoms as number}
        />
      </SliderWrapper>

      {!additionalActive && (
        <SecondaryButton
          onPress={() => setAdditionalActive(true)}
          title="Additional Symptoms"
        />
      )}
      {additionalActive && (
        <SliderWrapper>
          <Slider
            title={"How tired did you feel when you wake up?"}
            onValueChange={(value) => handleValueChange("Fatigue", value)}
            value={todaysData.Fatigue as number}
          />

          <Slider
            title={"Rate your headache severity."}
            onValueChange={(value) => handleValueChange("Headache", value)}
            value={todaysData.Headache as number}
          />

          <Slider
            title={"How much did your symptoms affect your sleep?"}
            onValueChange={(value) => handleValueChange("SleepQuality", value)}
            value={todaysData.SleepQuality as number}
          />

          <Slider
            title={"How unwell do you feel today?"}
            onValueChange={(value) =>
              handleValueChange("OverallWellness", value)
            }
            value={todaysData.OverallWellness as number}
          />
        </SliderWrapper>
      )}

      <PrimaryButton
        onPress={() => updateServer()}
        title={newData === null ? "Save" : "Update"}
      />
    </PageScrollView>
  );
};

export default AddDay;

const SliderWrapper = styled(View)`
  gap: 24px;
  width: 100%;
`;
