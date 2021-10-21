import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function Home({navigation}){

    const goToSearch = () => {
        navigation.navigate('Search');
    }

    return (
        <View style={styles.mainHome}>
            <Text style={styles.title}>Movies And Me</Text>
            <Button title="Page recherche" onPress={goToSearch}/>
        </View>
    )
}

const styles = StyleSheet.create({
    mainHome: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 30,
        margin: 20
    }
})