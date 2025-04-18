import httpMocks from 'node-mocks-http';
import { createUser, updateUser } from '../users';

test('CreateUser - Golden Path', () => {
    const req = httpMocks.createRequest({
        method: 'POST',
        body: {
            username: 'Test User',
            password: 'P@$$w0rd!',
            email: 'test_creator@gmail.com',
            accountType: 'creator'
        },
    });
    const res = httpMocks.createResponse();
    createUser(req, res);
    const data = res._getJSONData();
    expect(res.statusCode).toBe(201);
    expect(data).toStrictEqual({
        success: true,
        user: {
            username: 'Test User',
            password: 'P@$$w0rd!',
            email: 'test_creator@gmail.com',
            accountType: 'creator'
        }
    });
});

test('UpdateUser - User does not exist', () => {
    const req = httpMocks.createRequest({
        method: 'PUT',
        body: {
            username: 'Test User',
            password: 'P@$$w0rd!',
            email: 'test_creator@gmail.com',
            accountType: 'creator'
        },
    });
    const res = httpMocks.createResponse();
    updateUser(req, res);
    const data = res._getJSONData();
    expect(res.statusCode).toBe(400);
    expect(data).toStrictEqual({
        success: false,
        error: "User not found, please check username",
    });
});

test('DeleteUser - User does not exist', ()=>{
    const req = httpMocks.createRequest({
        method: 'DELETE',
        body: {
            username: 'Test User',
        },
    });
    const res = httpMocks.createResponse();
    updateUser(req, res);
    const data = res._getJSONData();
    expect(res.statusCode).toBe(400);
    expect(data).toStrictEqual({
        success: false,
        error: "User not found, please check username",
    }); 
});