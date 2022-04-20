import React, { Component } from "react";
import { Form, Input, Modal } from "antd";
import { Upload, Icon, message } from 'antd';
import { getStorage, ref,uploadBytes ,getDownloadURL} from "firebase/storage";

const { TextArea } = Input;

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class AddSongForm extends Component {

  state = {
    loading: false
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
    }
  };

  uploadImage = (file) => {
    const self = this;
      const storage = getStorage();
      const storageRef = ref(storage, `images/${file.file.name}-${Date.now()}`);
    uploadBytes(storageRef, file.file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        self.setState({
          loading: false,
        });
        self.props.form.setFieldsValue({thumbnail: downloadURL})
      });
});

  }
  
  render() {
    const { visible, onCancel, onOk, form, confirmLoading, modalType } = this.props;
    const { getFieldDecorator, getFieldValue } = form;
    const {loading} =this.state
    const formItemLayout = {
      labelCol: {
        sm: { span: 4 },
      },
      wrapperCol: {
        sm: { span: 16 },
      },
    };

    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const thumbnailValue = getFieldValue('thumbnail')


    return (
      <Modal
        title={`${modalType} Song`}
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
        width="50%"
        okText="Save"
        destroyOnClose={true}
        maskClosable={false}
      >
        <Form {...formItemLayout} >
          {modalType === 'Edit' &&
            <Form.Item label="ID:">
              {getFieldDecorator("id", {
              })(<Input disabled />)}
            </Form.Item>
          }
          <Form.Item label="Title:">
            {getFieldDecorator("title", {
              rules: [{ required: true, message: "Please Enter Title!" },
              {whitespace: true, message: 'Invalid Value'}],
            
            })(<Input placeholder="Title" />)}
          </Form.Item>

          <Form.Item label="Singer:">
            {getFieldDecorator("singer", {
              rules: [{ required: true, message: "Please Enter Singer!" },
              {whitespace: true, message: 'Invalid Value'}],
            
            })(<Input placeholder="Singer" />)}
          </Form.Item>


          <Form.Item label="Thumbnail:">
            {getFieldDecorator("thumbnail", {
            })(<Input hidden />)}
            <div>
            <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        customRequest={this.uploadImage}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {thumbnailValue && !loading ? <img src={thumbnailValue} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
            </div>
          </Form.Item>

          <Form.Item label="Description:">
            {getFieldDecorator("description", {
              rules: [{ required: true, message: "Please Enter Description!" },
              {whitespace: true, message: 'Invalid Value'}],
            
            })(<TextArea placeholder="Description" rows={3} />)}
          </Form.Item>

          <Form.Item label="Description 2:">
            {getFieldDecorator("description2", {
              rules: [{ required: true, message: "Please Enter Description!" },
              {whitespace: true, message: 'Invalid Value'}],
            
            })(<TextArea placeholder="Description 2" rows={6} />)}
          </Form.Item>          
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "AddSongForm" })(AddSongForm);
