import { Image, Text, View } from "react-native";

const User = {};

User.Tile = ({
    profilePictureURL,
    profileName,
    role,
    style,
    username,
    legalEntity_id
}) =>
    <View style={[{
        flexDirection: 'row',
        alignItems: 'center'
    }, style]}>
        <Image
            style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                marginRight: 6
            }}
            source={{ uri: profilePictureURL }}
        ></Image>
        <View style={{ marginLeft: 6 }}>
            <Text style={{
                fontSize: 18,
                fontWeight: 'bold',
                marginBottom: 2
            }}>{profileName}</Text>
            <Text style={{
                fontSize: 14,
                marginTop: 2,
                color: '#686868'
            }}>{role}</Text>
        </View>
    </View>

export default User;