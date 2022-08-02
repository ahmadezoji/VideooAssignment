import { AppRegistry, View, StyleSheet, Text, FlatList, Image, TextInput, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import { connect, useDispatch, useSelector } from 'react-redux';
import { GET_USER } from '../actions/types';
import { addUser, getUsers, removeUser } from '../actions/user';

const API = 'https://dummyjson.com/users';
const UserShow = () => {
    let [loading, setLoading] = useState(false);
    let [refreshing, setRefreshing] = useState(false);

    const { users } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const fetchUsers = () => dispatch(getUsers());
    useEffect(() => {
        fetchUsers();
    }, [users !== null]);
    const _gotoAddUser = () => {
        Actions.push('userAdd');
    }

    const _onRefresh = () => {
        Actions.refresh('userShow');
    }
    if (users.length == 0) {
        return (
            <View style={[styles.container, { justifyContent: 'center' }]}>
                <ActivityIndicator color={'blue'} size={50} />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <FlatList data={users}
                refreshing={refreshing}
                onRefresh={_onRefresh}
                renderItem={({ item }) => (
                    <ListUserItem item={item} />
                )}
            />
            <TouchableOpacity style={styles.btnAdd} onPress={(() => _gotoAddUser())}>
                <Text style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>Add</Text>
            </TouchableOpacity>
        </View>
    )
};
const ListUserItem = (props) => {
    let [item, setItem] = useState(props.item);
    const dispatch = useDispatch();
    const removeFromUsers = user => dispatch(removeUser(user));
    const handleRemoveUser = user => {
        removeFromUsers(user);
    };
    return (
        <TouchableOpacity onPress={() => Actions.push('userDetail', { item: item })} onLongPress={() => handleRemoveUser(item)}>
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
const userAdd = () => {
    let [loading, setLoading] = useState(false);
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [age, setAge] = useState('');
    let [company, setCompany] = useState('');
    let [address, setAddress] = useState('');
    let [image, setImage] = useState('https://robohash.org/hicveldicta.png');

    const WIDTH_INPUT = 200;

    const dispatch = useDispatch();
    const AddToUsers = user => dispatch(addUser(user));
    const handleAddUser = user => {
        AddToUsers(user);
    };

    useEffect(() => {

    });

    const _addUser = () => {
        let user = {
            'id' : `${Math.floor(Math.random() * (100 - 30 + 1)) + 30}`,
            'firstName': firstName,
            'lastName': lastName,
            'age': age,
            'company': { 'name': company },
            'address': { 'address': address },
            'image': image
        }
        handleAddUser(user);
    }

    return (
        <View style={styles.detailContainer}>
            <TextInput
                style={[{ width: WIDTH_INPUT }, styles.inputText]}
                onChangeText={(text) => setFirstName(text)}
                placeholder="First Name"
            />
            <TextInput
                style={[{ width: WIDTH_INPUT }, styles.inputText]}
                onChangeText={(text) => setLastName(text)}
                placeholder="Last Name"
            />
            <TextInput
                style={[{ width: WIDTH_INPUT }, styles.inputText]}
                onChangeText={(text) => setAge(text)}
                placeholder="Age"
            />
            <TextInput
                style={[{ width: WIDTH_INPUT }, styles.inputText]}
                onChangeText={(text) => setCompany(text)}
                placeholder="Company Name"
            />
            <TextInput
                style={[{ width: WIDTH_INPUT }, styles.inputText]}
                onChangeText={(text) => setAddress(text)}
                placeholder="Address"
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <TextInput
                    style={[{ width: 250 }, styles.inputText]}
                    onChangeText={(text) => setImage(text)}
                    value={image}
                    placeholder="Image"
                />
                <Image style={{ width: 60, height: 60 }} source={{ uri: image }}></Image>
            </View>

            <TouchableOpacity style={styles.btnAdd} onPress={(() => _addUser())}>
                <Text style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>Add</Text>
            </TouchableOpacity>
        </View>
    )

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column'
    },
    detailContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#ffde03',
    },
    itemList: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: 300,
        height: 100,
        alignItems: 'center',
        backgroundColor: '#ffde03',
        margin: 2,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5
    },
    imageContainer: {
        width: 300,
        height: 300,
        backgroundColor: 'white',
        borderRadius: 75,
        borderWidth: 1,
        borderColor: 'blue'
    },
    textTitle: {
        textAlign: 'center',
        color: 'black',
        fontSize: 22,
        fontWeight: 'bold'
    },
    text: {
        textAlign: 'center',
        color: 'black',
        fontSize: 18,
    },
    btnAdd: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 50,
        backgroundColor: 'blue',
        borderRadius: 5,
        padding: 10
    },
    inputText: {
        margin: 5,
        textAlign: 'center',
        backgroundColor: 'white',
        fontSize: 18,
        borderRadius: 5,
        borderColor: 'blue',
        borderWidth: 1,
    }

});

// const mapStateToProps = state => {
//     return {
//         users: state.users.users
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         addUser: (name) => {
//             dispatch(addUser(name))
//         }
//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(UserShow)


export { userDetail, userAdd, UserShow };