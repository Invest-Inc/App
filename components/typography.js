import { Text } from "react-native";

const Typography = {};

Typography.HeroTitle = (props) =>
    <Text
        style={[{
            fontSize: 32,
            fontWeight: '700',
            color: 'rgb(37, 23, 88)',
        }, props.style]}
    >{props.children}</Text>


Typography.HeroParagraph = (props) =>
    <Text
        style={[{
            fontSize: 16,
            fontWeight: '600',
            color: 'rgb(46, 32, 117)'
        }, props.style]}
    >{props.children}</Text>

Typography.SectionHeading = (props) =>
    <Text
        style={[{
            fontSize: 24,
            fontWeight: '700',
            color: '#251758'
        }, props.style]}
    >{props.children}</Text>

export default Typography;