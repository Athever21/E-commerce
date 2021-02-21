interface UserInput {
  username: string,
  email: string,
  password: string
}

interface User {
  id: string,
  username: string,
  email: string,
  password?: string
  img?: string
}

interface ChangeUser {
  username?: string,
  email?: string,
  password?: string,
}