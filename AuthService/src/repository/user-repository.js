const {User} = require('../models/index');

class UserRepository {
    // Don't recomment CRUD repo to create in this service becoz we don't multiple repos here
    //  to support this service
    async create(data) {
        try{
            const user = await User.create(data);
            return user;
        }
        catch(error) {
            console.log("Something went wrong in creating User");
            throw error;
        }
    }

    async destroy(userId) {
        try{
            await User.destroy({
                where: {
                    id: userId
                }
            });
            return true;
        }
        catch(error){
            console.log("Didn't able to delete the user (Check repository layer)");
            throw error;
        }
    }

    async getById(userId) {
        try{
            const user = User.findByPk(userId, {
                attributes: ['email','id']
            });
            return user;
        } catch (error) {
            console.log("Something went wrong in Repository layer");
            throw error;
        }
    }

    async getByEmail(userEmail){
        try{
            const user = User.findOne({
                where: {
                    email: userEmail
                }
            });
            return user;
        }
        catch (error) {
            console.log("Something went wrong in Repository layer");
            throw error;
        }
    }
}

module.exports = UserRepository;