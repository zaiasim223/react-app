import React, { Component } from "react";
import { Card, Button, Table, message, Divider,Modal } from "antd";
import TypingCard from '@/components/TypingCard'
import AddEditform from "./forms/addEditform"
import { connect } from 'react-redux';
import { addUser, getUsersList, editUser, deleteUser } from "../../store/actions";
const { confirm } = Modal;
const { Column } = Table;
class User extends Component {
  state = {
    modalType: null, // Add | Edit | null
  };


  handleEditUser = (obj = {}) => {
    this.setState({
      modalType: obj.id ? 'Edit' : null
    }, () => {
      if (obj.id) {
        const { form } = this.form.props;
        form.setFieldsValue(obj)
      }
    });
  };

  handleDeleteUser = (id) => {
    const self = this;
    confirm({
      title: 'Are you sure delete this record?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        self.props.deleteUser(id)
      },
    });
  }

  toggleModal = (type=null) => {
    this.setState({
      modalType: type,
    });
  };

  handleCancel = () => {
    this.toggleModal()
  }

  handleOk = _ => {
    const { form } = this.form.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      if (this.state.modalType === 'Add') {
        this.props.addUser(values, (success=true) => {
          this.toggleModal();
        })
      } else {
        this.props.editUser(values, (success=true) => {
          this.handleEditUser();
        })
      }
    });
  };
  componentDidMount() {
    this.props.getUsersList()
  }
  render() {
    const { usersList, loading } = this.props;
    const title = (
      <span>
        <Button type='primary' onClick={()=>this.toggleModal("Add")}>Add User</Button>
      </span>
    )
    const cardContent = `Here , you can manage users in the system , such as adding a new user , or modifying or deletion.`
    return (
      <div className="app-container">
        <TypingCard title='User Management' source={cardContent} />
        <br/>
        <Card title={title}>
          <Table bordered rowKey="id" dataSource={usersList} loading={loading.listing}>
            <Column title="#" dataIndex="sr" key="sr" align="center" render={(text, row, index) => 
               index + 1
            }/>
            <Column title="ID" dataIndex="id" key="id" align="center" />
            <Column title="Name" dataIndex="name" key="name" align="center" render={(text, row) => 
              `${row.first_name} ${row.last_name}`
            }/>
            <Column title="Email" dataIndex="email" key="email" align="center"/>
            <Column title="操作" key="action" width={195} align="center"render={(text, row) => (
              <span>
                <Button type="primary" shape="circle" icon="edit" title="Edit" onClick={()=>this.handleEditUser(row)}/>
                <Divider type="vertical" />
                <Button type="primary" shape="circle" icon="delete" title="Delete" onClick={()=>this.handleDeleteUser(row.id)}/>
              </span>
            )}/>
          </Table>
        </Card>

          <AddEditform
            wrappedComponentRef={formRef => this.form = formRef}
            visible={this.state.modalType !== null}
            confirmLoading={loading.userModal}
            onCancel={this.handleCancel}
            onOk={this.handleOk}
            modalType={this.state.modalType}
          />
        
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  usersList: state.users.usersList,
  loading: state.users.loading
})
// Object of action creators
const mapDispatchToProps = {
  addUser,
  getUsersList,
  editUser,
  deleteUser
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
