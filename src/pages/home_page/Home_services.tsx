import { Button, Col, Form, Input, Row } from "antd";

const Home_services = () => {
  const [form] = Form.useForm();
  return (
    <div style={{ padding: 20 }}>
      {/* form */}
      <div className="w-full border rounded-e-md p-6">
        <Form form={form} layout="vertical">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Form.Item name={"heading"} label="Heading">
                <Input placeholder="Type heading..."/>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item name={"title"} label="Title">
                <Input  placeholder="Type title..."/>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item name={"description"} label="Description">
                <Input placeholder="Type description..."/>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item name={"ctaLink"} label="CTA button link">
                <Input placeholder="Type cta link..."/>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item name={"ctaText"} label="CTA button text">
                <Input  placeholder="Type cta text..."/>
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={24} md={6} style={{marginTop: "auto"}}>
            <Form.Item >
              <Button className="flex-grow" style={{width: "100%"}}>Add service</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Home_services;
