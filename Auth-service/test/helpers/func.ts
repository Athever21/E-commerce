export const loginUser = async (
  api: any,
  username?: string,
  password?: string
) => {
  const res = await api.post("/auth/login").send({ username, password });
  const refreshToken = (res.status !== 200) ? null : res.headers["set-cookie"][0].split(";")[0];

  return {
    res,
    refToken: refreshToken,
  };
};
