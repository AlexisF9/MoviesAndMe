import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Home({navigation}){

    const goToSearch = () => {
        navigation.navigate('Search');
    }

    return (
        <View>
            <Text>Home page</Text>
            <Button title="Page recherche" onPress={goToSearch}/>
        </View>
    )
}