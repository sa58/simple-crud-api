import { RESOURCE_USERS } from "../app/constants";
import { User } from "../app/modules/user/user-type";
import { request } from "./lib/request";

let user: User = {
    id: '',
    username: 'user_1',
    age: 21,
    hobbies: ['hobby_1', 'hobby_2']
}

describe('scenario-3', () => {
    test('POST "/api/users" create user without username', async () => {

        const response = await request
            .post(RESOURCE_USERS)
            .send({age: user.age, hobbies: user.hobbies})

        expect(response.body).toStrictEqual({"message": "Field 'username' is required"});
        expect(response.status).toEqual(400);
    });

    test('POST "/api/users" create user without age', async () => {

        const response = await request
            .post(RESOURCE_USERS)
            .send({username: user.username, hobbies: user.hobbies})

        expect(response.body).toStrictEqual({"message": "Field 'age' is required"});
        expect(response.status).toEqual(400);
    });

    test('POST "/api/users" create user without hobbies', async () => {

        const response = await request
            .post(RESOURCE_USERS)
            .send({username: user.username, age: user.age})

        expect(response.body).toStrictEqual({"message": "Field 'hobbies' is required"});
        expect(response.status).toEqual(400);
    });

    test('POST "/api/users" create user using undefined', async () => {
        const response = await request
            .post(RESOURCE_USERS)
            .send(undefined)

        expect(response.body).toStrictEqual({"message": "Add required fields: username, age, hobbies"});
        expect(response.status).toEqual(400);
    });

    test('POST "/api/users" create user using {}', async () => {
        const response = await request
            .post(RESOURCE_USERS)
            .send({})

        expect(response.body).toStrictEqual({"message": "Field 'username' is required"});
        expect(response.status).toEqual(400);
    });

    test('GET "api/users" returns empty array all the same', async () => {
        const response = await request.get(RESOURCE_USERS)

        expect(response.body).toStrictEqual([]);
        expect(response.status).toEqual(200);
    });
});
