import * as React from "react"
import { Image, Text, TouchableOpacity,View } from "react-native";
import { Colors } from "../../core/theme";
const Categories = ({item,onpress}) => {
  return (
    <TouchableOpacity  onPress={()=>onpress(item)} style={{ marginLeft: 10 }}>
      <Image
        source={{uri:"https://i.ibb.co/Wtf5HWw/Screenshot-from-2024-02-16-10-44-44.png"}}
        style={{
          width: 100,
          height: 100,
          borderRadius: 20 / 2,
          overflow: "hidden",
          borderWidth: 1,
          borderColor:Colors.secondary,
        }}
        resizeMode="cover"
      />
      <View style={{ alignContent:"center",textAlign: "center"}}>
        <Text
          style={{ textAlign: "center", fontWeight: "700", marginTop: 3,color:Colors.primary }}
          ellipsizeMode={"tail"}
        >
          {item.name}
        </Text>
        <Text
          style={{ textAlign: "center", fontWeight: "200", fontSize:10, marginTop: 3 ,color:Colors.secondary}}
          ellipsizeMode={"tail"}
        >
          {item.slug}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Categories;
