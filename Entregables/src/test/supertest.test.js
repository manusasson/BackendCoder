const chai = require('chai')
const supertest = require('supertest')


const expect = chai.expect
const requester = supertest('http://localhost:8080')
