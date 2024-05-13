import { ApiDataContext } from "@/context/apidata";
import { GlobalContext } from "@/context/global";
import fetchData from "@/func/fetchData";
import { fetchLocation } from "@/func/fetchLocation";
import { PageView } from "@/ui/Containers";
import { SectionTitle, Text } from "@/ui/Typography";

import { useNavigation } from "expo-router";
import React, { useContext, useState } from "react";
import { FlatList, TextInput, TouchableOpacity } from "react-native";
import styled from "styled-components";

type SearchItemProps = {
  name: string;
  active?: boolean;
  key: number;
};

const ModalScreen = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [focused, setFocused] = useState(false);
  const navigation = useNavigation();
  const [results, setResults] = useState([]);

  const suggestionsList = [
    {
      name: "London, UK",
      active: false,
      key: 1,
      location: {
        latitude: 51.507218,
        longitude: -0.127586,
      },
    },
    {
      name: "Sydney, Australia",
      active: false,
      key: 2,
      location: {
        latitude: -33.86882,
        longitude: 151.209295,
      },
    },
    {
      name: "Istanbul, Türkiye",
      active: false,
      key: 3,
      location: {
        latitude: 41.008238,
        longitude: 28.978359,
      },
    },
    {
      name: "New York, USA",
      active: false,
      key: 4,
      location: {
        latitude: 40.712775,
        longitude: -74.005973,
      },
    },
    {
      name: "Amsterdam, The Netherlands",
      active: false,
      key: 5,
      location: {
        latitude: 52.367573,
        longitude: 4.904139,
      },
    },
    {
      name: "Toronto, Canada",
      active: false,
      key: 6,
      location: {
        latitude: 43.653226,
        longitude: -79.383184,
      },
    },
    {
      name: "Tokyo, Japan",
      active: false,
      key: 7,
      location: {
        latitude: 35.6804,
        longitude: 139.769017,
      },
    },
  ];

  //add fetch request for google autocomplete api here
  const fetchSuggestions = async (input: string) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${process.env.EXPO_PUBLIC_GOOGLE_KEY}&types=(cities)&limit=15&bias=location:${state.location.latitude},${state.location.longitude}`
    );
    const data = await response.json();

    setResults(data.predictions);
  };

  return (
    <PageView>
      <TextInputContainer
        placeholder="Search"
        onChangeText={(event: any) =>
          // dispatch({ type: "SET_SEARCH", payload: event })
          fetchSuggestions(event)
        }
        clearButtonMode="while-editing"
        onFocus={() => setFocused(true)}
      />
      {!focused ? (
        <>
          <SectionTitle>Suggestions</SectionTitle>
          <Suggestions
            data={suggestionsList}
            // showsVerticalScrollIndicator={false}

            keyExtractor={(item: any) => item.key}
            renderItem={({ item }: any) => {
              return (
                <PressableItem
                  onPress={async () => {
                    await dispatch({
                      type: "SET_LOCATION",
                      payload: item.location,
                    });

                    navigation.goBack();
                  }}
                >
                  <Text>{item.name}</Text>
                  {/* <IconContainer
                    onPress={() => {
                      console.log("pressed icon");
                    }}
                  >
                    <FontAwesome name={active ? "star" : "star-o"} size={16} />
                  </IconContainer> */}
                </PressableItem>
              );
            }}
          />
        </>
      ) : (
        <>
          <SectionTitle>Search Results</SectionTitle>
          <Suggestions
            data={results}
            // showsVerticalScrollIndicator={false}

            keyExtractor={(item: any) => item.place_id}
            renderItem={({ item }: any) => {
              return (
                <PressableItem
                  onPress={async () => {
                    const data = await fetchLocation(item.place_id);

                    await dispatch({
                      type: "SET_LOCATION",
                      payload: await data,
                    });

                    navigation.goBack();
                  }}
                >
                  <Text>{item.description}</Text>
                  {/* <IconContainer
                    onPress={() => {
                      console.log("pressed icon");
                    }}
                  >
                    <FontAwesome name={active ? "star" : "star-o"} size={16} />
                  </IconContainer> */}
                </PressableItem>
              );
            }}
          />
        </>
      )}
    </PageView>
  );
};

export default ModalScreen;

const PressableItem = styled(TouchableOpacity)`
  padding: 12px 0px 12px 8px;
  width: 100%;

  flex-direction: row;
  align-items: center;

  justify-content: space-between;
`;

const IconContainer = styled(TouchableOpacity)`
  padding: 12px;
`;

const Suggestions = styled(FlatList)`
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
