import React from 'react';
import { Text } from "react-native";

function ScreenTitle(props){
    return <Text
        {...props}
        style={{
            fontSize: 34,
            fontWeight: "bold",
            color: "#FF3C00", 
            ...props.style
        }}
    >
        {props.children}
    </Text>
}

function Headline(props){
    return <Text
        {...props}
        style={{
            fontSize: 17, 
            fontWeight: "700", 
            ...props.style
        }}
    >
        {props.children}
    </Text>
}

function Subheadline(props){
    return <Text
        {...props}
        style={{
            fontSize: 15, 
            ...props.style
        }}
    >
        {props.children}
    </Text>
}

function LargeTitle(props){
    return <Text
        {...props}
        style={{
            fontSize: 34, 
            fontWeight: 'bold', 
            ...props.style
        }}
    >
        {props.children}
    </Text>
}

function Title1(props){
    return <Text
        {...props}
        style={{
            fontSize: 28, 
            fontWeight: 'bold',
            ...props.style
        }}
    >
        {props.children}
    </Text>
}

function Body(props){
    return <Text
        {...props}
        style={{
            fontSize: 17, 
            ...props.style
        }}
    >
        {props.children}
    </Text>
}

function BodyBlack(props){
    return <Text
        {...props}
        style={{
            fontSize: 17, 
            fontWeight: '900',
            ...props.style
        }}
    >
        {props.children}
    </Text>
}

function Footnote(props){
    return <Text
        {...props}
        style={{
            fontSize: 13, 
            fontWeight: '400', 
            color: 'grey', 
            textTransform: 'uppercase', 
            ...props.style
        }}
    >
        {props.children}
    </Text>
}

function FootnoteDemiBold(props){
    return <Text
        {...props}
        style={{
            fontSize: 13, 
            fontWeight: '600', 
            ...props.style
        }}
    >
        {props.children}
    </Text>
}

const StyledText = {
    ScreenTitle, 
    Headline, 
    Subheadline, 
    LargeTitle,
    Title1,
    Body, 
    BodyBlack,
    Footnote, 
    FootnoteDemiBold
}

export default StyledText