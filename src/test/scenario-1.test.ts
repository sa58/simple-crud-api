import { RESOURCE_USERS } from "../app/constants";
import { User } from "../app/modules/user/user-type";
import { request } from "./lib/request";

let user: User = {
    id: '',
    username: 'user_1',
    age: 21,
    hobbies: ['hobby_1', 'hobby_2']
}

describe('scenario-1', () => {
    let userUUID: string;

    test('GET "api/users" returns empty array', async () => {
        const response = await request.get(RESOURCE_USERS)

        expect(response.body).toStrictEqual([]);
        expect(response.status).toEqual(200);
    });

    test('POST "/api/users" returns new user', async () => {

        const response = await request
            .post(RESOURCE_USERS)
            .send({username: user.username, age: user.age, hobbies: user.hobbies})

        user.id = response.body.id;
        userUUID  = user.id;

        expect(response.body).toStrictEqual({...user});
        expect(response.status).toEqual(201);
    });

    test('GET "/api/users/${uuid}" returns created user', async () => {
        const response = await request
            .get(`${RESOURCE_USERS}/${user.id}`)

        expect(response.body).toStrictEqual({...user});
        expect(response.status).toEqual(200);
    });

    test('PUT "/api/users/${uuid}" returns updated user', async () => {
        const response = await request
            .put(`${RESOURCE_USERS}/${user.id}`)
            .send({...user, username: 'user_1_updated'})

        user = {...user, username: 'user_1_updated'};

        expect(response.body).toStrictEqual(user);
        expect(response.status).toEqual(200);
    });

    test('DELETE "/api/users/${uuid}" deleted user', async () => {
        const response = await request
            .del(`${RESOURCE_USERS}/${user.id}`)

        expect(response.status).toEqual(204);
    });

    test('GET "/api/users/${uuid}" doesn`t return deleted user', async () => {
        const response = await request
            .get(`${RESOURCE_USERS}/${userUUID}`)

        expect(response.status).toEqual(404);
        expect(response.body).toStrictEqual({"message": "User doesn't exist"});
    });
});
