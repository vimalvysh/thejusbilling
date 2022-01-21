import { Row, Col, Card, Radio, Table, Form, Input, Select, Progress, Button, Avatar, Typography } from "antd";

import { Link } from "react-router-dom";

// Dummy datas.
import { products } from "../dummyDate/prooducts";
import { company } from "../dummyDate/Company";

// Images
import ava1 from "../assets/images/logo-shopify.svg";
import ava2 from "../assets/images/logo-atlassian.svg";
import ava3 from "../assets/images/logo-slack.svg";
import ava5 from "../assets/images/logo-jira.svg";
import ava6 from "../assets/images/logo-invision.svg";
import pencil from "../assets/images/pencil.svg";
import { useEffect, useState } from "react";

const { Title } = Typography;

function Tables() {
  const [form] = Form.useForm();
  const [tableValues, setTableValues] = useState([]);
  const [filterCompany, setFilterCompany] = useState("thejus");

  const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  useEffect(() => {
    handleStructureTableValues(products);
  }, [products, filterCompany]);

  const onFormLayoutChange = ({ layout }) => {
    console.log("on change form values");
  };

  const handleStructureTableValues = (values) => {
    let updatedValues = [];
    updatedValues = values.filter((item) => item.company === filterCompany);

    setTableValues(updatedValues);
  };

  const handleShipperQtyChange = (code, inputQty) => {
    try {
      console.log("code", code);
      let updatedValues = tableValues.map((el) => {
        return el.code === code
          ? {
              ...el,
              totalQty: el.shipperSize * inputQty,
              mrpValue: el.mrp * inputQty,
              invoiceValue: el.invoiceRate * inputQty,
            }
          : { ...el };
      });
      console.log("updatedValues", updatedValues);
      setTableValues(updatedValues);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card bordered={false} className="criclebox  mb-24 p-12">
              <Form
                layout={"inline"}
                form={form}
                initialValues={{
                  layout: "inline",
                }}
                onValuesChange={onFormLayoutChange}
              >
                <Form.Item label="Material Description">
                  <Input placeholder="Search..." />
                </Form.Item>
                <Form.Item>
                  <Button type="primary">Search</Button>
                </Form.Item>
                <Form.Item label="Company" style={{ minWidth: "200px" }}>
                  <Select onChange={(e) => setFilterCompany(e)}>
                    {company.map((item) => (
                      <Select.Option value={item}>{item.toUpperCase()}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button type="danger">Clear Data</Button>
                </Form.Item>{" "}
                <Form.Item>
                  <Button type="primary">Save Draft</Button>
                </Form.Item>{" "}
                <Form.Item>
                  <Button type="primary">Submit to Thejus</Button>
                </Form.Item>
              </Form>
            </Card>

            <Card bordered={false} className="criclebox tablespace mb-24" title="Products">
              <div className="table-responsive">
                <Table dataSource={tableValues} pagination={false} className="ant-border-space">
                  <Table.Column
                    title="Code"
                    dataIndex="code"
                    key="code"
                    render={(item) => (
                      <>
                        <div className="semibold">{item}</div>
                      </>
                    )}
                  />
                  <Table.Column
                    title="Material"
                    dataIndex="material"
                    key="material"
                    render={(item) => (
                      <>
                        <Avatar.Group>
                          <Avatar className="shape-avatar" src={ava5} size={25} alt="" />
                          <div className="avatar-info">
                            <Title level={5}>{item}</Title>
                          </div>
                        </Avatar.Group>
                      </>
                    )}
                  />
                  <Table.Column
                    title="Company"
                    dataIndex="company"
                    key="company"
                    render={(company) => (
                      <>
                        <div className="semibold">{company.toUpperCase()}</div>
                      </>
                    )}
                  />
                  <Table.Column
                    title="Mrp"
                    dataIndex="mrp"
                    key="company"
                    render={(item) => (
                      <>
                        <div className="semibold">{item}</div>
                      </>
                    )}
                  />
                  <Table.Column
                    title="InvoiceRate"
                    dataIndex="invoiceRate"
                    key="invoiceRate"
                    render={(item) => (
                      <>
                        <div className="semibold">{item}</div>
                      </>
                    )}
                  />
                  <Table.Column
                    title="ShipperSize"
                    dataIndex="shipperSize"
                    key="shipperSize"
                    render={(item) => (
                      <>
                        <div className="semibold">{item}</div>
                      </>
                    )}
                  />
                  <Table.Column
                    title="ShipperQty"
                    dataIndex="shipperQty"
                    key="shipperQty"
                    render={(item, record) => (
                      <>
                        <Input
                          placeholder="QTY"
                          size="small"
                          name="shipperQty"
                          onChange={(e) => handleShipperQtyChange(record.code, e.target.value)}
                        />
                      </>
                    )}
                  />

                  <Table.Column
                    title="Free Qty"
                    dataIndex="freeQty"
                    key="freeQty"
                    render={(item) => (
                      <>
                        <div className="semibold">{item}</div>
                      </>
                    )}
                  />
                  <Table.Column
                    title="Total Qty"
                    dataIndex="totalQty"
                    key="totalQty"
                    render={(item) => (
                      <>
                        <div className="semibold">{item}</div>
                      </>
                    )}
                  />
                  <Table.Column
                    title="Mrp Qty"
                    dataIndex="mrpValue"
                    key="mrpValue"
                    render={(item) => (
                      <>
                        <div className="semibold">{item}</div>
                      </>
                    )}
                  />
                  <Table.Column
                    title="Invoice Qty"
                    dataIndex="invoiceValue"
                    key="invoiceValue"
                    render={(item) => (
                      <>
                        <div className="semibold">{item}</div>
                      </>
                    )}
                  />
                </Table>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Tables;
