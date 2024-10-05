const { Op } = require('sequelize');
const {city} = require ('../models/index');
// taking index because it will store all the models we had created
// otherwise we will also import each model by its path

class cityRepository {
    async createCity({name}) {
        try {
            const City = await city.create({name});
            return City;
        } catch (error) {
            throw {error};
        }
    }
    async deleteCity(cityId) {
        try {
            await city.destroy({
                where: {
                    id: cityId
                }
            });
        } catch (error) {
            throw {error};
        }
    }
    async updateCity(data, cityId) {
        try{
            // const City = await city.update(data, {
            //     where : {
            //         id : cityId
            //     }
            // });
            // return City;
            const City = await city.findByPk(cityId);
            if (!City) {
                throw new Error(`City with id ${cityId} not found`);
            }
            City.name = data.name;
            await City.save();
            return City;
        } catch(error) {
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }
    async getCity(cityId){
        try{
            const City = await city.findByPk(cityId);
            return City;
        } catch(error){
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }
    
    async getAllCities(filter) {
        try {
            if(filter.name) {
                const cities = await city.findAll({
                    where: {
                        name: {
                            [Op.startsWith]: filter.name
                        }
                    }
                });
                return cities;
            }
            const cities = await city.findAll();
            return cities;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }
}

module.exports = cityRepository;