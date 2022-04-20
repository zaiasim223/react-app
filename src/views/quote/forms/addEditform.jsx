import React, { Component } from "react";
import { Form, Input, Select, Modal } from "antd";
const {TextArea}  = Input
class AddQuoteForm extends Component {

  render() {
    const { visible, onCancel, onOk, form, confirmLoading, modalType } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        sm: { span: 4 },
      },
      wrapperCol: {
        sm: { span: 16 },
      },
    };
    return (
      <Modal
        title={`${modalType} Quote`}
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
        width="50%"
        okText="Save"
        destroyOnClose={true}
        maskClosable={false}
      >
        <Form {...formItemLayout}>
          {modalType === 'Edit' &&
            <Form.Item label="ID:">
              {getFieldDecorator("id", {
              })(<Input disabled />)}
            </Form.Item>
          }
          <Form.Item label="Writer:">
            {getFieldDecorator("writer", {
              rules: [{ required: true, message: "Please Enter Writer!" },
              {whitespace: true, message: 'Invalid Value'}],
            
            })(<Input placeholder="Writer" />)}
          </Form.Item>

          <Form.Item label="Text:">
            {getFieldDecorator("text", {
              rules: [{ required: true, message: "Please Enter Text!" },
              {whitespace: true, message: 'Invalid Value'}],
            
            })(<TextArea placeholder="Text" rows={5} />)}
          </Form.Item>
          
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "AddQuoteForm" })(AddQuoteForm);
