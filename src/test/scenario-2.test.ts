import { RESOURCE_USERS } from "../app/constants";
import { User } from "../app/user/user-type";
import { request } from "./lib/request";

let user: User = {
    id: '',
    username: 'user_1',
    age: 21,
    hobbies: ['hobby_1', 'hobby_2']
}

let user1: User = {
    id: '',
    username: 'user_2',
    age: 21,
    hobbies: ['hobby_3', 'hobby_4']
}

describe('scenario-2', () => {
    let userUUID: string;

    test('POST "/api/users" create user 1', async () => {

        const response = await request
            .post(RESOURCE_USERS)
            .send({username: user.username, age: user.age, hobbies: user.hobbies})

        user.id = response.body.id;
        userUUID  = user.id;

        expect(response.body).toStrictEqual({...user});
        expect(response.status).toEqual(201);
    });

    test('POST "/api/users" create user 2', async () => {
        const response = await request
            .post(RESOURCE_USERS)
            .send({username: user1.username, age: user1.age, hobbies: user1.hobbies})

        user1.id = response.body.id;

        expect(response.body).toStrictEqual({...user1});
        expect(response.status).toEqual(201);
    });

    test('PUT "/api/users/${uuid}" returns updated user 1', async () => {
        const response = await request
            .put(`${RESOURCE_USERS}/${user.id}`)
            .send({...user, username: 'user_1_updated'})

        user = {...user, username: 'user_1_updated'};

        expect(response.body).toStrictEqual(user);
        expect(response.status).toEqual(200);
    });

    test('GET "/api/users" returns users with updated user 1', async () => {
        const response = await request.get(RESOURCE_USERS)

        expect(response.body).toStrictEqual([{...user}, {...user1}]);
        expect(response.status).toEqual(200);
    });
});
