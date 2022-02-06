import React from 'react';
import { StyleSheet } from "react-native";

const ScreenTitle = StyleSheet.create({
    regular: {
        fontSize: 34,
        fontWeight: "bold",
    },
    purple: {
        fontSize: 34,
        fontWeight: "bold",
        color: '#8800FF'
    }, 
    orange: {
        fontSize: 34,
        fontWeight: "bold",
        color: '#FF3C00'
    }
})

const LargeTitle = StyleSheet.create({
    regular: {
        fontWeight: '400', 
        fontSize: 34
    }, 
    bold: {
        fontWeight: '700', 
        fontSize: 34
    }
});

const Title1 = StyleSheet.create({
    regular: {
        fontWeight: '400', 
        fontSize: 28
    }, 
    bold: {
        fontWeight: '700', 
        fontSize: 28
    }
});

const Title2 = StyleSheet.create({
    regular: {
        fontWeight: '400',
        fontSize: 22
    }, 
    bold: {
        fontWeight: '700', 
        fontSize: 22
    }
})

const Title3 = StyleSheet.create({
    regular: {
        fontWeight: '400', 
        fontSize: 20
    }, 
    semibold: {
        fontWeight: '600', 
        fontSize: 20
    }
})

const Headline = StyleSheet.create({
    semibold: {
        fontWeight: '600', 
        fontSize: 17
    }, 
    black: {
        fontWeight: '900', 
        fontSize: 17
    }
})

const Body = StyleSheet.create({
    regular: {
        fontWeight: '400', 
        fontSize: 17
    }, 
    semibold: {
        fontWeight: '600', 
        fontSize: 17
    }, 
    bold: {
        fontWeight: '700', 
        fontSize: 17
    }, 
    black: {
        fontWeight: '900', 
        fontSize: 17
    }
})

const Callout = StyleSheet.create({
    regular: {
        fontWeight: '400', 
        fontSize: 16
    }, 
    semibold: {
        fontWeight: '600', 
        fontSize: 16
    }, 
    bold: {
        fontWeight: '700', 
        fontSize: 16
    }, 
    black: {
        fontWeight: '900', 
        fontSize: 16
    }
})

const Subheadline = StyleSheet.create({
    regular: {
        fontWeight: '400', 
        fontSize: 15
    }, 
    semibold: {
        fontWeight: '600', 
        fontSize: 15
    }, 
    bold: {
        fontWeight: '700', 
        fontSize: 15
    }, 
    black: {
        fontWeight: '900', 
        fontSize: 15
    }
})

const Footnone = StyleSheet.create({
    regular: {
        color: 'rgba(130, 130, 130, 0.85)', 
        fontWeight: 'normal', 
        fontSize: 13
    }, 
    semibold: {
        fontSize: 13, 
        fontWeight: '600'
    }, 
    black: {
        fontSize: 13, 
        fontWeight: '900'
    }
})

const TextStyles = {
    ScreenTitle, 
    LargeTitle, 
    Title1, 
    Title2, 
    Title3, 
    Headline, 
    Body, 
    Callout, 
    Subheadline, 
    Footnone
}

export default TextStyles;