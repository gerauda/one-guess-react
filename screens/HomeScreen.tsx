import React from 'react';

import { View, Text, Button } from 'react-native';

import { NavigationStackProp } from 'react-navigation-stack';

type Props = {
    navigation: NavigationStackProp<{ userId: string }>;
};

export class HomeScreen extends React.Component<Props> {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                <View style={{ flex: 3, backgroundColor: 'powderblue' }} />
                <Text style={{ flex: 1 }}>One Guess</Text>
                <Button
                    title="Play"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
                <View style={{ flex: 3, backgroundColor: 'steelblue' }} />

            </View>
        );
    }
}
