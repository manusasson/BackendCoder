class UserRepository {
    // Método para obtener todos los usuarios
    async getAllUsers() {}

    // Método para obtener un usuario por su ID
    async getUserById(id) {}

    // Método para obtener un usuario por su correo electrónico
    async getUserByEmail(email) {}

    // Método para crear un nuevo usuario
    async createUser(user) {}

    // Método para actualizar un usuario existente
    async updateUser(id, data) {}

    // Método para eliminar un usuario
    async deleteUser(id) {}
}

module.exports = UserRepository;