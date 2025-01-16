import { Button } from "antd";
import Container from "../../components/common/Container/Container";

const Login = () => {
  return (
    <div className="py-20">
      <Container>
        <div className="flex flex-col justify-center items-center">
          <div className="border  w-1/3 h-56 rounded-md">
          
          <Button type="primary">Button</Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
