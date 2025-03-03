import { Form, Input, Button } from "antd";
import Container from "../../components/common/Container/Container";
import { useNavigate } from "react-router-dom";
import { useAdminLoginMutation } from "../../redux/api/adminApi/authApi/AuthApi.mutation";

const Login = () => {
  const [adminLogin, { isLoading }] = useAdminLoginMutation();
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const response = await adminLogin(values).unwrap();
      if (response.success) {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="py-20">
      <Container>
        <div className="flex flex-col justify-center items-center">
          {/* Card Wrapper */}
          <div className=" border md:w-1/3 w-2/3  rounded-md border-orange-500 overflow-hidden">
            <div className="relative h-44 w-full">
              {/* Clipped Background */}
              <div
                className="absolute top-0 left-0 w-full h-full bg-[#FF3C00]"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 88%, 50% 100%, 0 88%)",
                }}
              ></div>
              <div className="relative w-full h-full z-10 flex justify-center items-center">
                <h4 className=" font-bold text-white text-3xl">Login</h4>
              </div>
            </div>
            <Form
              name="login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              layout="vertical"
              className="text-white p-8"
            >
              <Form.Item
                label={<p className="font-semibold text-[16px] ">Email</p>}
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input type="email" />
              </Form.Item>

              <Form.Item
                label={<p className="font-semibold text-[16px] ">Password</p>}
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  placeholder="Password"
                  className="p-2 rounded "
                />
              </Form.Item>
              <div className="flex justify-between gap-2 mb-5">
                <Form.Item>
                  <a className="float-right text-[#FF3C00]" href="#">
                    Forgot Password?
                  </a>
                </Form.Item>
              </div>

              <Form.Item className="text-center">
                <Button
                  size="large"
                  loading={isLoading}
                  type="primary"
                  htmlType="submit"
                  className=" w-full text-xl font-semibold"
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
