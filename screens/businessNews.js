import { Image, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import RenderHTML from 'react-native-render-html';

const markdown = `
# Welcome to React Native Showdown!

To get started, edit the markdown in \`App.tsx\`.

| Column 1 | Column 2 |
|----------|----------|
| A1       | B1       |
| A2       | B2       |
`;

const css = `
h1 { color: red; }
code { font-size: 1.2rem; background-color: lightgray; }
`;


export default class BusinessNewsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ""
        }
    }

    async componentDidMount() {
        try {
            const resBusinessNews = await fetch(`https://invest-inc.herokuapp.com/api/1/news/2`);
            const jsonBusinessNews = await resBusinessNews.json();
            this.setState({ content: jsonBusinessNews.content })
        } catch (e) {
            console.log(e)
            alert(JSON.stringify(e))
        }
    }

    render() {
        return (
            <ScrollView>
                <SafeAreaView>
                    <View style={{ padding: 24 }}>
                        <RenderHTML source={{ html: this.state.content }}></RenderHTML>
                    </View>
                </SafeAreaView>
            </ScrollView>
        )
    }
}