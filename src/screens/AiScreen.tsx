import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const AiScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer2}>
                <View style={styles.aiBox}>
                    <Image
                        source={require('../assets/icons/navigation/ai.png')}
                        style={{ width: 25, height: 25 }}
                    />

                    <Text style={styles.aiText}>AI</Text>
                </View>
            </View>
            <View style={styles.centerContainer}>
                <Text style={styles.heading2}>Coming soon ...</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#18181B',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100,
    },
    heading: {
        color: '#fff',
        padding: 10,
        fontSize: 24,
        fontWeight: 'bold',
    },
    heading2: {
        color: 'grey',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    contentContainer2: {
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignContent: 'center',
    },
    aiBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    aiText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default AiScreen;
