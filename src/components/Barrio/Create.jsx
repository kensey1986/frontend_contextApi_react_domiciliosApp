import React, { useContext } from "react";
import { DataContext } from "../../context/Context";
import { Row, Col, Card, Form, Input, Button, InputNumber } from "antd";

const Create = () => {
  const { crearBarrio } = useContext(DataContext);
  
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 18, span: 6 },
  };

  const onFinish = async (values) => {

    values = {
      name: values.name.toUpperCase(),
      comuna: values.comuna.toUpperCase(),
      estrato: values.estrato,
    };
    crearBarrio(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Row>
        <Col span={7}></Col>
        <Col span={10}>
          <div style={{ padding: 30, background: "#ececec" }}>
            <Card
              title="Crear Barrio"
              bordered={false}
              style={{ width: 400 }}
            >
              <Form
                {...layout}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="Barrio"
                  name="name"
                  rules={[
                    { required: true, message: "Por favor ingresar Barrio!" },
                  ]}
                >
                  <Input
                    autoComplete="none"
                    placeholder="Digite 'Barrio' "
                  />
                </Form.Item>
                <Form.Item
                  label="Comuna"
                  name="comuna"
                  rules={[
                    { required: true, message: "Por favor ingresar Comuna!" },
                  ]}
                >
                  <Input
                    autoComplete="none"
                    placeholder="Digite 'Comuna' "
                  />
                </Form.Item>
                <Form.Item label="Estrato" name="estrato">
                  <InputNumber
                   style={{ width: 200 }}
                    min={1}
                    autoComplete="none"
                    placeholder="Digite 'estrato' "
                  />
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    Crear
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </Col>
        <Col span={7}></Col>
      </Row>
    </>
  );
};

export default Create;
