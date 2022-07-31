import { AppRegistry, View, StyleSheet, Text, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';

const API = 'https://dummyjson.com/users';
const userShow = () => {
    let [loading, setLoading] = useState(false);
    let [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers()
    }, [loading]);

    const getUsers = async () => {
        let response = await fetch(API);
        let result = await response.json();
        setUsers(result.users);
        setLoading(true);
    }
    return (
        <View style={styles.container}>
            <FlatList data={users}
                renderItem={(item) => (
                    <ListUserItem item={item} />
                )}
            />
        </View>
    )
};
const ListUserItem = (props) => {
    let [item, setItem] = useState(props.item.item);
    return (
        <TouchableOpacity onPress={(props) => Actions.push('userDetail', { item: item })}>
            <View style={styles.itemList}>
                <Image style={{ width: 100, height: '90%' }} source={{ uri: item.image }} />
                <Text style={styles.text}>{item.firstName}   </Text>
                <Text style={styles.text}>{item.lastName}</Text>
            </View>
        </TouchableOpacity>
    );
}
const userDetail = (props) => {
    let [loading, setLoading] = useState(false);
    let [user, setUser] = useState(props.item);
    useEffect(() => {
    }, [loading]);
    return (
        <View style={styles.detailContainer}>
            <View style={styles.imageContainer}>
                <Image style={{ width: '100%', height: '100%' }} source={{ uri: user.image }}></Image>
                <Text style={styles.textTitle}>{user.firstName}   </Text>
                <Text style={styles.textTitle}>{user.lastName}</Text>
                <Text style={styles.text}>{user.age}   </Text>
                <Text style={styles.text}>{user.company.name}</Text>
                <Text style={styles.text}>{user.address.address}</Text>
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    detailContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#00ff00',
    },
    itemList: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: 300,
        height: 100,
        alignItems: 'center',
        backgroundColor: '#00ff00',
        margin: 2,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5
    },
    imageContainer: {
        width: 150,
        height: 150,
        backgroundColor: 'white',
        borderRadius: 75,
        borderWidth: 1,
        borderColor: 'blue'
    },
    textTitle: {
        color: 'black',
        fontSize: 22,
        fontWeight: 'bold'
    },
    text: {
        color: 'black',
        fontSize: 18,
    }

});


export { userShow, userDetail };