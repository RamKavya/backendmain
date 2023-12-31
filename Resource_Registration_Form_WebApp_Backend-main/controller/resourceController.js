const { Sequelize, where } = require("sequelize");
const { QueryTypes } = require('sequelize');
const Resource = require("../models/resource");
const sequelize = require("../database");
const allGuestHouse = [
    'Amenities - Suite 01 (Bed 01)',
    'Amenities - Suite 01 (Bed 02)',
    'Amenities - Suite 02 (Bed 01)',
    'Amenities - Suite 02 (Bed 02)',
    'Amenities - Suite 03 (Bed 01)',
    'Amenities - Suite 03 (Bed 02)',
    'Main Block - SF Suite (Bed 01)',
    'Main Block - SF Suite (Bed 02)',
    'Main Block - TF Suite (Bed 01)',
    'Main Block - TF Suite (Bed 02)',
    'D Block Men\'s Hostel - Room No. 214 (Bed 01)',
    'D Block Men\'s Hostel - Room No. 214 (Bed 02)',
    'D Block Men\'s Hostel - Room No. 215 (Bed 01)',
    'D Block Men\'s Hostel - Room No. 215 (Bed 02)',
    'D Block Men\'s Hostel - Room No. 205 (Bed 01)',
    'D Block Men\'s Hostel - Room No. 205 (Bed 02)',
    'D Block Men\'s Hostel - Room No. 208 (Bed 01)',
    'D Block Men\'s Hostel - Room No. 208 (Bed 02)',
    'D Block Men\'s Hostel - Room No. 208 (Bed 03)',
    'D Block Men\'s Hostel - Room No. 208 (Bed 04)',
    'C Block Men\'s Hostel - Room No. 209 (Bed 01)',
    'C Block Men\'s Hostel - Room No. 209 (Bed 02)',
    'C Block Men\'s Hostel - Room No. 209 (Bed 03)',
    'C Block Men\'s Hostel - Room No. 209 (Bed 04)',
    'Bath not attached - Room No. 209 (Bed 01)',
    'Bath not attached - Room No. 209 (Bed 02)',
    'Bath not attached - Room No. 209 (Bed 03)',
    'Bath not attached - Room No. 209 (Bed 04)',
    'Bath not attached - Room No. 107 (Bed 01)',
    'Bath not attached - Room No. 107 (Bed 02)'
]
const resourceData = [{
    name: 'Project laboratory',
    type: 'Academic Labs',
    capacity: 72,
},
{
    name: 'CAD laboratory',
    type: 'Academic Labs',
    capacity: 72,
},
{
    name: 'Simulation laboratory',
    type: 'Academic Labs',
    capacity: 70,
},
{
    name: 'VLSI laboratory',
    type: 'Academic Labs',
    capacity: 44,
},
{
    name: 'ML laboratory',
    type: 'Academic Labs',
    capacity: 70,
},
{
    name: 'DS laboratory',
    type: 'Academic Labs',
    capacity: 70,
},
{
    name: 'AI laboratory',
    type: 'Academic Labs',
    capacity: 67,
},
{
    name: 'Business Analytics laboratory',
    type: 'Academic Labs',
    capacity: 74,
},
{
    name: 'PLC Automation laboratory',
    type: 'Academic Labs',
    capacity: 44,
},
{
    name: '1st floor Auditorium',
    type: 'Auditorium/Training Halls',
    capacity: 400,
},
{
    name: '2nd floor Auditorium',
    type: 'Auditorium/Training Halls',
    capacity: 400,
},
{
    name: 'IT Auditorium',
    type: 'Auditorium/Training Halls',
    capacity: 120,
},
{
    name: 'Code Studio',
    type: 'Auditorium/Training Halls',
    capacity: 166,
},
{
    name: '3rd Floor Drawing Hall',
    type: 'Auditorium/Training Halls',
    capacity: 350,
},
{
    name: 'Makerspace',
    type: 'Special Halls',
    capacity: 100,
},
{
    name: 'Ignite',
    type: 'Special Halls',
    capacity: 100,
},
{
    name: 'Iot laboratory',
    type: 'Special Halls',
    capacity: 100,
},
{
    name: 'GF-07',
    type: 'Special Halls',
    capacity: 40,
},
{
    name: 'Cyber Security & Hypernet',
    type: 'Special Halls',
    capacity: 75,
},
{
    name: 'AI Robo Space',
    type: 'Special Halls',
    capacity: 75,
},
{
    name: 'Bytes laboratory',
    type: 'Academic Labs',
    capacity: 64,
},
{
    name: 'IP laboratory',
    type: 'Academic Labs',
    capacity: 67,
},
{
    name: 'Fullstack laboratory',
    type: 'Academic Labs',
    capacity: 70,
},
// Add data for other categories as well
// 'Project laboratory', 'CAD laboratory', 'Simulation laboratory', etc.
{
    name: 'Ignite Board Room',
    type: 'Board Rooms',
    capacity: 10,
},
{
    name: 'IQAC Board Room',
    type: 'Board Rooms',
    capacity: 10,
},
{
    name: 'Office Board Room',
    type: 'Board Rooms',
    capacity: 10,
},
];

