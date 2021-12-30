import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

const BusinessNews = {};

BusinessNews.Card = ({
    pictureURL,
    date,
    title,
    businessProfileName,
    businessProfilePictureURL,
    style
}) =>
    <View style={[{
        flexDirection: 'row',
        alignItems: 'flex-start'
    }, style]}>
        <Image
            style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                marginRight: 6
            }}
            source={{ uri: pictureURL }}
        ></Image>
        <View style={{ marginLeft: 6, flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        style={{
                            height: 20,
                            width: 20,
                            borderRadius: 10,
                            marginRight: 2
                        }}
                        source={{ uri: businessProfilePictureURL }}
                    ></Image>
                    <Text style={{ marginLeft: 2, fontSize: 14 }}>{businessProfileName}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="clock" color={'#8800FF'} size={16}></MaterialCommunityIcons>
                    <Text style={{fontSize: 14}}>Hace 3 min</Text>
                </View>
            </View>
            <Text style={{
                marginVertical: 4, 
                fontSize: 16, 
                fontWeight: '800'
            }}>{title}</Text>
        </View>
    </View>

export default BusinessNews;