const { userModel } = require("./models/users.model")

class UserDaoMongo {
    constructor(){
        this.model = userModel
    }

    async getUsers(){
        return await this.model.find({})           
    }
    async getUserByEmail(email) {
        return await this.model.findOne({ email });
    }
    async getUserById(_id){
        return await this.model.findOne({_id})
    }

    async getUser(filter){
        return await this.model.findOne(filter)
    }

    async createUser(newUser){
        return await this.model.create(newUser)
    }
    
    async updateUser(userId, updatedFields) {
        try {
            const user = await this.model.findById(userId);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
    
            // Actualizar cada campo proporcionado en updatedFields
            Object.keys(updatedFields).forEach(field => {
                user[field] = updatedFields[field];
            });
    
            await user.save(); // Guarda los cambios en la base de datos
            return user;
        } catch (error) {
            throw new Error('Error al actualizar el usuario');
        }
    }

    async deleteUser(uid){ 
        try {
        const result = await this.model.deleteOne({ _id: uid });
        return result;
    } catch (error) {
        throw new Error('Error al eliminar el usuario');
    }}
}

module.exports = UserDaoMongo