const createResourceData = async (req, res) => {
    try {
        for (const resource of resourceData) {
            await Resource.create({
                name: resource.name,
                type: resource.type,
                capacity: resource.capacity,
                category: "seminar"
            });
        }
        console.log('Resource data created successfully');
        res.send({ message: 'success' })
    } catch (error) {
        res.send({ message: 'error' })
        console.error('Error creating resource data:', error);
    }
};
const createGuestHouse = async (req, res) => {
    try {
        for (const resource of allGuestHouse) {
            await Resource.create({
                name: resource,
                type: "guestHouse",
                category: "guestHouse",
            });
        }
        console.log('Resource data created successfully');
        res.send({ message: 'success' })
    } catch (error) {
        res.send({ message: 'error' })
        console.error('Error creating resource data:', error);
    }
};





const createResource = async (req, res) => {

    try {
        const { name, type, capacity, category } = req.body;
        const resource = await Resource.create({ name: name.toUpperCase(), type, capacity, category });
        res.send(JSON.stringify({ "message": true, "data": resource }));
    } catch (err) {
        res.send(JSON.stringify({ "message": false }));
    }
}




const deleteResource = async (req, res) => {

    try {

        const key = Object.keys(req.query);
        if (key.length == 0) {
            res.send(JSON.stringify({ "message": "invalid type" }))
            return;
        }
        const whereClause = {}
        key.forEach(key => { whereClause[key] = req.query[key] })

        const resource = await Resource.destroy({ where: whereClause })
        res.send(JSON.stringify(
            {
                "message": true,
                "data": resource,
            }
        ))

    } catch (err) {
        res.send(JSON.stringify({ "message": false }))
    }
}
const getSeminar = async (req, res) => {
    try {
        const types = await Resource.findAll({
            attributes: [
                [sequelize.fn("DISTINCT", sequelize.col("type")), "type"]
            ],
            where: {
                category: "seminar"
            },
            order: ["type"],
            raw: true
        });

        const result = {};

        await Promise.all(types.map(async (type) => {
            const halls = await Resource.findAll({
                attributes: [
                    ["name", "name"],
                    ["Capacity", "maxCapacity"]
                ],
                where: {
                    type: type.type
                },
                order: ["name"],
                raw: true
            });
            result[type.type] = halls.map((ele) => ({ ...ele, maxCapacity: Number(ele.maxCapacity) }))


        }));

        res.send({ data: result, type: types });
    } catch (error) {
        res.send({ message: error.message });
    }
}
const getDepartments = async (req, res) => {
    try {
        const result = await Resource.findAll({
            attributes: ["name"],
            where: {
                category: "department",
            },
            raw: true

        })
        res.send({ message: result })
    } catch (error) {
        res.send({ message: error.message })
    }
}
const getGuesthouse = async (req, res) => {
    try {
        const result = await Resource.findAll({
            attributes: ["name"],
            where: {
                category: "guestHouse",
            },
            raw: true,
            order: ["name"]

        })
        res.send({ data: result })
    } catch (error) {
        res.send({ message: error.message })
    }
}


const getResource = async (req, res) => {
    const whereClause = {}
    try {
        const key = Object.keys(req.query);
        key.forEach(key => { whereClause[key] = req.query[key] })


        const resource = await Resource.findAll({ where: whereClause, attributes: ["name"] })
        res.send(JSON.stringify({ "data": resource || [] }))

    } catch (error) {
        res.send(JSON.stringify({ "message": error.message }))
    }
}

module.exports = {
    deleteResource, createResource, getResource, createResourceData, getSeminar, getDepartments, getGuesthouse, createGuestHouse
}