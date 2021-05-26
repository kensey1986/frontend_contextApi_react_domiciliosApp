import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/Context";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Row, Col, Card, Form, Input, Button, Select, Space, InputNumber } from "antd";

const Create = (props) => {
  const { crearCliente } = useContext(DataContext);
  const [selectData, setSelectData] = useState(null);
  const { Option } = Select;
  const { listaBarrios, cargarListaBarrios } = props;

  useEffect(() => {
    try {
      cargarListaBarrios();
    } catch (error) {
      console.error(error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 18, span: 6 },
  };
  const tailLayout2 = {
    wrapperCol: { offset: 8, span: 16 },
  };

  function handleChange(value) {
    if (value) {
      setSelectData(value);
    }
  }
  const onFinish = async (values) => {
    values = {
      name: values.name.toUpperCase(),
      barrio: selectData.toUpperCase(),
      direccion: values.direccion.toUpperCase(),
      barrios: values.barrios.toUpperCase(),
      telefono: values.telefono,
      celular: values.celular,
      emeil: values.emeil.toUpperCase(),
    };
    crearCliente(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Row>
        <Col span={2}></Col>
        <Col span={15}>
          <div style={{ padding: 30, background: "#ececec" }}>
            <Card title="Crear Cliente" bordered={false} style={{ width: 600 }}>
              <Form
                {...layout}
                initialValues={{ remember: false }}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Nombre"
                  name="name"
                  rules={[
                    { required: true, message: "Por favor ingresar nombre!" },
                  ]}
                >
                  <Input
                    autoComplete="none"
                    placeholder="Digite su 'Nombre Completo' "
                  />
                </Form.Item>
                <Form.Item label="Telefono" name="telefono">
                  <InputNumber
                    style={{ width: 200 }}
                    min={1}
                    autoComplete="none"
                    placeholder="Digite su 'telefono fijo' "
                  />
                </Form.Item>
                <Form.Item label="Celular" name="celular" style={{minWidth: "250px"}}>
                  <InputNumber
                  style={{ width: 200 }}
                    min={1}
                    max={10}
                    autoComplete="none"
                    placeholder="Digite su 'telefono celular' "
                  />
                </Form.Item>
                <Form.Item
                  name= "email"
                  label="Email"
                  rules={[
                    {
                      type: "email",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Barrio">
                  <Select
                    defaultValue="Seleccione..."
                    onChange={handleChange}
                    allowClear={false}
                    name="barrio"
                  >
                    {listaBarrios?.map((datos) => {
                      return <Option key={datos._id}>{datos.name}</Option>;
                    })}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Direccion"
                  name="direccion"
                  rules={[
                    { required: true, message: "Por favor ingresar Direccion principal!" },
                  ]}
                >
                  <Input
                    autoComplete="none"
                    placeholder="Digite 'Direccion Principal' "
                  />
                </Form.Item>
                <Form.Item {...tailLayout2}>
                  <Form.List name="barrios">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                          <Space
                            key={key}
                            style={{ display: "flex", marginBottom: 8 }}
                            align="baseline"
                          >
                            <Form.Item
                              {...restField}
                              name={[name, "barrio"]}
                              fieldKey={[fieldKey, "barrio"]}
                            >
                              <Select
                                defaultValue="Seleccione..."
                                allowClear={false}
                                name="barrio"
                              >
                                {listaBarrios?.map((datos) => {
                                  return (
                                    <Option key={datos.name}>
                                      {datos.name}
                                    </Option>
                                  );
                                })}
                              </Select>
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, "direccion"]}
                              fieldKey={[fieldKey, "direccion"]}
                            >
                              <Input placeholder="Direccion auxiliar" />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Add field
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
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
