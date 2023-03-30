import { faArrowLeft, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react';
import { View, ImageBackground, StyleSheet, Image, Text, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';

const data = [
    { id: "SER1", status: 'On Progress', description: 'Fix the broken door', deadline: '2022-05-01' },
    { id: "SER2", status: 'Completed', description: 'Paint the wall', deadline: '2022-06-15' },
    { id: "SER3", status: 'New', description: 'Install new lights', deadline: '2022-07-23' },
    { id: "SER4", status: 'On Progress', description: 'Repair the roof', deadline: '2022-08-09' },
    { id: "SER5", status: 'New', description: 'Install new lights', deadline: '2022-07-23' },
    { id: "SER6", status: 'On Progress', description: 'Repair the roof', deadline: '2022-08-09' },
    { id: "SER7", status: 'New', description: 'Install new lights', deadline: '2022-07-23' },
    { id: "SER8", status: 'On Progress', description: 'Repair the roof', deadline: '2022-08-09' },
    { id: "SER9", status: 'On Progress', description: 'Repair the roof', deadline: '2022-08-09' },
    
]

function LoginScreen() {
    const [filter, setFilter] = useState('All');
    const [allWorkOrders, setAllWorkOrders] = useState(data);
    const [workOrders, setWorkOrders] = useState(data);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    useEffect(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        
        setWorkOrders(allWorkOrders.slice(start, end));
    }, [allWorkOrders, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(allWorkOrders.length / itemsPerPage);
    const filterWorkOrders = (status: string) => {
        
        setFilter(status);
        if (status === 'All') {
            
            setAllWorkOrders(data);
            setCurrentPage(1);
            return;
        }
        // filter work orders by status
        const filteredWorkOrders = data.filter((wo) => wo.status === status);
        setWorkOrders(filteredWorkOrders);
        setAllWorkOrders(data);
        setCurrentPage(1);
    }; 
    interface WorkOrder {
        id: string;
        status: string;
        description: string;
        deadline: string;
    }
    const renderWorkOrder = ({ item }: { item: WorkOrder }) => (
        <View style={[styles.workOrderContainer, 
            item.status === 'On Progress' ? { borderStartColor : '#ffffff00' } : 
            item.status === 'Completed' ? { borderStartColor : 'green' } : 
            item.status === 'New' ? { borderStartColor : '#ffffff00' } : null
        ]}>
            <View style={styles.id}>
                <FontAwesomeIcon icon={faScrewdriverWrench} style={styles.icon2} />
                <Text style={styles.workOrderTitle}>{` ${item.id}`}</Text>
            </View>
            <View style={styles.id}>
                <FontAwesomeIcon icon={faClock} style={styles.icon2} />
                <Text style={styles.workOrderDeadline}>{` ${item.deadline}`}</Text>
            </View>
            <Text style={styles.workOrderDescription}>{item.description}</Text>
            
            <Text style={styles.workOrderStatus}>{item.status}</Text>
        </View>
    );
    return (

        <View style={styles.container}>
            <FastImage
                source={require('../assets/hearts&magic.gif')}
                style={styles.backgroundImage}
                resizeMode={FastImage.resizeMode.cover}
            />
            <TouchableOpacity style={styles.icon} onPress={() => { }}>
                <FontAwesomeIcon icon={faArrowLeft} style={styles.icon} />
            </TouchableOpacity>
            <View style={styles.TopContainer}>

                <Text style={styles.TopContainer} >My Work Orders </Text>

            </View>
            <View style={styles.filterBar}>
                <TouchableOpacity
                    style={[styles.filterButton, filter === 'All' && styles.activeFilterButton]}
                    onPress={() => filterWorkOrders('All')}>
                    <Text style={styles.filterButtonText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, filter === 'On Progress' && styles.activeFilterButton]}
                    onPress={() => filterWorkOrders('On Progress')}>
                    <Text style={styles.filterButtonText}>On Progress</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, filter === 'Completed' && styles.activeFilterButton]}
                    onPress={() => filterWorkOrders('Completed')}>
                    <Text style={styles.filterButtonText}>Completed</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, filter === 'New' && styles.activeFilterButton]}
                    onPress={() => filterWorkOrders('New')}>
                    <Text style={styles.filterButtonText}>New</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.whiteContainer} >
                <View style={styles.title}>

                    <Text style={styles.title} >{filter} Work Orders </Text>

                </View>
                <FlatList
                    data={workOrders}
                    renderItem={renderWorkOrder}
                    keyExtractor={(item) => item.id.toString()}
                    style={{ flexGrow: 1 ,height: 400 }}
                />
                {totalPages > 1 && (
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.paginationContainer}
                    >
                        {[...Array(totalPages)].map((_, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.paginationButton,
                                    currentPage === index + 1 && styles.activePaginationButton,
                                ]}
                                onPress={() => setCurrentPage(index + 1)}
                            >
                                <Text style={styles.paginationText}>{index + 1}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}
                

            </View>

        </View>



    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 50,
    },
    container: {
        flex: 1,
        alignItems: "center",

    },
    backgroundImage: {
        flex: 0,
        height: '45%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    whiteContainer: {
        position: "relative",
        top: - 140, // 10 pixels overlapping
        left: 0,
        height: '75%',
        width: '100%',
        borderTopLeftRadius: 40, // Set the top-left border radius
        borderTopRightRadius: 40,
        backgroundColor: '#F8F8FD',
        justifyContent: "flex-start",
        alignItems: "center",
        paddingBottom: 20,


        /* Add your styles for white container */
    },
    TopContainer: {
        position: 'absolute',
        top: '5%',

        color: "#F8F8FD",
        fontSize: 20,
        fontFamily: 'DMSans-Medium',

        alignItems: 'center',

        paddingBottom: 30
    },

    icon: {
        position: 'absolute',
        top: '5%',
        left: '5%',
        color: "#77E6B6",
        fontSize: 20,
        fontFamily: 'DMSans-Medium',
        height: 12,
        width: 13.59,
        alignItems: 'center',

        paddingBottom: 30,
        Color: '#212427',
    },
    icon2: {


        fontSize: 20,
        fontFamily: 'DMSans-Medium',
        height: 12,
        width: 13.59,
        alignItems: 'center',

        paddingBottom: 30,
        Color: '#2D5151',
    },

    filterBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "flex-start",
        height: 40,
        borderRadius: 5,
        borderColor: "#FFFFFF40",
        borderWidth: 0.5,
        paddingHorizontal: 0,


        position: 'absolute',
        top: '14%',
        left: '5%',
    },
    filterText: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    filterButton: {

        paddingVertical: 8,
        paddingHorizontal: 13,
        borderRadius: 5,
        height: 40,
    },
    filterButtonSelected: {
        backgroundColor: '#BBDEFB',
    },
    filterButtonText: {

        color: '#F8F8FD',
        fontSize: 16,
        fontFamily: 'DMSans-Regular',
    },
    title: {
        color: "#004343",
        fontSize: 20,
        fontFamily: 'DMSans-Bold',

        justifyContent: "flex-start",


        paddingLeft: -12,
        paddingBottom: 12,
        paddingTop: 12
    },
    workOrderContainer: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
        width: 320,
        
        borderStartWidth : 3,
      


    },
    workOrderTitle: {
        fontFamily: 'DMSans-Regular',
        fontSize: 12,
        paddingLeft :10 ,
        color: '#2D5151',
    },
    workOrderDescription: {
        fontFamily: 'DMSans-Bold',
        color: '#2D5151',
        marginBottom: 5,
        fontSize: 15,
        paddingHorizontal: 5,
    },
    workOrderDeadline: {
        fontFamily: 'DMSans-Regular',
        color: '#2D5151',
        marginBottom: 5,
        fontSize: 13,
        paddingLeft :10 ,
    },
    workOrderStatus: {
        fontFamily: 'DMSans-Regular',
        
        textAlign: 'right',
        color: '#2D5151',
    },
    activeFilterButton: {
        backgroundColor: '#FFFFFF33',

    },
    paginationContainer: {
        flexDirection: 'row',
        marginTop: 10,
        
        
        paddingHorizontal: 20,
        alignSelf: "flex-end",
        justifyContent: 'center',

    },
    paginationButton: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        


    },
    activePaginationButton: {
        backgroundColor: '#77E6B6',
    },
    paginationText: {
        fontSize: 16,
        color: "#212427",
        fontFamily: 'DMSans-Medium',
    },
    id: {
        flexDirection: 'row',
        alignItems: 'center',

        
        paddingHorizontal: 5,

    },
});

export default LoginScreen;