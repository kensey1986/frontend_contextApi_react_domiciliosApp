import React, { useContext, useEffect } from "react";
import { DataContext } from "../../context/Context";
import Create from "./Create";
import Edit from "./Edit";
import List from "./List";
import { Tabs } from "antd";
import {
  EditOutlined,
  FormOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

const Index = () => {
  const {
    cargarListaDomiciliarios,
    dataTableDelivery,
    dataFormDelivery,
    setDataFormDelivery,
    activeTap,
    setActiveTap,
    dataTableSucursal,
    cargarListaSucursales,
  } = useContext(DataContext);

  const { TabPane } = Tabs;

  useEffect(() => {
    try {
      cargarListaDomiciliarios();
    } catch (error) {
      console.error(error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      cargarListaSucursales();
    } catch (error) {
      console.error(error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (activeKey) => {
    setDataFormDelivery(undefined);
    setActiveTap(activeKey);
  };
  return (
    <>
      <Tabs onChange={onChange} activeKey={activeTap}>
        <TabPane
          tab={
            <span>
              <UnorderedListOutlined />
              Listar
            </span>
          }
          key="1"
        >
          <List
            dataTable={dataTableDelivery}
            setDataForm={setDataFormDelivery}
            setActiveTap={setActiveTap}
          />
        </TabPane>
        <TabPane
          tab={
            <span>
              <FormOutlined />
              Crear
            </span>
          }
          key="2"
        >
          <Create  listSucursales={dataTableSucursal} />
        </TabPane>
        <TabPane
          disabled
          tab={
            <span>
              <EditOutlined />
              Actualizar
            </span>
          }
          key="3"
        >
          <Edit
            activeTap={activeTap}
            setActiveTap={setActiveTap}
            dataForm={dataFormDelivery}
            listSucursales={dataTableSucursal}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Index;
