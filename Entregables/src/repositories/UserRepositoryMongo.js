const UserDaoMongo = require('../Daos/mongo/usersDaoMongo');
const UserRepository = require('./UserRepository');

class UserRepositoryMongo extends UserRepository {
    constructor() {
        super();
        this.dao = new UserDaoMongo();
    }

    async getUsers() {
        return await this.dao.getUsers();
    }

    async getUserByEmail(email) {
        return await this.dao.getUserByEmail(email);
    }

    async getUser(filter) {
        return await this.dao.getUser(filter);
    }

    async createUser(newUser) {
        return await this.dao.createUser(newUser);
    }

    async updateUser(uid, data) {
        return await this.dao.updateUser(uid, data);
    }

    async deleteUser(uid) {
        return await this.dao.deleteUser(uid);
    }
}

module.exports = UserRepositoryMongo;