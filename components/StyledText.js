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

const StyledText = {
    ScreenTitle, 
    Headline, 
    Subheadline, 
    LargeTitle,
    Title1, 
    Body
}

export default StyledText