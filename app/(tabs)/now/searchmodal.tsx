import * as Location from "expo-location";
import { GlobalContext } from "@/context/global";

import { fetchLocation } from "@/func/fetchLocation";
import { PageView } from "@/ui/Containers";
import { SectionTitle, Text } from "@/ui/Typography";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useNavigation } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { getData, storeData } from "@/func/storage";

import { DividerH } from "@/ui/Elements";
import Loading from "@/ui/Loading";

type GoogleLocation = {
  description: string;
  place_id: string;
  matched_substrings: Array<{ length: number; offset: number }>;
  reference: string;
  structured_formatting: {
    main_text: string;
    main_text_matched_substrings: Array<{ length: number; offset: number }>;
    secondary_text: string;
  };
  terms: Array<{ offset: number; value: string }>;
  types: Array<string>;
};

const ModalScreen = () => {
  const navigation = useNavigation();
  const { state, dispatch } = useContext(GlobalContext);
  const [focused, setFocused] = useState(false);
  const [results, setResults] = useState([]);
  const [recentList, setRecentList] = useState([]);
  const [favoriteList, setFavoriteList] = useState(
    [] as { description: string; place_id: string }[]
  );
  const [loading, setLoading] = useState(true);
  const [suggestionsList, setSuggestionsList] = useState([
    {
      description: "London, UK",
      place_id: "ChIJdd4hrwug2EcRmSrV3Vo6llI",
    },
    {
      description: "Istanbul, Türkiye",
      place_id: "ChIJawhoAASnyhQR0LABvJj-zOE",
    },
    {
      description: "New York, USA",
      place_id: "ChIJOwg_06VPwokRYv534QaPC8g",
    },
    {
      description: "Amsterdam, The Netherlands",
      place_id: "ChIJVXealLU_xkcRja_At0z9AGY",
    },
    {
      description: "Toronto, Canada",
      place_id: "ChIJpTvG15DL1IkRd8S0KlBVNTI",
    },
  ]);

  const SearchItem = ({
    item,
    showFavorite = false,
  }: {
    item: GoogleLocation;
    showFavorite?: boolean;
  }) => {
    // check the favoriteList items and find the place_Id and if that place_Id is same as item.place_id, set active to true
    const active = favoriteList.find(
      (element) => element.place_id === item.place_id
    );

    return (
      <PressableItem
        showFavorite={showFavorite}
        onPress={async () => {
          const data = await fetchLocation(item.place_id);
          await setRecentList((prev): any => [
            { description: item.description, place_id: item.place_id },
            ...prev.slice(0, 4),
          ]);

          await dispatch({
            type: "SET_LOCATION",
            payload: await data,
          });
          navigation.goBack();
        }}
      >
        <Text>{item.description}</Text>
        {showFavorite && (
          <IconContainer>
            <FontAwesome
              name={active ? "star" : "star-o"}
              size={16}
              onPress={() => {
                if (active) {
                  setFavoriteList(
                    favoriteList.filter(
                      (element) => element.place_id !== item.place_id
                    )
                  );
                  return;
                } else {
                  setFavoriteList([
                    { description: item.description, place_id: item.place_id },
                    ...favoriteList,
                  ]);
                }
              }}
            />
          </IconContainer>
        )}
      </PressableItem>
    );
  };

  //add fetch request for google autocomplete api here
  const fetchSuggestions = async (input: string) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${process.env.EXPO_PUBLIC_GOOGLE_KEY}&types=(cities)&limit=15&bias=location:${state.location.latitude},${state.location.longitude}`
    );
    const data = await response.json();
    setResults(data.predictions);
  };

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      const recentList = await getData("recentList");
      const savedList = await getData("savedList");

      (await recentList) !== null && setRecentList(await recentList);
      (await savedList) !== null && setFavoriteList(await savedList);

      if (status !== "granted") {
        // Alert.alert("Permission to access location was denied");
        dispatch({
          type: "SET_NO_LOCATION_PERMISSION",
        });
      } else {
        // Load global data

        dispatch({
          type: "SET_LOCATION_PERMISSION",
        });

        const {
          coords: { longitude, latitude },
        } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Low,
        });

        setCurrentLocation({ latitude, longitude });
      }

      await setSuggestionsList((prev) => {
        //remove the items are already exist in favoriteList
        return prev.filter((item) => {
          const found = favoriteList.find(
            (element) => element.place_id === item.place_id
          );
          if (!found) {
            return item;
          }
        });
      });
      await console.log("loading", loading);

      await setLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      favoriteList.length > 0 && (await storeData(favoriteList, "savedList"));
    })();
  }, [favoriteList]);
  useEffect(() => {
    (async () => {
      recentList.length > 0 && (await storeData(recentList, "recentList"));
    })();
  }, [recentList]);

  if (loading) {
    return <Loading />;
  }

  return (
    <PageView>
      <TextInputContainer
        placeholder="Search"
        onChangeText={(event: any) => fetchSuggestions(event)}
        clearButtonMode="while-editing"
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
      />
      {state.locationPermission && (
        <PressableItemCurrent
          onPress={async () => {
            await dispatch({
              type: "SET_LOCATION",
              payload: currentLocation,
            });

            navigation.goBack();
          }}
        >
          <IconContainer>
            <FontAwesome name="location-arrow" size={16} />
          </IconContainer>
          <Text>Current Location</Text>
        </PressableItemCurrent>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
      >
        {!focused ? (
          <>
            {recentList && recentList.length > 0 ? (
              <ListContainer>
                <SectionTitle>Recent Searches</SectionTitle>
                <Suggestions>
                  {recentList.map((item: any) => {
                    return (
                      <SearchItem
                        item={item}
                        showFavorite={true}
                        key={item.place_id}
                      />
                    );
                  })}
                </Suggestions>
              </ListContainer>
            ) : (
              <ListContainer>
                <SectionTitle>Suggestions</SectionTitle>

                <Suggestions>
                  {suggestionsList.map((item: any) => {
                    return <SearchItem item={item} key={item.place_id} />;
                  })}
                </Suggestions>
              </ListContainer>
            )}
            {favoriteList && favoriteList.length > 0 && (
              <ViewGap>
                <DividerH />
                <ListContainer>
                  <SectionTitle>Saved Locations</SectionTitle>
                  <Suggestions>
                    {favoriteList.map((item: any) => {
                      return (
                        <SearchItem
                          item={item}
                          showFavorite={true}
                          key={item.place_id}
                        />
                      );
                    })}
                  </Suggestions>
                </ListContainer>
              </ViewGap>
            )}
          </>
        ) : (
          <ListContainer>
            <SectionTitle>Search Results</SectionTitle>
            <Suggestions>
              {results.map((item: any) => {
                return (
                  <SearchItem
                    item={item}
                    showFavorite={true}
                    key={item.place_id}
                  />
                );
              })}
            </Suggestions>
          </ListContainer>
        )}
      </ScrollView>
    </PageView>
  );
};

export default ModalScreen;

const PressableItem = styled(TouchableOpacity)<{ showFavorite?: boolean }>`
  padding: ${(props) =>
    props.showFavorite ? "4px 0px 4px 8px" : "12px 8px 12px 8px"};
  width: 100%;
  flex-direction: row;
  align-items: center;

  justify-content: space-between;
`;
const PressableItemCurrent = styled(PressableItem)`
  padding: 4px 8px 4px 0px;
  justify-content: flex-start;
`;

const IconContainer = styled(TouchableOpacity)`
  padding: 12px;
`;

const Suggestions = styled(View)`
  width: 100%;
`;

const ListContainer = styled(View)`
  width: 100%;
`;

const TextInputContainer = styled(TextInput)`
  width: 100%;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.page.bg.start};
  color: ${({ theme }) => theme.colors.primary};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.page.bg.end};
  font-family: ${({ theme }) => theme.font.family.primary};
  margin-bottom: 12px;
`;

const ViewGap = styled(View)`
  gap: 16px;
`;
