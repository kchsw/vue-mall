const BASE_URL = "https://www.easy-mock.com/mock/5cb161a97aab7f78650d206c/shopmall/"
const LOCAL_URL = "http://localhost:3000/"

const URL = {
	getHomeData: BASE_URL,
	registerUser: `${LOCAL_URL}user/register`, //注册接口
	loginUser: `${LOCAL_URL}user/login` //登陆接口
}

export default URL