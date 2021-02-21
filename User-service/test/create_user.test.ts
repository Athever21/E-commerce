import {createTestClient} from "apollo-server-testing";

import createServer from "./helpers/create_server";
import emptyTable from "./helpers/empty_table";

const {query, mutate} = createTestClient(createServer());

beforeAll(async() => {
  await emptyTable();
})

test("Correctly create user",async() => {
  const res = await mutate({
    mutation: "createUser",
    variables: {username: "user-test",email: "test@test.com",password: "test"}
  });
  console.log(res);
  expect(res).toBe("Succeed");
})