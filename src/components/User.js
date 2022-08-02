import { AppRegistry, View, StyleSheet, Text, FlatList, Image, TextInput, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import { connect, useDispatch, useSelector } from 'react-redux';
import { GET_USER } from '../actions/types';
import { getUsers } from '../actions/user';

const API = 'https://dummyjson.com/users';
// class UserClass extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             loading: false,
//             users: []
//         }
//     }
//     componentDidMount() {
//         // this.getUsers();
//     }
//     async getUsers() {
//         let response = await fetch(API);
//         let result = await response.json();
//         this.setState({
//             // users: result.users,
//             loading: true
//         })
//         dispatch({
//             type: GET_USER,
//             payload: result.users,
//           });
//         // this.props.addUser('saam');
//         console.log(this.props);
//     }
//     render() {
//         if (!this.state.loading) {
//             return (
//                 <View style={[styles.container, { justifyContent: 'center' }]}>
//                     <ActivityIndicator color={'blue'} size={50} />
//                 </View>
//             );
//         }
//         return (
//             <View style={styles.container}>
//                 <FlatList data={this.state.users}
//                     renderItem={(item) => (
//                         <ListUserItem item={item} />
//                     )}
//                 />
//                 <TouchableOpacity style={styles.btnAdd} onPress={(() => Actions.push('userAdd', { items: this.state.users }))}>
//                     <Text style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>Add</Text>
//                 </TouchableOpacity>
//             </View>
//         )

//     }
// }
const UserShow = () => {
    let [loading, setLoading] = useState(false);
    // let [users, setUsers] = useState([]);

    const { users } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const fetchUsers = () => dispatch(getUsers());
    useEffect(() => {
        // getUsers()
        fetchUsers();
        // console.log(users);
    }, [users!==null]);

    // const getUsers = async () => {
    //     let response = await fetch(API);
    //     let result = await response.json();
    //     setUsers(result.users);
    //     setLoading(true);
    // }
    const _gotoAddUser = () => {
        Actions.push('userAdd', { items: users });
    }
    if (!loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center' }]}>
                <ActivityIndicator color={'blue'} size={50} />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <FlatList data={users}
                renderItem={({item}) => (
                    <ListUserItem item={item} />
                )}
            />
            <TouchableOpacity style={styles.btnAdd} onPress={(() => _gotoAddUser())}>
                <Text style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>Add</Text>
            </TouchableOpacity>
        </View>
    )
};
const ListUserItem = ({props}) => {
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
const userAdd = (props) => {
    console.log(props);
    let [loading, setLoading] = useState(false);
    let [users, setUsers] = useState(props.items);
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [age, setAge] = useState('');
    let [company, setCompany] = useState('');
    let [address, setAddress] = useState('');
    useEffect(() => {

    });

    const _addUser = () => {
        let user = {
            'fisrtName': firstName,
            'lastName': lastName,
            'age': age,
            'companyName': company,
            'address': address

        }
        setUsers(users => [...users, user])
    }

    return (
        <View style={styles.detailContainer}>
            <TextInput
                style={styles.inputText}
                onChangeText={(text) => setFirstName(text)}
                placeholder="First Name"
            />
            <TextInput
                style={styles.inputText}
                onChangeText={(text) => setLastName(text)}
                placeholder="Last Name"
            />
            <TextInput
                style={styles.inputText}
                onChangeText={(text) => setAge(text)}
                placeholder="Age"
            />
            <TextInput
                style={styles.inputText}
                onChangeText={(text) => setCompany(text)}
                placeholder="Company Name"
            />
            <TextInput
                style={styles.inputText}
                onChangeText={(text) => setAddress(text)}
                placeholder="Address"
            />
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
        width: 200,
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