import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import socket from "../utils/socket";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Battery from "expo-battery";

const LOCATION_TRACKING = "location-tracking";

const MapScreen = () => {
  // const locationData = [
  //   {
  //     image:
  //       "https://sdk.bitmoji.com/render/panel/49490f4e-eabb-4cab-bcb6-69f361d66706-b04e0b03-724c-49a0-aed6-acaaa095e117-v1.png?transparent=1&palette=1",
  //     id: "1",
  //     latitude: "13.1295",
  //     longitude: "77.5877",
  //     name: "sujan",
  //   },
  //   {
  //     image:
  //       "https://sdk.bitmoji.com/render/panel/49490f4e-eabb-4cab-bcb6-69f361d66706-349ae33a-71ac-4e93-aa23-6fea888cbce8-v1.png?transparent=1&palette=1",
  //     id: "2",
  //     latitude: "13.1155",
  //     longitude: "77.6070",
  //     name: "suhas",
  //   },
  //   {
  //     image:
  //       "https://sdk.bitmoji.com/render/panel/49490f4e-eabb-4cab-bcb6-69f361d66706-36c5b152-0741-4b18-9b2d-2172a549e359-v1.png?transparent=1&palette=1",
  //     id: "3",
  //     latitude: "13.0977",
  //     longitude: "77.5839",
  //     name: "ashish",
  //   },
  //   // {
  //   //   image:
  //   //     "https://sdk.bitmoji.com/render/panel/5ec9454b-e321-4007-a4fb-e1b511ef9e1d-38316d96-fa28-4778-a8a6-ba912e79183c-v1.png?transparent=1&palette=1",
  //   //   id: "4",
  //   //   latitude: "13.0490",
  //   //   longitude: "77.5936",
  //   //   name: "abhi",
  //   // },
  //   // {
  //   //   image:
  //   //     "https://sdk.bitmoji.com/render/panel/49490f4e-eabb-4cab-bcb6-69f361d66706-59a79c14-e33e-41db-b2e3-8f6cfc1593ed-v1.png?transparent=1&palette=1",
  //   //   id: "5",
  //   //   latitude: "13.0623",
  //   //   longitude: "77.5871",
  //   //   name: "akash",
  //   // },
  //   // {
  //   //   image:
  //   //     "https://sdk.bitmoji.com/render/panel/5ec9454b-e321-4007-a4fb-e1b511ef9e1d-e759ecce-8359-457f-a330-eebed37ae9c7-v1.png?transparent=1&palette=1",
  //   //   id: "6",
  //   //   latitude: "13.0354",
  //   //   longitude: "77.5988",
  //   //   name: "Preetham",
  //   // },
  //   // {
  //   //   image:
  //   //     "https://sdk.bitmoji.com/render/panel/a2ef820f-0ca5-4391-8b2e-c79483edfe04-d8fa313e-d0e8-4d84-9769-a3238cf96fc0-v1.png?transparent=1&palette=1",
  //   //   id: "7",
  //   //   latitude: "13.0897",
  //   //   longitude: "77.5458",
  //   //   name: "supreeth",
  //   // },
  //   // {
  //   //   image:
  //   //     "https://sdk.bitmoji.com/render/panel/be347acc-bb01-4f7a-9dd4-2b72d1a9d8c7-a854125f-f81a-4b79-a80c-30d522cbb799-v1.png?transparent=1&palette=1",
  //   //   id: "8",
  //   //   latitude: "13.1042",
  //   //   longitude: "77.5713",
  //   //   name: "Keerthi",
  //   // },
  //   // {
  //   //   image:
  //   //     "https://sdk.bitmoji.com/render/panel/be347acc-bb01-4f7a-9dd4-2b72d1a9d8c7-37498be4-7dec-4bcd-8c46-f04e0229ef0a-v1.png?transparent=1&palette=1",
  //   //   id: "9",
  //   //   latitude: "13.0811",
  //   //   longitude: "77.5562",
  //   //   name: "Deepthi",
  //   // },
  //   // {
  //   //   image:
  //   //     "https://sdk.bitmoji.com/render/panel/be347acc-bb01-4f7a-9dd4-2b72d1a9d8c7-c4234bcc-b963-4277-9878-39f5088de39e-v1.png?transparent=1&palette=1",
  //   //   id: "10",
  //   //   latitude: "13.1222",
  //   //   longitude: "77.6306",
  //   //   name: "Priya",
  //   // },
  //   // {
  //   //   image:
  //   //     "https://sdk.bitmoji.com/render/panel/49490f4e-eabb-4cab-bcb6-69f361d66706-00b2b490-1f1a-4e1e-bfc7-764d868e876d-v1.png?transparent=1&palette=1",
  //   //   id: "11",
  //   //   latitude: "13.0659",
  //   //   longitude: "77.6524",
  //   //   name: "Shreya",
  //   // },
  // ];

  const image = [
    "https://sdk.bitmoji.com/render/panel/49490f4e-eabb-4cab-bcb6-69f361d66706-b04e0b03-724c-49a0-aed6-acaaa095e117-v1.png?transparent=1&palette=1",
    "https://sdk.bitmoji.com/render/panel/49490f4e-eabb-4cab-bcb6-69f361d66706-349ae33a-71ac-4e93-aa23-6fea888cbce8-v1.png?transparent=1&palette=1",
    "https://sdk.bitmoji.com/render/panel/49490f4e-eabb-4cab-bcb6-69f361d66706-36c5b152-0741-4b18-9b2d-2172a549e359-v1.png?transparent=1&palette=1",
    "https://sdk.bitmoji.com/render/panel/5ec9454b-e321-4007-a4fb-e1b511ef9e1d-38316d96-fa28-4778-a8a6-ba912e79183c-v1.png?transparent=1&palette=1",
    "https://sdk.bitmoji.com/render/panel/49490f4e-eabb-4cab-bcb6-69f361d66706-59a79c14-e33e-41db-b2e3-8f6cfc1593ed-v1.png?transparent=1&palette=1",
    "https://sdk.bitmoji.com/render/panel/5ec9454b-e321-4007-a4fb-e1b511ef9e1d-e759ecce-8359-457f-a330-eebed37ae9c7-v1.png?transparent=1&palette=1",
    "https://sdk.bitmoji.com/render/panel/a2ef820f-0ca5-4391-8b2e-c79483edfe04-d8fa313e-d0e8-4d84-9769-a3238cf96fc0-v1.png?transparent=1&palette=1",
    "https://sdk.bitmoji.com/render/panel/be347acc-bb01-4f7a-9dd4-2b72d1a9d8c7-a854125f-f81a-4b79-a80c-30d522cbb799-v1.png?transparent=1&palette=1",
    "https://sdk.bitmoji.com/render/panel/be347acc-bb01-4f7a-9dd4-2b72d1a9d8c7-37498be4-7dec-4bcd-8c46-f04e0229ef0a-v1.png?transparent=1&palette=1",
    "https://sdk.bitmoji.com/render/panel/be347acc-bb01-4f7a-9dd4-2b72d1a9d8c7-c4234bcc-b963-4277-9878-39f5088de39e-v1.png?transparent=1&palette=1",
    "https://sdk.bitmoji.com/render/panel/49490f4e-eabb-4cab-bcb6-69f361d66706-00b2b490-1f1a-4e1e-bfc7-764d868e876d-v1.png?transparent=1&palette=1",
  ];

  const [location, setLocation] = useState([11, 103]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [data, setData] = useState({});
  const [userLocation, setUserLocation] = useState([]);

  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [battery, setBattery] = useState(null);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("user", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      jsonValue != null
        ? setUserInfo(JSON.parse(jsonValue))
        : setUserInfo(null);
    } catch (e) {
      console.log(e);
    }
  };

  const batterySubscription = async () => {
    const batteryLevel = await Battery.getBatteryLevelAsync();
    setBattery(batteryLevel.toFixed(2) * 100);
    let subscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
      setBattery(batteryLevel.toFixed(2) * 100);
      console.log("batteryLevel changed!", batteryLevel);
    });
  };

  useEffect(() => {
    if (socket) {
      socket.on("receiveUser", (data) => {
        setUserLocation(data);
      });
    }
  }, [socket]);

  useEffect(() => {
    (async () => {
      let resf = await Location.requestForegroundPermissionsAsync();
      let resb = await Location.requestBackgroundPermissionsAsync();

      if (resf.status !== "granted" && resb.status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 10000,
        distanceInterval: 1,
        showsBackgroundLocationIndicator: true,
        foregroundService: {
          notificationTitle: "Zenly",
          notificationBody: "Zenly access your location",
        },
        pausesUpdatesAutomatically: false,
      });
    })();
    getData();
    batterySubscription();

    let uniqueId = Math.floor(Math.random() * 100);
    setUserId(uniqueId);
  }, []);

  useEffect(() => {
    let index = Math.floor(Math.random() * 10);

    if (userInfo) {
      setData({
        image: userInfo?.image,
        id: userInfo?.userId,
        latitude: location[0],
        longitude: location[1],
        name: userInfo?.name,
        battery,
      });
    } else {
      setData({
        image: image[index],
        id: userId,
        latitude: location[0],
        longitude: location[1],
        name: "nana",
        battery,
      });
      storeData({ userId, image: image[index], name: "nana" });
    }
  }, [userId, userInfo, battery]);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
    if (error) {
      console.log("LOCATION_TRACKING task ERROR:", error);
      return;
    }
    if (data) {
      const { locations } = data;
      let lat = locations[0]?.coords?.latitude;
      let long = locations[0]?.coords?.longitude;

      // l1 = lat;
      // l2 = long;

      setLocation([lat, long]);

      console.log(
        `id: ${userId} ${new Date(Date.now()).toLocaleString()}: ${lat},${long}`
      );
    }
  });

  useEffect(() => {
    if (data && location) {
      let tmp = data;
      tmp.latitude = location[0];
      tmp.longitude = location[1];
      setData(tmp);
      socket.emit("userLocation", tmp);
    }
  }, [location]);

  useEffect(() => {
    if (data) {
      socket.emit("userLocation", data);
    }
  }, [data]);

  return (
    <View>
      <MapView
        zoomEnabled={true}
        // provider={PROVIDER_GOOGLE}
        style={{ width: "100%", height: "100%" }}
        initialRegion={{
          latitude: 11,
          longitude: 104,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* {data.map((emoji, i) => (
          <Marker
            key={i}
            coordinate={{
              latitude: emoji.latitude,
              longitude: emoji.longitude,
            }}
            title="Snap Map"
            description={emoji.name}
            identifer="origin"
          >
            <Image source={{ uri: emoji.image }} />
          </Marker>
        ))} */}
        {userLocation?.map((emoji, i) => (
          <Marker
            key={i}
            title="Zenly"
            description={"city"}
            coordinate={{
              latitude: parseFloat(emoji?.latitude),
              longitude: parseFloat(emoji?.longitude),
            }}
          >
            <View
              style={{
                display: "flex",
                alignItems: "center",
                // width: 50,
                // height: 20,
                // display: "flex",
                // alignItems: "center",
                // justifyContent: "center",
              }}
            >
              {emoji?.id && (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    // backgroundColor: "red",
                  }}
                >
                  <Text
                    style={{
                      backgroundColor: "green",
                      // width: 30,
                      paddingLeft: 3,
                      paddingRight: 3,
                      height: 20,
                      borderRadius: 5,
                      color: "white",
                      textAlign: "center",
                      zIndex: 9,
                    }}
                  >
                    {emoji?.battery}%
                  </Text>
                  <View
                    style={{
                      width: 9,
                      height: 10,
                      backgroundColor: "green",
                      borderRadius: 1,
                      marginLeft: -5,
                    }}
                  ></View>
                </View>
              )}

              <Image
                source={{ uri: emoji?.image }}
                style={{ width: 100, height: 100, resizeMode: "cover" }}
              />
            </View>
          </Marker>
        ))}
      </MapView>
      {/* <View
        style={{
          position: "absolute",
          bottom: 30,
          left: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#D8D8D8",
            width: 60,
            height: 60,
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ width: 70, height: 70, borderRadius: 35 }}
            source={{
              uri: "https://sdk.bitmoji.com/render/panel/76c3b171-f0cf-4dd6-b91f-91bd86693f61-d8fa313e-d0e8-4d84-9769-a3238cf96fc0-v1.png?transparent=1&palette=1",
            }}
          />
          <Text
            style={{
              backgroundColor: "white",
              fontWeight: "bold",
              padding: 2,
              textAlign: "center",
              width: 90,
              borderRadius: 4,
            }}
          >
            My Bitmoji
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#D8D8D8",
            marginLeft: 100,
            width: 60,
            height: 60,
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ width: 70, height: 70, borderRadius: 35 }}
            source={{
              uri: "https://sdk.bitmoji.com/render/panel/395d53d1-7032-472e-9c34-fae7ebdae0e1-d8fa313e-d0e8-4d84-9769-a3238cf96fc0-v1.png?transparent=1&palette=1",
            }}
          />
          <Text
            style={{
              backgroundColor: "white",
              fontWeight: "bold",
              padding: 2,
              textAlign: "center",
              width: 90,
              borderRadius: 4,
            }}
            onPress={() => navigator.navigate("HomeScreen")}
          >
            Places
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#D8D8D8",
            width: 60,
            height: 60,
            borderRadius: 30,
            alignItems: "center",
            marginLeft: 80,
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              resizeMode: "cover",
            }}
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw21BoBj8deH0-mopG7ELCQv_gwz9Mzr3NyA&usqp=CAU",
            }}
          />
          <Text
            style={{
              backgroundColor: "white",
              fontWeight: "bold",
              padding: 2,
              textAlign: "center",
              width: 90,
              borderRadius: 4,
            }}
          >
            Friends
          </Text>
        </View>
      </View> */}
      <View
        style={{
          position: "absolute",
          top: 20,
          left: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#B0B0B0",
            width: 34,
            height: 34,
            borderRadius: 17,
            alignItems: "center",
            justifyContent: "center",
            top: 30,
          }}
        >
          <Image
            style={{ width: 34, height: 34, borderRadius: 17 }}
            source={{
              uri: "https://sdk.bitmoji.com/render/panel/76c3b171-f0cf-4dd6-b91f-91bd86693f61-d8fa313e-d0e8-4d84-9769-a3238cf96fc0-v1.png?transparent=1&palette=1",
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: "#B0B0B0",
            marginLeft: 10,
            width: 34,
            height: 34,
            borderRadius: 17,
            alignItems: "center",
            justifyContent: "center",
            top: 30,
          }}
        >
          <Feather name="search" size={17} color="white" />
        </View>
        <View
          style={{
            backgroundColor: "#B0B0B0",
            width: 34,
            height: 34,
            borderRadius: 17,
            alignItems: "center",
            justifyContent: "center",
            top: 30,
            position: "absolute",
            right: 10,
            marginRight: 10,
          }}
        >
          <Ionicons name="settings" size={18} color="white" />
        </View>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
